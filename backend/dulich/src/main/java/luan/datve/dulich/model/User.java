package luan.datve.dulich.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "user")
@Data
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
}
