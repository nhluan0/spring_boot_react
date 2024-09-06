package luan.datve.dulich.service.impl;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import luan.datve.dulich.dto.TourDto;
import luan.datve.dulich.dto.request.BookingRequest;
import luan.datve.dulich.dto.response.BookingResponse;
import luan.datve.dulich.exception.ResourceNotExceptionFound;
import luan.datve.dulich.mapper.MapperBookingAndBookingResponse;
import luan.datve.dulich.mapper.MapperTourAndTourDto;
import luan.datve.dulich.model.Booking;
import luan.datve.dulich.model.Tour;
import luan.datve.dulich.model.User;
import luan.datve.dulich.repository.BookingRepository;
import luan.datve.dulich.repository.TourRepository;
import luan.datve.dulich.repository.UserRepository;
import luan.datve.dulich.service.BookingService;
import luan.datve.dulich.service.TourService;
import luan.datve.dulich.service.UserService;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.logging.SimpleFormatter;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Slf4j
public class BookingServiceImpl implements BookingService {

    BookingRepository bookingRepository;
    MapperBookingAndBookingResponse mapperBookingAndBookingResponse;
    TourService tourService;
    UserService userService;
    UserRepository userRepository;
    TourRepository tourRepository;
    MapperTourAndTourDto mapperTourAndTourDto;

    // add new Booking
    @Override
    public BookingResponse addBooking(BookingRequest bookingRequest) throws SQLException {
        Long id = bookingRequest.getTourId();
        Tour tour = tourRepository.findById(id).orElseThrow(
                ()->new ResourceNotExceptionFound("Tour ko ton tai voi id da cho: "+ id));
        String username = bookingRequest.getUsername();
        User user = userRepository.findByUserName(username);
        if(user == null) throw new ResourceNotExceptionFound("User ko ton tai voi username da cho: "+username);
        Date date = new Date(new java.util.Date().getTime());
        // kiem tra user da booking chua
        List<Booking> booked= bookingRepository.findByTourAndUser(tour,user);
        if(!booked.isEmpty()){
            booked.stream().map(booking ->{
                LocalDate date1 = LocalDate.now();
                LocalDate sqlDate = booking.getCreatedDate().toLocalDate();
                        // kiem tra ngay tao co trung hay ko
                        if(date1.equals(sqlDate))
                            throw new ResourceNotExceptionFound("User da booking tour nay");
                        return booking;
                    }).collect(Collectors.toList());
        }

        Booking booking = mapperBookingAndBookingResponse.toBookingRequest(bookingRequest);
        booking.setCreatedDate(date);
        Long totalPrice = convertStringToNumber(booking.getQuantityAdults())*convertStringToNumber(tour.getPriceAdult())+
                convertStringToNumber(booking.getQuantityChildren())*convertStringToNumber(tour.getPriceChildren())+
                convertStringToNumber(tour.getPrice());
        booking.setTotal_price(String.valueOf(totalPrice));
        booking.setStatus(false);
        booking.setTour(tour);
        booking.setUser(user);
        // luu vao database
        Booking bookingSaved = null;
        bookingSaved = bookingRepository.save(booking);
        BookingResponse bookingResponse = null;
        // chuyen doi thanh response booking
        if(bookingSaved != null)
        bookingResponse = mapperBookingAndBookingResponse.toBookingResponse(bookingSaved);
        TourDto tourDto = mapperTourAndTourDto.tourToTourDto(tour);

        bookingResponse.setTourDto(tourDto);
        bookingResponse.setUserName(username);
        return bookingResponse;
    }

    // tim tour theo thong tin user da dat
    @Override
    public List<BookingResponse> findByUserOrderByDate(String username) {
        User user = userRepository.findByUserName(username);
        if(user == null) throw new ResourceNotExceptionFound("user ko ton tai");

        // tim thong tin user da dat
        List<Booking> bookings = new ArrayList<>();
        bookings = bookingRepository.findByUserOrderByCreatedDateDesc(user);
        if(bookings.isEmpty()) throw new ResourceNotExceptionFound("chua book chuyen di");
        List<BookingResponse> bookingResponses = new ArrayList<>();
        bookingResponses = bookings.stream().map(booking ->{

           BookingResponse bookingResponse = mapperBookingAndBookingResponse.toBookingResponse(booking);
           bookingResponse.setId(booking.getId());
           Tour tour = booking.getTour();
            TourDto tourDto = null;
            try {
               tourDto = mapperTourAndTourDto.tourToTourDto(tour);
            } catch (SQLException e) {
                throw new RuntimeException(e);
            }
            bookingResponse.setTourDto(tourDto);
            bookingResponse.setUserName(username);
            return bookingResponse;
        }).collect(Collectors.toList());
        if(bookingResponses.isEmpty())throw new ResourceNotExceptionFound("loi");
        return bookingResponses;
    }

    // xoa tour da booked
    @Override
    public String deleteTourBooked(Long id) {
        Optional<Booking> booking = bookingRepository.findById(id);
        if(booking.isEmpty()) throw new ResourceNotExceptionFound("loi");
        bookingRepository.delete(booking.get());
        return "xoa thanh cong tour "+ booking.get().getTour().getName();
    }

    // ham chuyen doi string thanh so
    public Long convertStringToNumber(String param){
        return Long.parseLong(param);
    }
}
