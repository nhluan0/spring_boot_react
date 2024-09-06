package luan.datve.dulich.service;

import luan.datve.dulich.dto.request.BookingRequest;
import luan.datve.dulich.dto.response.BookingResponse;

import java.sql.SQLException;
import java.util.List;

public interface BookingService {
    BookingResponse addBooking (BookingRequest bookingRequest) throws SQLException;

    List<BookingResponse> findByUserOrderByDate(String username);

    String deleteTourBooked(Long id);
}

