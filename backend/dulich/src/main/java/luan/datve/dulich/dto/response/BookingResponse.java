package luan.datve.dulich.dto.response;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import luan.datve.dulich.dto.TourDto;
import luan.datve.dulich.model.Tour;
import luan.datve.dulich.model.User;

import java.sql.Date;
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BookingResponse {
    private Long id;
    private Date created_date;
    private String quantityAdults;
    private String quantityChildren;
    private String total_price;
    private Boolean status;
    private TourDto tourDto;
    private String userName;
}
