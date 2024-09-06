package luan.datve.dulich.mapper;

import luan.datve.dulich.dto.request.BookingRequest;
import luan.datve.dulich.dto.response.BookingResponse;
import luan.datve.dulich.model.Booking;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface MapperBookingAndBookingResponse {


    @Mapping(target = "userName",ignore = true)
    @Mapping(target = "tourDto",ignore = true)
    @Mapping(source = "createdDate",target = "created_date")
    BookingResponse toBookingResponse(Booking booking);
    @Mapping(target = "id",ignore = true)
    @Mapping(target = "createdDate",ignore = true)
    @Mapping(target = "total_price",ignore = true)
    @Mapping(target = "status",ignore = true)
    @Mapping(target = "tour", ignore = true)
    @Mapping(target = "user", ignore = true)
    Booking toBookingRequest(BookingRequest bookingRequest);
}
