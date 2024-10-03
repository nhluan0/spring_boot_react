package luan.datve.dulich.service;

import luan.datve.dulich.dto.TourDto;
import luan.datve.dulich.exception.ResourceNotExceptionFound;
import luan.datve.dulich.model.Tour;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import javax.sql.rowset.serial.SerialBlob;
import java.io.IOException;
import java.sql.Blob;
import java.sql.Date;
import java.sql.SQLException;
import java.util.List;

public interface TourService {

     // add new Tour
     TourDto addNewTour(String name, MultipartFile file, String description, Date dateStart, Date dateEnd,
                               String price, String address) throws IOException, SQLException;
     // get By id Tour
     TourDto getById(Long id) throws SQLException;

     // get all Tour
     List<TourDto> getAllTour();

     // get tour by address
     List<TourDto> searchByAddress(String address);

     // get tour by id
     TourDto updateTourById(Long id,String name, MultipartFile file, String description, Date dateStart, Date dateEnd,
                        String price, String address) throws IOException, SQLException;

     // get list tour by decrease price , get 10 tour
     List<TourDto> getTenTourByDecreasePrice();

     List<TourDto> searchByLocationOrPrice(String location, String price);

     List<TourDto> searchByStartDate(Date date);
     Page<TourDto> getListTourByPaginate(int numPage);
}
