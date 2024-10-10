package luan.datve.dulich.controller;

import com.nimbusds.jose.JOSEException;
import jakarta.mail.MessagingException;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import luan.datve.dulich.Jwt.JwtProvider;
import luan.datve.dulich.dto.request.ChangePassword;
import luan.datve.dulich.dto.request.LoginRequest;
import luan.datve.dulich.dto.request.RegisterRequest;
import luan.datve.dulich.dto.response.LogoutResponse;
import luan.datve.dulich.mail.MailService;
import luan.datve.dulich.mapper.MapperRegister;
import luan.datve.dulich.model.Role;
import luan.datve.dulich.model.User;
import luan.datve.dulich.repository.RoleRepository;
import luan.datve.dulich.repository.UserRepository;
import luan.datve.dulich.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@RestController
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@RequestMapping("/log")
@CrossOrigin("*")
@Slf4j
public class LoginOrLogoutController {
    UserService userService;
    JwtProvider jwtProvider;
    MapperRegister mapperRegister;
    RoleRepository roleRepository;
    UserRepository userRepository;
    MailService mailService;

    // dang nhap create jwt token
     @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) throws JOSEException {
         log.info(loginRequest.getUserNameOrEmail());
        var jwtToken = userService.login(loginRequest);
        return ResponseEntity.ok(jwtToken);
    }
    @PostMapping("/logout")
    public ResponseEntity<?> logout(@RequestHeader("Authorization") String token) throws ParseException, JOSEException {
         if(token == null || token.equalsIgnoreCase("")){
             return new ResponseEntity<>("token ko ton tai", HttpStatus.BAD_REQUEST);
         }
         token = token.substring(7);
         LogoutResponse logoutResponse = userService.logout(token);
         return ResponseEntity.ok(logoutResponse);
    }

    // DANG KY MOI USER
    @PostMapping("/dang-ky")
    public ResponseEntity<?> registerUser(@Valid @RequestBody RegisterRequest request,
                                          BindingResult bindingResult) throws JOSEException, MessagingException {
        Boolean isExistedEmail = userService.isExistEmail(request.getEmail());
        Boolean isExistedUserName = userService.isExistUserName(request.getUserName());
        Boolean isExistedPhoneNumber = userService.isExistPhoneNumber(request.getPhoneNumber());
        // check phone number da ton tai, email, user name da ton tai hoac co loi valid voi cac field
        if(bindingResult.hasErrors() || isExistedEmail || isExistedUserName || isExistedPhoneNumber){
            Map<String,String> map = new HashMap<>();
            // check loi valid cac fields
            if(bindingResult.hasErrors()){
                for (FieldError error:bindingResult.getFieldErrors()) {
                    map.put(error.getField(),error.getDefaultMessage());
                }
            }
            // check email existed
            if(isExistedEmail){
                map.put("email","email da existed");
            }
            // check username existed
            if(isExistedUserName)map.put("userName","ten dang nhap da ton tai");
            // check phone number existed
            if(isExistedPhoneNumber) map.put("phoneNumber","so dien thoai da ton tai");
            return new ResponseEntity<>(map,HttpStatus.BAD_REQUEST);
        }
        // mapper registerUserRequest to user
        User user = mapperRegister.toUser(request);
        Role role = roleRepository.findByRole("USER");
        // set isLock
        user.setIsLock(true);
        // set Role la user
        user.setRoles(role);
        // luu user vao database
        User savedUser = userRepository.save(user);
        // lay thoi gian hien tai va cong them 5 minutes
        Date expirationDate = new Date(System.currentTimeMillis() + 60 * 1000 *5 ); // 5 minutes from now
        // create token with time expire pass
        String token = jwtProvider.generateTokenByUserRegistion(savedUser,expirationDate);

        // set content email
        String htmlContent =
                "<h1>bạn đã đặt đăng ký thành viên trang đặt vé du lịch</h1>"+
                "<p>Để hoàn tất việc đăng ký vui lòng nhấn vào link bên dưới </p>"+
                "<p>Link có hiệu lực trong vòng 5 phút</p>" +
                "<a href=\"http://localhost:8080/log/complete/register?token=" + token + "\">Hoàn tất đăng ký</a>";
        // send email
        mailService.sendMail(user.getEmail(),"Hoàn tất việc đăng ký",htmlContent);

        // tra ve phan hoi thanh cong
        return new ResponseEntity<>("Xác nhận email hoàn tất việc đăng ký",HttpStatus.CREATED);

    }
    // build api complete the registration
    @GetMapping("/complete/register")
    public ResponseEntity<?> completeRegister(@RequestParam("token") String token) throws ParseException, JOSEException {
        // 1: verify token
        Boolean checkToken = jwtProvider.verifyToken(token);
        if(!checkToken)return new ResponseEntity<>("Thời gian đăng ký đã hết hạn",HttpStatus.BAD_REQUEST);
        // 2: get username from token
        String username = jwtProvider.getUsernameFromToken(token);
        // 3: get User from database by username
        User user = userRepository.findByUserName(username);
        if(!user.getIsLock()) return ResponseEntity.ok("User đã đăng ký lúc trước rồi");
        // 5: change the isLock property to false
        user.setIsLock(false);
        // 6: save user to database
        User userServed = userRepository.save(user);
        return ResponseEntity.ok("Đăng ký user thành công");
    }


}
