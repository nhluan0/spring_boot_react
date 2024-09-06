package luan.datve.dulich.repository;

import luan.datve.dulich.model.Booking;
import luan.datve.dulich.model.Tour;
import luan.datve.dulich.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface BookingRepository extends JpaRepository<Booking,Long> {
    List<Booking> findByTourAndUser(Tour tour, User user);

    List<Booking> findByUserOrderByCreatedDateDesc(User user);

    Optional<Booking> findById(Long id);

}
