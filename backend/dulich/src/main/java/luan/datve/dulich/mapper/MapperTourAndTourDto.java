package luan.datve.dulich.mapper;

import luan.datve.dulich.dto.TourDto;
import luan.datve.dulich.exception.ResourceNotExceptionFound;
import luan.datve.dulich.model.Tour;
import org.springframework.stereotype.Service;

import java.sql.Blob;
import java.sql.SQLException;
import java.util.Base64;

@Service
public class MapperTourAndTourDto {

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
        return new TourDto(
                tour.getId(),
                tour.getName(),
                blobToString(tour),
                tour.getDescription(),
                tour.getStart_date(),
                tour.getEnd_date(),
                tour.getPrice(),
                tour.getAddress(),
                tour.getIsLock(),
                tour.getBookingList()
        );
    }

}
