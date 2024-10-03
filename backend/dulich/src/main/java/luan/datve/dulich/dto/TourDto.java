package luan.datve.dulich.dto;



import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import luan.datve.dulich.model.Booking;
import luan.datve.dulich.model.Comment;
import luan.datve.dulich.model.Tour;
import org.springframework.web.multipart.MultipartFile;

import java.sql.Date;
import java.util.Base64;
import java.util.List;
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor

public class TourDto {
    private Long id;
    private String name;
    private String image;
    private String description;
    private Date start_date;
    private Date end_date;
    private String price;
    private String address;
    private Boolean isLock = false;
    private String priceAdult;
    private String priceChildren;
    private int rate;



    public TourDto(Long id, String name, byte[] image, String description, Date start_date, Date end_date, String price, String address, Boolean isLock,int rate) {
        this.id = id;
        this.name = name;
        this.image = image != null ? Base64.getEncoder().encodeToString(image):null;
        this.description = description;
        this.start_date = start_date;
        this.end_date = end_date;
        this.price = price;
        this.address = address;
        this.isLock = isLock;
        this.rate = rate;


    }


}
