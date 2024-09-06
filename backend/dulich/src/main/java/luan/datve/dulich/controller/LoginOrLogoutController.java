package luan.datve.dulich.controller;

import com.nimbusds.jose.JOSEException;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import luan.datve.dulich.Jwt.JwtProvider;
import luan.datve.dulich.dto.request.LoginRequest;
import luan.datve.dulich.dto.request.RegisterRequest;
import luan.datve.dulich.dto.response.LogoutResponse;
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
                                          BindingResult bindingResult){
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
        user.setIsLock(false);
        // set Role la user
        user.setRoles(role);
        // luu user vao database
        User savedUser = userRepository.save(user);
        // tra ve phan hoi thanh cong
        return new ResponseEntity<>("Dang ky user thanh cong",HttpStatus.CREATED);

    }

}
