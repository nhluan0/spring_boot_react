package luan.datve.dulich.service.impl;

import lombok.AllArgsConstructor;
import luan.datve.dulich.dto.UserDto;
import luan.datve.dulich.exception.ResourceNotExceptionFound;
import luan.datve.dulich.mapper.MapperUserAndUserDto;
import luan.datve.dulich.model.User;
import luan.datve.dulich.repository.UserRepository;
import luan.datve.dulich.service.UserService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class UserSerViceImpl implements UserService {
    private UserRepository userRepository;
    private MapperUserAndUserDto mapperUserAndUserDto;

    // add new user
    @Override
    public UserDto addNew(UserDto userDto) {
        User user = mapperUserAndUserDto.userDtoToUser(userDto);
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



    // update user by id
    @Override
    public UserDto updateUserById(Long id, UserDto userDto) {
        Boolean checkUserExisted = isUserExistById(id);
        if(!checkUserExisted) return null;
        userDto.setId(id);
        User savedUser = mapperUserAndUserDto.userDtoToUser(userDto);
        savedUser = userRepository.save(savedUser);
        UserDto userDtoResponse = mapperUserAndUserDto.userToUserDto(savedUser);
        return userDtoResponse;
    }
}
