package luan.datve.dulich.repository;

import luan.datve.dulich.model.Tour;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TourRepository extends JpaRepository<Tour,Long> {

    List<Tour>  findByAddressContaining(String address);
}
