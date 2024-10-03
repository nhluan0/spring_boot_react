package luan.datve.dulich.controller;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import luan.datve.dulich.dto.UserDto;
import luan.datve.dulich.dto.request.RegisterRequest;
import luan.datve.dulich.mapper.MapperRegister;
import luan.datve.dulich.mapper.MapperUserAndUserDto;
import luan.datve.dulich.model.Role;
import luan.datve.dulich.model.User;
import luan.datve.dulich.repository.RoleRepository;
import luan.datve.dulich.repository.UserRepository;
import luan.datve.dulich.service.RoleService;
import luan.datve.dulich.service.UserService;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

@CrossOrigin("*")
@RestController
@RequestMapping("/users")
@AllArgsConstructor
public class UserController {
    private UserService userService;
    private MapperUserAndUserDto mapperUserAndUserDto;
    private MapperRegister mapperRegister;
    private RoleRepository roleRepository;
    private UserRepository userRepository;

    // build Api add a new user
    @PreAuthorize("hasRole('ADMIN')")
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
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping
    public ResponseEntity<Page<UserDto>> getAllUser(){
        Page<UserDto> userPage = userService.getListUserByPage(0);
        if(userPage.isEmpty())return new ResponseEntity<>(userPage,HttpStatus.BAD_REQUEST);
        return ResponseEntity.ok(userPage);
    }
    // build Api search username or phone number
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/{userNameOrPhoneNumber}")
    public ResponseEntity<?> searchByPhoneOrFullName(
            @PathVariable("userNameOrPhoneNumber") String mark){
        List<UserDto> userDtoList = userService.getListUserByUserNameOrPhoneNumber(mark,mark);
        if(userDtoList.size() == 0)return new ResponseEntity<>("Không tìm thấy Họ Tên or Số Phone",HttpStatus.BAD_REQUEST);
        return ResponseEntity.ok(userDtoList);
    }
    // build Api update user existed
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("{id}")
    public ResponseEntity<?> updateUserExisted(@PathVariable("id") Long id,
                                               @Valid @RequestBody UserDto userDto,
                                               BindingResult bindingResult) {
        User existingUser = userService.getUserById(id);

        if (existingUser == null) {
            // user not found with the given id
            return new ResponseEntity<>("User is not existed with given id " + id, HttpStatus.BAD_REQUEST);
        }

        // Get current user's details
        String currentPhoneNumber = existingUser.getPhoneNumber();
        String currentUserName = existingUser.getUserName();
        String currentEmail = existingUser.getEmail();

        Map<String, String> errors = new HashMap<>();

        // Check for validation errors
        if (bindingResult.hasErrors()) {
            for (FieldError error : bindingResult.getFieldErrors()) {
                errors.put(error.getField(), error.getDefaultMessage());
            }
        }

        // Check if the new username, email, or phone number already exists (and is different from the current one)
        if (!userDto.getUserName().equalsIgnoreCase(currentUserName) && userService.isExistUserName(userDto.getUserName())) {
            errors.put("userName", "Tài khoản đã tồn tại");
        }

        if (!userDto.getEmail().equalsIgnoreCase(currentEmail) && userService.isExistEmail(userDto.getEmail())) {
            errors.put("email", "Email đã tồn tại");
        }

        if (!userDto.getPhoneNumber().equalsIgnoreCase(currentPhoneNumber) && userService.isExistPhoneNumber(userDto.getPhoneNumber())) {
            errors.put("phoneNumber", "Số điện thoại đã tồn tại");
        }

        // If there are any errors, return them
        if (!errors.isEmpty()) {
            return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
        }

        // No errors, proceed to update the user
        UserDto updatedUserDto = userService.updateUserById(id, userDto);
        return ResponseEntity.ok(updatedUserDto);
    }
    // build Api get user by id
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/get/{id}")
    public ResponseEntity<?> getUserById(@PathVariable("id") Long id) {
        User user = userService.getUserById(id);
        if (user == null) {
            return new ResponseEntity<>("User does not exist with given id: " + id, HttpStatus.BAD_REQUEST);
        }
        UserDto userDto = mapperUserAndUserDto.userToUserDto(user); // Assuming you have a mapper to convert User to UserDto
        return ResponseEntity.ok(userDto);
    }
    // build api lock or unlock an account
    @PreAuthorize("hasRole('ADMIN')")
    @PatchMapping("/{id}")
    public ResponseEntity<?> isLockOrUnLock(@PathVariable("id") Long id){
        UserDto userDto = userService.lockOrUnLockUser(id);
        if (userDto == null) {
            return new ResponseEntity<>("User does not exist or admin can't delete", HttpStatus.BAD_REQUEST);
        }
        if(userDto.getRoles().equalsIgnoreCase("ADMIN")){
            return new ResponseEntity<>("ADMIN khong the Xoa", HttpStatus.BAD_REQUEST);
        }
        return ResponseEntity.ok(userDto);
    }
    // build api paginate
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/phan-trang/{page}")
    public ResponseEntity<?> paginateByNumPage(@PathVariable("page") int page){
        Page<UserDto> userPage = null;
        Page<UserDto> userPage1 = userService.getListUserByPage(0);
        if(page - 1 >= 0){
            userPage   = userService.getListUserByPage(page-1);
        }
        if(userPage == null || page-1 < 0)return new ResponseEntity<>(userPage1,HttpStatus.BAD_REQUEST);
        return ResponseEntity.ok(userPage);
    }

    // lay user theo so trang nhan duoc
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/page/{numPage}")
    public ResponseEntity<?> getListUserByNumPage(@PathVariable("numPage") int numPage){
        Page<UserDto> dtoPage = userService.getListUserByNumPage(numPage);
        if(dtoPage.isEmpty())
            return new ResponseEntity<>("ko co so phan trang nhan duoc",HttpStatus.BAD_REQUEST);
        return ResponseEntity.ok(dtoPage);
    }



}
