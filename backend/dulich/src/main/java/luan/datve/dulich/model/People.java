package luan.datve.dulich.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import luan.datve.dulich.exception.ResourceNotExceptionFound;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "people")
@AllArgsConstructor

@Data
public class People {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String price;

    @OneToMany(fetch = FetchType.EAGER,cascade = {
            CascadeType.DETACH,CascadeType.MERGE,CascadeType.PERSIST,CascadeType.REFRESH
    },mappedBy = "people")
    private List<BookingPeople> bookingPeople;

    public People() {
        this.bookingPeople = new ArrayList<>();
    }

    // add new BookingPeople
    public void addBookingPeople(BookingPeople bookingPeopleNew ){
        if(bookingPeople == null){
            bookingPeople = new ArrayList<>();
        }
        if(bookingPeopleNew == null){
            throw new ResourceNotExceptionFound("BookingPeople ko ton tai");
        }
        bookingPeople.add(bookingPeopleNew);
        bookingPeopleNew.setPeople(this);

    }
}
