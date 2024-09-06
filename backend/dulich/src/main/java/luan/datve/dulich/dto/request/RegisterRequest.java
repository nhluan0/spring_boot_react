package luan.datve.dulich.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@AllArgsConstructor
@NoArgsConstructor
@Data
public class RegisterRequest {
    @NotBlank(message = "email khong duoc bo trong")
    @Email(message = "email phai co dang email@example.com")
    String email;

    @NotBlank(message = "fullname khong duoc bo trong")
    String fullName;

    @NotBlank(message = "username khong duoc bo trong")
    String userName;
    @NotBlank(message = "password khong duoc bo trong")
    @Size(min = 6,message = "password phai co it nhat 6 ky tu")
    String password;
    @NotBlank(message = "phone number khong duoc bo trong")
    String phoneNumber;
    @NotBlank(message = "address khong duoc bo trong")
    String address;

}
