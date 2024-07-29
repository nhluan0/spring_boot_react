package luan.datve.dulich.service.impl;

import lombok.AllArgsConstructor;
import luan.datve.dulich.dto.TourDto;
import luan.datve.dulich.exception.ResourceNotExceptionFound;
import luan.datve.dulich.mapper.MapperTourAndTourDto;
import luan.datve.dulich.model.Tour;
import luan.datve.dulich.repository.TourRepository;
import luan.datve.dulich.service.TourService;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.sql.rowset.serial.SerialBlob;
import java.io.IOException;
import java.sql.Blob;
import java.sql.Date;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class TourServiceImpl implements TourService {
    private TourRepository tourRepository;
    private MapperTourAndTourDto mapperTourAndTourDto;

    // add new Tour
    @Override
    public TourDto addNewTour(String name, MultipartFile file, String description, Date dateStart
            , Date dateEnd, String price, String address) throws IOException, SQLException {
        Tour tour= new Tour();
        if(file ==null || file.isEmpty()){
            throw new ResourceNotExceptionFound("anh ko tim thay nha ku");
        }
        byte[] photoByte = file.getBytes();
        Blob image = new SerialBlob(photoByte);

        tour.setName(name);
        tour.setImage(image);
        tour.setDescription(description);
        tour.setAddress(address);
        tour.setPrice(price);
        tour.setStart_date(dateStart);
        tour.setEnd_date(dateEnd);
        Tour savedTour = tourRepository.save(tour);

        return mapperTourAndTourDto.tourToTourDto(savedTour);
    }

    // get Tour by id
    @Override
    public TourDto getById(Long id) throws SQLException {
        Tour tour = tourRepository.findById(id)
                .orElseThrow(()->new ResourceNotExceptionFound("id ko ton tai"));
        TourDto tourDto = mapperTourAndTourDto.tourToTourDto(tour);
        return tourDto;
    }


    // get all tour
    @Override
    public List<TourDto> getAllTour() {
        List<Tour> tours = new ArrayList<>();
        tours = tourRepository.findAll();
        if(tours.isEmpty())return null;
        List<TourDto> tourDtos = tours.stream()
                .map(tour-> {
                    System.out.println(tour.getId());
                    try {
                        return mapperTourAndTourDto.tourToTourDto(tour);
                    } catch (SQLException e) {
                        throw new RuntimeException(e);
                    }
                }).collect(Collectors.toList());
        return tourDtos;
    }

    // search by address
    @Override
    public List<TourDto> searchByAddress(String address) {
        List<Tour> tours = tourRepository.findByAddressContaining(address);
        if(tours.isEmpty())return null;
        List<TourDto> tourDtos = tours.stream().map(tour->{
            try {
                return mapperTourAndTourDto.tourToTourDto(tour);
            } catch (SQLException e) {
                throw new RuntimeException(e);
            }
        }).collect(Collectors.toList());
        return tourDtos;
    }
}
