package luan.datve.dulich.model;


import jakarta.persistence.*;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import lombok.extern.apachecommons.CommonsLog;
import luan.datve.dulich.exception.ResourceNotExceptionFound;

import java.sql.Blob;
import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "tour")
@Setter
@Getter
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
    private Date startDate;

    @NotNull(message = "start_date ko bo trong")
    private Date end_date;

    @Column(name = "price")
    private String price;

    @Column(name = "address")
    private String address;

    @Column(name = "status")
    private Boolean isLock = false;

    @Column(name = "price_adult")
    private String priceAdult;

    @Column(name = "price_children")
    private String priceChildren;

    @OneToMany(mappedBy = "tour",fetch = FetchType.LAZY,cascade = {
           CascadeType.DETACH,CascadeType.MERGE,CascadeType.PERSIST,CascadeType.REFRESH
    })
    private  List<Comment> comments;

//    @OneToMany(mappedBy = "tour",fetch = FetchType.LAZY,cascade = {
//            CascadeType.DETACH,CascadeType.MERGE,CascadeType.PERSIST,CascadeType.REFRESH
//    })
//    private List<Booking> bookingList;

    public Tour() {
        this.comments = new ArrayList<>();
    }

    // add 1 Booking
//    public void addNewBooking(Booking booking){
//
//        if(bookingList == null){
//            bookingList = new ArrayList<>();
//        }
//        if(booking == null){
//            throw new ResourceNotExceptionFound("Booking ko ton tai");
//        }
//        bookingList.add(booking);
//        booking.setTour(this);
//    }

    @Override
    public String toString() {
        return "Tour{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", image=" + image +
                ", description='" + description + '\'' +
                ", startDate=" + startDate +
                ", end_date=" + end_date +
                ", price='" + price + '\'' +
                ", address='" + address + '\'' +
                ", isLock=" + isLock +
                ", priceAdult='" + priceAdult + '\'' +
                ", priceChildren='" + priceChildren + '\'' +
                ", comments=" + comments +
                '}';
    }
}
