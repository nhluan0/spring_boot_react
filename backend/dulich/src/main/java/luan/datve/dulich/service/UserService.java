package luan.datve.dulich.service;

import luan.datve.dulich.dto.UserDto;
import luan.datve.dulich.model.User;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.List;


public interface UserService {
    UserDto addNew(UserDto userDto);

    // check email ton tai
    Boolean isExistEmail(String email);
    Boolean isExistPhoneNumber(String phoneNumber);
    Boolean isExistUserName(String userName);
    // lay user theo phan trang
    Page<UserDto> getListUserByPage(int numPage);
    // search user by username or phone number
    List<UserDto> getListUserByUserNameOrPhoneNumber(String userName,String phoneNumber);
    // check existed user with given id
    Boolean isUserExistById(Long id);
    // update user existed by id
    UserDto updateUserById(Long id, UserDto userDto);
}
