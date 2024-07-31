package luan.datve.dulich.repository;

import luan.datve.dulich.model.People;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PeopleRepository extends JpaRepository<People,Long> {
}
