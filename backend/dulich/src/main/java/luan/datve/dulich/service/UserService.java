package luan.datve.dulich.service;

import com.nimbusds.jose.JOSEException;
import luan.datve.dulich.dto.TourDto;
import luan.datve.dulich.dto.UserDto;
import luan.datve.dulich.dto.request.LoginRequest;
import luan.datve.dulich.dto.response.LoginResponse;
import luan.datve.dulich.dto.response.LogoutResponse;
import luan.datve.dulich.model.Tour;
import luan.datve.dulich.model.User;
import org.springframework.data.domain.Page;


import java.text.ParseException;
import java.util.List;


public interface UserService {
    UserDto addNew(UserDto userDto);

    // check email ton tai
    Boolean isExistEmail(String email);

    // check phone number existed
    Boolean isExistPhoneNumber(String phoneNumber);

    // check username existed
    Boolean isExistUserName(String userName);

    // lay user theo phan trang
    Page<UserDto> getListUserByPage(int numPage);
    // search user by username or phone number
    List<UserDto> getListUserByUserNameOrPhoneNumber(String userName,String phoneNumber);
    // check existed user with given id
    Boolean isUserExistById(Long id);
    User getUserById(Long id);

    // update user existed by id
    UserDto updateUserById(Long id, UserDto userDto);

    // lock or unlock user
    UserDto lockOrUnLockUser(Long id);

    // login
    LoginResponse login(LoginRequest loginRequest) throws JOSEException;

    // logout
    LogoutResponse logout(String token) throws ParseException, JOSEException;

    Page<UserDto> getListUserByNumPage(int numPage);
}
