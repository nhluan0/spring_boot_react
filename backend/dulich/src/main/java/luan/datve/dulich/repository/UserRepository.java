package luan.datve.dulich.repository;

import luan.datve.dulich.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserRepository extends JpaRepository<User,Long> {
    User findByEmail(String email);
    User findByPhoneNumber(String phoneNumber);
    User findByUserName(String userName);
    List<User> findByUserNameContainingOrPhoneNumberContaining(String userName,String PhoneNumber);
}
