package luan.datve.dulich.repository;

import luan.datve.dulich.dto.TourDto;
import luan.datve.dulich.model.Tour;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.sql.Date;
import java.util.List;
import java.util.Optional;

public interface TourRepository extends JpaRepository<Tour,Long> {

    List<Tour>  findByAddressContaining(String address);

    @Query("SELECT u FROM Tour u ORDER BY u.price DESC")
    List<Tour> findTenTourByPriceDecrease();

    List<Tour> findByAddressContainingOrPriceContaining(String address,String price);


    List<Tour> findByStartDate(Date date);
    Page<Tour> findAll(Pageable pageable);

}
