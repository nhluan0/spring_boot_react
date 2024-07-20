package luan.datve.dulich.mapper;

import lombok.AllArgsConstructor;
import luan.datve.dulich.dto.UserDto;
import luan.datve.dulich.model.User;
import luan.datve.dulich.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;


@Service
public class MapperUserAndUserDto {
    @Autowired
    private  RoleRepository roleRepository;

    public UserDto userToUserDto(User user){
        if(user == null)return null;
        return new UserDto(
                user.getId(),
                user.getFullName(),
                user.getUserName(),
                user.getPassword(),
                user.getEmail(),
                user.getPhoneNumber(),
                user.getAddress(),
                user.getIsLock(),
                user.getRoles().getRole());
    }
    public  User userDtoToUser(UserDto userDto){
        userDto.setIsLock(false);
        if(userDto == null)return null;
        return new User(
                userDto.getId(),
                userDto.getFullName(),
                userDto.getUserName(),
                userDto.getPassword(),
                userDto.getEmail(),
                userDto.getPhoneNumber(),
                userDto.getAddress(),
                userDto.getIsLock(),
                roleRepository.findByRole(userDto.getRoles())

        );
    }
}
