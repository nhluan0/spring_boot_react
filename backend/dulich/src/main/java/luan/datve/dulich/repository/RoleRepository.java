package luan.datve.dulich.repository;

import luan.datve.dulich.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


public interface RoleRepository extends JpaRepository<Role,Long> {
    Role findByRole(String role);
}
