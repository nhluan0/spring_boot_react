package luan.datve.dulich.dto;


import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {
    private Long id;
    @NotBlank(message = "Họ và tên không bỏ trống")
    private String fullName;
    @NotBlank(message = "Tên đăng nhập không bỏ trống")
    private String userName;
    @NotBlank(message = "Mật khẩu không bỏ trống")
    @Size(min = 4,message = "Mật khẩu ít nhất 4 ký tự")
    private String password;
    @Email(message = "Email phải có dạng example@gmail.com")
    @NotBlank(message = "Email không bỏ trống")
    private String email;
    @NotBlank(message = "Số điện thoại không bỏ trống")
    private String phoneNumber;
    @NotBlank(message = "Địa chỉ không bỏ trống")
    private String address;

    private Boolean isLock;
    @NotBlank(message = "Chọn vai trò người dùng")
    private String roles;
}
