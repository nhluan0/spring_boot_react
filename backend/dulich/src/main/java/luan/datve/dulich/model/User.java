package luan.datve.dulich.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "user")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "full_name")
    private String fullName;

    @Column(name = "user_name")
    private String userName;

    @Column(name = "password")
    private String password;

    @Column(name = "email",unique = true)
    private String email;

    @Column(name = "phone_number",unique = true)
    private String phoneNumber;

    @Column(name = "address")
    private String address;

    @Column(name = "isLock")
    private Boolean isLock = false;

    @ManyToOne(fetch = FetchType.LAZY,cascade = {
            CascadeType.MERGE,CascadeType.PERSIST,CascadeType.REFRESH,CascadeType.DETACH
    })
    @JoinColumn(name = "role_id")
    private Role roles;

//    @OneToMany(mappedBy = "user",fetch = FetchType.LAZY,cascade ={
//            CascadeType.MERGE,CascadeType.PERSIST,CascadeType.REFRESH,CascadeType.DETACH
//    })
//    private List<Booking> bookingList;

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", fullName='" + fullName + '\'' +
                ", userName='" + userName + '\'' +
                ", password='" + password + '\'' +
                ", email='" + email + '\'' +
                ", phoneNumber='" + phoneNumber + '\'' +
                ", address='" + address + '\'' +
                ", isLock=" + isLock +
                ", roles=" + roles +
                '}';
    }
}
