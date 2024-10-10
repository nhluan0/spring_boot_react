package luan.datve.dulich.dto.request;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ChangePassword {
    String usernameOrEmail;
    String oldPassword;
    String newPassword;
    String reNewPassword;
}
