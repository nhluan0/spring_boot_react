package luan.datve.dulich.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CommentResponse {
    Long tourId;
    String tourName;
    String username;
    String comment;
    Date dateCreated;
    int rate;
}
