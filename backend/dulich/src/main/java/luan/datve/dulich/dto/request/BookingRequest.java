package luan.datve.dulich.dto.request;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class BookingRequest {
    String quantityAdults;
    String quantityChildren;
    Long tourId;
    String username;
}
