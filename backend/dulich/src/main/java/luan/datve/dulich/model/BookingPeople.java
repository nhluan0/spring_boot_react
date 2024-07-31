package luan.datve.dulich.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "booking_people")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class BookingPeople {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long quantity;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "booking_id",referencedColumnName = "id")
    private Booking booking;

    @ManyToOne(fetch = FetchType.EAGER,cascade = {
            CascadeType.DETACH,CascadeType.MERGE,CascadeType.PERSIST,CascadeType.REFRESH
    })
    @JoinColumn(name = "people_id")
    private People people;

}
