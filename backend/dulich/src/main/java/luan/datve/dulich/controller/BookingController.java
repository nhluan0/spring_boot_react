package luan.datve.dulich.controller;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;
import luan.datve.dulich.dto.request.BookingRequest;
import luan.datve.dulich.dto.response.BookingResponse;
import luan.datve.dulich.service.BookingService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.util.List;

@CrossOrigin("*")
@RestController
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@RequestMapping("/booking")
public class BookingController {
    BookingService bookingService;

    // build api add 1 new Booking
    @PostMapping
    public ResponseEntity<?> addNewBooking(@RequestBody BookingRequest bookingRequest) throws SQLException {
        BookingResponse bookingResponse = bookingService.addBooking(bookingRequest);
        if(bookingResponse == null) return new ResponseEntity<>("Booking failed", HttpStatus.BAD_REQUEST);
        return new ResponseEntity<>(bookingResponse,HttpStatus.CREATED);
    }
    @GetMapping("/info")
    public ResponseEntity<?> getInfoUserBooked(@RequestParam("username") String username){
        List<BookingResponse> bookingResponses = bookingService.findByUserOrderByDate(username);
        if(bookingResponses.isEmpty())
            return new ResponseEntity<>("ko co thong tin user da booking",HttpStatus.BAD_REQUEST);
        return ResponseEntity.ok(bookingResponses);
    }

    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteBookingById(@PathVariable("id") Long id){
        String mess = bookingService.deleteTourBooked(id);
        return ResponseEntity.ok(mess);
    }


}
