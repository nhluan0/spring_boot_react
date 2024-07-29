package luan.datve.dulich.model;


import jakarta.persistence.*;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.extern.apachecommons.CommonsLog;
import luan.datve.dulich.exception.ResourceNotExceptionFound;

import java.sql.Blob;
import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "tour")
@Data
@AllArgsConstructor

public class Tour {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "image")
    @Lob
    private Blob image;

    @Column(name = "description",columnDefinition = "LONGTEXT")
    private String description;

    @Column(name = "start_date")
    private Date start_date;

    @NotNull(message = "start_date ko bo trong")
    private Date end_date;

    @Column(name = "price")
    private String price;

    @Column(name = "address")
    private String address;

    @Column(name = "status")
    private Boolean isLock = false;

    @OneToMany(mappedBy = "tour",fetch = FetchType.LAZY,cascade = {
            CascadeType.DETACH,CascadeType.MERGE,CascadeType.PERSIST,CascadeType.REFRESH
    })
    private List<Booking> bookingList;

    public Tour() {
        this.bookingList = new ArrayList<>();
    }

    // add 1 Booking
    public void addNewBooking(Booking booking){

        if(bookingList == null){
            bookingList = new ArrayList<>();
        }
        if(booking == null){
            throw new ResourceNotExceptionFound("Booking ko ton tai");
        }
        bookingList.add(booking);
        booking.setTour(this);
    }

}
