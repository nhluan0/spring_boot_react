package luan.datve.dulich.mapper;

import lombok.AllArgsConstructor;
import luan.datve.dulich.dto.TourDto;
import luan.datve.dulich.exception.ResourceNotExceptionFound;
import luan.datve.dulich.model.Comment;
import luan.datve.dulich.model.Tour;
import luan.datve.dulich.repository.CommentRepository;
import org.springframework.stereotype.Service;

import java.sql.Blob;
import java.sql.SQLException;
import java.util.Base64;
import java.util.List;

@Service
@AllArgsConstructor
public class MapperTourAndTourDto {
    private CommentRepository commentRepository;
    public String blobToString(Tour tour) throws SQLException {
        Blob photoBlob = tour.getImage();
        byte[] photoByte = null;
        if(photoBlob != null){
            photoByte = photoBlob.getBytes(1,(int)photoBlob.length());
        }else {
            new ResourceNotExceptionFound("Tour ko ton tai");
        }
        String rs = "";
        if(photoByte != null){
            rs = Base64.getEncoder().encodeToString(photoByte);
        }
        return rs;
    }


    public TourDto tourToTourDto(Tour tour) throws SQLException {
        // Fetch comments for the tour
        List<Comment> comments = commentRepository.findByTourId(tour.getId());

        // Calculate the average rating
        int sum = comments.stream()
                .mapToInt(Comment::getRate)
                .sum();
        int rate = 0;
        if (!comments.isEmpty()) {
            rate = (int) Math.floor(sum / comments.size());
        }
        return new TourDto(
                tour.getId(),
                tour.getName(),
                blobToString(tour),
                tour.getDescription(),
                tour.getStartDate(),
                tour.getEnd_date(),
                tour.getPrice(),
                tour.getAddress(),
                tour.getIsLock(),
                tour.getPriceAdult(),
                tour.getPriceChildren(),
                rate


        );
    }

}
