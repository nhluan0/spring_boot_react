package luan.datve.dulich.service.impl;

import com.nimbusds.jose.JOSEException;
import com.nimbusds.jose.RemoteKeySourceException;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;
import jakarta.mail.MessagingException;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import luan.datve.dulich.Jwt.JwtProvider;
import luan.datve.dulich.dto.TourDto;
import luan.datve.dulich.dto.UserDto;

import luan.datve.dulich.dto.request.ChangePassword;
import luan.datve.dulich.dto.request.ForgetPassword;
import luan.datve.dulich.dto.request.LoginRequest;
import luan.datve.dulich.dto.request.ResetPassword;
import luan.datve.dulich.dto.response.LoginResponse;
import luan.datve.dulich.dto.response.LogoutResponse;
import luan.datve.dulich.exception.ResourceNotExceptionFound;
import luan.datve.dulich.mail.MailService;
import luan.datve.dulich.mapper.MapperUserAndUserDto;
import luan.datve.dulich.model.LogoutToken;
import luan.datve.dulich.model.Tour;
import luan.datve.dulich.model.User;
import luan.datve.dulich.repository.LogoutTokenRepository;
import luan.datve.dulich.repository.UserRepository;
import luan.datve.dulich.service.UserService;
import org.springframework.data.domain.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.util.*;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserSerViceImpl implements UserService {
    UserRepository userRepository;
    MapperUserAndUserDto mapperUserAndUserDto;
    PasswordEncoder passwordEncoder;
    JwtProvider jwtProvider;
    LogoutTokenRepository logoutTokenRepository;
    MailService mailService;

    // add new user
    @Override
    public UserDto addNew(UserDto userDto) {
        System.out.println(userDto.getRoles());
        User user = mapperUserAndUserDto.userDtoToUser(userDto);
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        User savedUser = userRepository.save(user);
        return mapperUserAndUserDto.userToUserDto(savedUser);
    }
    // check email existed
    @Override
    public Boolean isExistEmail(String email) {
        User user = userRepository.findByEmail(email);

        if(user == null) return false;
        return true;
    }
    // check phone number existed
    @Override
    public Boolean isExistPhoneNumber(String phoneNumber) {
        User user = userRepository.findByPhoneNumber(phoneNumber);
        if(user == null) return false;
        return true;
    }
    // check username existed
    @Override
    public Boolean isExistUserName(String userName) {
        User user = userRepository.findByUserName(userName);
        if(user == null) return false;
        return true;
    }
    // get list user for lan dau load
    @Override
    public Page<UserDto> getListUserByPage(int numPage) {
        Page<User> rsPage = userRepository.findAll(PageRequest.of(
                numPage, 4, Sort.by("fullName").ascending()));
        if(rsPage.isEmpty()) return null;
        List<UserDto> dtoList = rsPage.getContent().stream()
                .map(e ->{
                    e.setPassword("123123");
                    return mapperUserAndUserDto.userToUserDto(e);
                } )
                .collect(Collectors.toList());

        Page<UserDto> dtoPage = new PageImpl<>(dtoList, rsPage.getPageable(), rsPage.getTotalElements());
        return dtoPage;
    }
    // search by username or phone number
    @Override
    public List<UserDto> getListUserByUserNameOrPhoneNumber(String userName, String phoneNumber) {
        List<User> users = userRepository.findByUserNameContainingOrPhoneNumberContaining(userName,phoneNumber);
        List<UserDto> userDtoList = users.stream().map(e->
                 mapperUserAndUserDto.userToUserDto(e)).collect(Collectors.toList());
        return userDtoList;
    }

    // check user existed
    @Override
    public Boolean isUserExistById(Long id) {
        Optional<User> user = userRepository.findById(id);
        if(!user.isPresent()) return false;
        return true;
    }
    // get user by id
    @Override
    public User getUserById(Long id) {
       Optional<User> user = userRepository.findById(id);
       if(user.isPresent())return user.get();
        return null;
    }


    // update user by id

    @Override
    public UserDto updateUserById(Long id, UserDto userDto) {
        userDto.setId(id);
        User savedUser = mapperUserAndUserDto.userDtoToUser(userDto);

        savedUser = userRepository.save(savedUser);
        UserDto userDtoResponse = mapperUserAndUserDto.userToUserDto(savedUser);
        return userDtoResponse;
    }


    @Override
    public UserDto lockOrUnLockUser(Long id) {
        Optional<User> user = userRepository.findById(id);
        if(!user.isPresent())return null;
        User user1 = user.get();
        if(user1.getRoles().getRole().equalsIgnoreCase("ADMIN")){
            UserDto userDto = new UserDto();
            userDto.setRoles("ADMIN");
            return userDto;
        }
        user1.setIsLock(!user1.getIsLock());
        // luu vao database
        User saved = userRepository.save(user1);
        UserDto userDto = mapperUserAndUserDto.userToUserDto(saved);
        return userDto;
    }

    // login tao token
    @Override
    public LoginResponse login(LoginRequest loginRequest) throws JOSEException {
        var usernameOrEmail = loginRequest.getUserNameOrEmail();
        // check username or email co ton tai ko
        User user = userRepository.findByUserNameOrEmail(usernameOrEmail,usernameOrEmail);

        if(user == null) throw new ResourceNotExceptionFound("email or username ko existed");
        // kiem tra password co trung voi password da luu ko
        Boolean checkPw = passwordEncoder.matches(loginRequest.getPassword(),user.getPassword());
        if(!checkPw) throw new ResourceNotExceptionFound("mat khau ko dung");

        // generate jwt token
        String token = jwtProvider.generateToken(user);

        return new LoginResponse().builder()
                .token(token)
                .build();
    }

    @Override
    public LogoutResponse logout(String token) throws ParseException, JOSEException {
        // xac thuc token
        SignedJWT signedJWT = jwtProvider.verifier(token);
        // xac thuc to ken thanh cong thi can lam gi nua
        // 1. lay id token
        // 2. save vao database
        // lay claim
        JWTClaimsSet claimsSet = signedJWT.getJWTClaimsSet();
        // lay id token
        String jlt = claimsSet.getJWTID();
        // lay date expiration
        Date expiration = claimsSet.getExpirationTime();
        // tao LogoutToken
        LogoutToken logoutToken = LogoutToken.builder()
                .id(jlt)
                .date(new java.sql.Date(expiration.getTime()))
                .build();

        // luu vao database
        logoutTokenRepository.save(logoutToken);
        // set response logout
        LogoutResponse logoutResponse = LogoutResponse.builder()
                .mess("logout thanh cong")
                .build();
        return logoutResponse;
    }

    // lay page theo so trang truyen len, gioi han 5 phan tu hien thi moi page
    @Override
    public Page<UserDto> getListUserByNumPage(int numPage) {
        // 1: lay PageAble theo so trang va sap xep theo ten dang ky tang dan
        Pageable pageable = PageRequest.of(numPage,5,Sort.by("userName").ascending());
        // 2: lay list user theo numPage
        Page<User> users = userRepository.findAll(pageable);
        // 3: kiem tra co trong khong
        if(users.isEmpty()) return Page.empty();
        // 4: chuyen doi Page<User> thanh Page<UserDto>
        Page<UserDto> dtoPage = users.map(user->
                mapperUserAndUserDto.userToUserDto(user));
        return dtoPage;
    }
    // search by price or username lay theo so trang
    @Override
    public Page<UserDto> searchUsernameOrPhoneNumber(int page, String username, String phoneNumber) {
        // 1: lay PageAble theo so trang va username va sap xep theo ten dang ky tang dan
        Pageable pageable = PageRequest.of(page,2,Sort.by("userName")
                .ascending().and(Sort.by("phoneNumber")).descending());
        // 2: tim danh sach theo username
        Page<User>  users = userRepository.findByUserNameContainingOrPhoneNumberContaining(
                username,phoneNumber,pageable);
        // 3: kiem tra co trong khong
        if(users.isEmpty())return Page.empty();
        // chuyen doi sang Page<UserDto>
        Page<UserDto> dtoPage = users.map(user->{
            return mapperUserAndUserDto.userToUserDto(user);
        });
        return dtoPage;
    }

    // change password
    @Override
    public String changePassword(ChangePassword changePassword) {
        // 1: lay user theo username or email
        User user = userRepository.findByUserNameOrEmail(changePassword.getUsernameOrEmail(),changePassword.getOldPassword());
        // 2: check user == null
        if(user == null) throw new ResourceNotExceptionFound("username or email not existed");
        // 3: check password has match
        if(!passwordEncoder.matches(changePassword.getOldPassword(),user.getPassword()))
            throw new ResourceNotExceptionFound("mat khau cu khong dung ");
        // 4: check new password match with reenter new password
        if(!changePassword.getNewPassword().equals(changePassword.getReNewPassword()))
            throw  new ResourceNotExceptionFound("mat khau moi ko khop voi map khau moi nhap lai");
        // 5: encoder new password
        String newPassword = passwordEncoder.encode(changePassword.getReNewPassword());
        // 6: set new password encoder to object user
        user.setPassword(newPassword);
        // 7: update new password
        User savedUser = userRepository.save(user);

        return "update success new password for user";
    }

    // send an api for forgetPassword
    @Override
    public String forgetPassword(ForgetPassword forgetPassword) throws MessagingException, JOSEException {
        // 1: get user by username or password
        User user = userRepository.findByUserNameOrEmail(
                forgetPassword.getUsernameOrEmail(),forgetPassword.getUsernameOrEmail());
        // 2: check user has null
        if(user == null)
            throw new ResourceNotExceptionFound("Username or email given not existed");
        // 3: user exist, generate a token with expired on 5 minute
         Date expiredToken = new Date(System.currentTimeMillis()+60*1000*5);
         String token = jwtProvider.generateTokenByUserRegistion(user,expiredToken);


        // 4: set subject mail
        String subjectMail = "Mail xác nhận quên mật khẩu";
        // 5: set body
        String body = "<h1>Ban đã yêu cầu quên mật khẩu, nếu là bạn vui lòng nhấn vào liên kết dưới để cài mật khẩu mởi</h1>" +
                "<a href='http://localhost:5173/resetpw?token="+token+"' > Link xác nhận thay đổi mật khẩu mới</a>";
        // 6: send email
        mailService.sendMail(user.getEmail(),subjectMail,body);
        return "Chung toi da gui cho ban mot email xac thuc, vui long xac thuc email de tiep tuc";
    }
   // handle forget password
    @Override
    public String handleForgetPassword(String token, ResetPassword resetPassword) throws ParseException, JOSEException {
        // 1: valid expired token
        Boolean isExpiredToken = jwtProvider.verifyToken(token);
        if(!isExpiredToken){
            throw new ResourceNotExceptionFound("Ma token da het hieu luc");
        }
        // 2: token still valid
        // get username in token
        String usernameOrEmail = jwtProvider.getUsernameFromToken(token);
        // 3: compare this usernameOrEmail with usernameOrEmail got from ForgetPassword
        if(!usernameOrEmail.equals(resetPassword.getUsernameOrEmail()) ){
            throw new ResourceNotExceptionFound("Username or email ko hop le");
        }
        // 4: check password and rePassword has match
        if(!resetPassword.getPassword().equals(resetPassword.getRePassword())){
            throw new ResourceNotExceptionFound("Password moi ko trung nhau, vui long nhap lai");
        }
        // 5: get user by usernameOrEmail
        User user = userRepository.findByUserNameOrEmail(resetPassword.getUsernameOrEmail(),resetPassword.getUsernameOrEmail());
        // 6: encoder password
        String encoderPassword = passwordEncoder.encode(resetPassword.getPassword());
        // 7:set new password
        user.setPassword(encoderPassword);
        // 8: saved to database
        User savedUser = userRepository.save(user);

        return "Thay doi mat khau thanh cong vui long quay lai trang login";
    }


}
