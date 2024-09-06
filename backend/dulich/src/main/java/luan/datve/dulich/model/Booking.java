package luan.datve.dulich.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;
import java.util.Set;

@Entity
@Table(name = "booking")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Booking {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "created_date")
    private Date createdDate;

    @Column(name = "quantity_adults")
    private String quantityAdults;

    @Column(name = "quantity_children")
    private String quantityChildren;

    @Column(name = "total_price")
    private String total_price;

    @Column(name = "status")
    private Boolean status;

    @ManyToOne(fetch = FetchType.LAZY,cascade ={
            CascadeType.DETACH,CascadeType.MERGE,CascadeType.PERSIST,CascadeType.REFRESH
    })
    @JoinColumn(name = "tour_id")
    private Tour tour;

    @ManyToOne (fetch = FetchType.LAZY,cascade ={
            CascadeType.DETACH,CascadeType.MERGE,CascadeType.PERSIST,CascadeType.REFRESH
    })
    @JoinColumn(name = "user_id")
    private User user;



}
