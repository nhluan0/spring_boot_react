package luan.datve.dulich.repository;

import luan.datve.dulich.model.LogoutToken;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface LogoutTokenRepository extends JpaRepository<LogoutToken,Long> {
    Optional<LogoutToken> findById(String id);

}
