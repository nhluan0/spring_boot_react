package luan.datve.dulich.dto;

import jakarta.persistence.Column;
import jakarta.persistence.Lob;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.multipart.MultipartFile;


import java.time.LocalDate;

@Data
@AllArgsConstructor
public class TourModalAttribute {


    @NotBlank(message = "Tieu de ko bo trong")
    private String title;

    @NotBlank(message = "description ko bo trong")
    private String description;

    @NotNull(message = "Ngay ko bo trong")
    @FutureOrPresent(message = "Ngay bat dau phai lon hon hoac bang ngay hien tai")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate start_date;

    @NotNull(message = "Ngay ko bo trong")
    @FutureOrPresent(message = "Ngay bat dau phai lon hon hoac bang ngay hien tai")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate date_end;

    @Min(value = 0,message = "gia khong am")
    @NotBlank(message = "price ko bo trong")
    private String price;

    @NotBlank(message = "dia chi ko bo trong")
    private String address;
    private String priceAdult;
    private String priceChildren;
}
