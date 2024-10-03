package luan.datve.dulich.repository;

import luan.datve.dulich.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User,Long> {
    User findByEmail(String email);
    User findByPhoneNumber(String phoneNumber);
    User findByUserName(String userName);

    User findByUserNameOrEmail(String username,String email);
    List<User> findByUserNameContainingOrPhoneNumberContaining(String userName,String PhoneNumber);

    // lay user de phan trang
    Page<User> findAll(Pageable pageable);

    // search user by username or phone number
    Page<User> findByUserNameContainingOrPhoneNumberContaining(String username,String phoneNumber,Pageable pageable);
}
