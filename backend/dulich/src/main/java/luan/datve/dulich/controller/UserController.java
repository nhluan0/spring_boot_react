package luan.datve.dulich.controller;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import luan.datve.dulich.dto.UserDto;
import luan.datve.dulich.model.User;
import luan.datve.dulich.service.UserService;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin("*")
@RestController
@RequestMapping("/users")
@AllArgsConstructor
public class UserController {
    private UserService userService;


    // build Api add a new user
    @PostMapping
    public ResponseEntity<?> addNewUser(@Valid @RequestBody UserDto userDto,
                                              BindingResult bindingResult){
        Boolean isUserExist = userService.isExistUserName(userDto.getUserName());
        Boolean isEmailExist = userService.isExistEmail(userDto.getEmail());

        Boolean isPhoneNumberExist = userService.isExistPhoneNumber(userDto.getPhoneNumber());
        // if valid xay ra or email, phone number, username đã tồn tại thì gửi lỗi đến client
        if(bindingResult.hasErrors() || isUserExist || isEmailExist || isPhoneNumberExist ){
            Map<String,String> errors = new HashMap<>();
            for (FieldError error:bindingResult.getFieldErrors()){
                errors.put(error.getField(),error.getDefaultMessage());
            }
            // check username ton tai
            if(isUserExist){
                errors.put("userName","Tên đăng nhập đã tồn tại");
            }
            // check email ton tai
            if(isEmailExist){
                errors.put("email","Email đã tồn tại");
            }
            // check phone number exist
            if(isPhoneNumberExist){
                errors.put("phoneNumber","Số điện thoại đã tồn tại");
            }
            return new ResponseEntity<>(errors,HttpStatus.BAD_REQUEST);
        }
        UserDto savedUserDto = userService.addNew(userDto);
        return new ResponseEntity<>(savedUserDto, HttpStatus.CREATED);
    }

    // build Api get first page users
    @GetMapping
    public ResponseEntity<Page<UserDto>> getAllUser(){
        Page<UserDto> userPage = userService.getListUserByPage(0);
        if(userPage.isEmpty())return new ResponseEntity<>(userPage,HttpStatus.BAD_REQUEST);
        return ResponseEntity.ok(userPage);
    }
    // build Api search username or phone number
    @GetMapping("{userNameOrPhoneNumber}")
    public ResponseEntity<?> searchByPhoneOrFullName(
            @PathVariable("userNameOrPhoneNumber") String mark){
        List<UserDto> userDtoList = userService.getListUserByUserNameOrPhoneNumber(mark,mark);
        if(userDtoList.size() == 0)return new ResponseEntity<>("Không tìm thấy Họ Tên or Số Phone",HttpStatus.BAD_REQUEST);
        return ResponseEntity.ok(userDtoList);
    }
    // build Api update user existed
    @PutMapping("{id}")
    public  ResponseEntity<?> updateUserExisted(@PathVariable("id") Long id,
                                                @Valid @RequestBody UserDto userDto,
                                                BindingResult bindingResult){
        Boolean isUserExisted = userService.isUserExistById(id);
        Boolean isUserExist = userService.isExistUserName(userDto.getUserName());
        Boolean isEmailExist = userService.isExistEmail(userDto.getEmail());
        Boolean isPhoneNumberExist = userService.isExistPhoneNumber(userDto.getPhoneNumber());
        if(bindingResult.hasErrors())

    }
}
