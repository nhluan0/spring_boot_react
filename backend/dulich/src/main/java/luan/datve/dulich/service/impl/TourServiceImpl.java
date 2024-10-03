package luan.datve.dulich.service.impl;

import lombok.AllArgsConstructor;
import luan.datve.dulich.dto.TourDto;
import luan.datve.dulich.exception.ResourceNotExceptionFound;
import luan.datve.dulich.mapper.MapperTourAndTourDto;
import luan.datve.dulich.model.Comment;
import luan.datve.dulich.model.Tour;
import luan.datve.dulich.repository.CommentRepository;
import luan.datve.dulich.repository.TourRepository;
import luan.datve.dulich.service.TourService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.sql.rowset.serial.SerialBlob;
import java.io.IOException;
import java.sql.Blob;
import java.sql.Date;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class TourServiceImpl implements TourService {
    private TourRepository tourRepository;
    private MapperTourAndTourDto mapperTourAndTourDto;
    private CommentRepository commentRepository;

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
        tour.setStartDate(dateStart);
        tour.setEnd_date(dateEnd);
        Tour savedTour = tourRepository.save(tour);

        return mapperTourAndTourDto.tourToTourDto(savedTour);
    }

    // get Tour by id
    @Override
    public TourDto getById(Long id) throws SQLException {
        Tour tour = tourRepository.findById(id)
                .orElseThrow(()->new ResourceNotExceptionFound("id ko ton tai"));
        List<Comment> comments = commentRepository.findByTourId(tour.getId());
        int sum = comments.stream()
                .mapToInt(Comment::getRate)
                .sum();
        int rate = 0;
        if(comments.size() !=0){
            rate = (int) Math.floor(sum/comments.size());
        }
        TourDto tourDto = mapperTourAndTourDto.tourToTourDto(tour);
        tourDto.setRate(rate);
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

                TourDto tourDto = mapperTourAndTourDto.tourToTourDto(tour);
              
                return tourDto;
            } catch (SQLException e) {
                throw new RuntimeException(e);
            }
        }).collect(Collectors.toList());
        return tourDtos;
    }

    // update Tour by id
    @Override
    public TourDto updateTourById(Long id, String name, MultipartFile file, String description, Date dateStart, Date dateEnd, String price, String address) throws IOException, SQLException {
        // get Tour by id
        Tour tour = tourRepository.findById(id).orElseThrow(
                ()->  new ResourceNotExceptionFound("ko tim thay Tour voi id da cho")
        );
        if(file != null  ){
            if(!file.isEmpty()){
                // chuyen doi file den byte
                byte[] fileByte = file.getBytes();
                // chuyen byte thanh du lieu blob
                Blob fileBlob = new SerialBlob(fileByte);
                tour.setImage(fileBlob);
            }

        }
            tour.setName(name);
            tour.setDescription(description);
            tour.setAddress(address);
            tour.setPrice(price);
            tour.setStartDate(dateStart);
            tour.setEnd_date(dateEnd);

        Tour savedTour = tourRepository.save(tour);
        return mapperTourAndTourDto.tourToTourDto(savedTour);
    }

    // get 10 tour theo giá giảm dần
    @Override
    public List<TourDto> getTenTourByDecreasePrice() {
        List<Tour> tours = tourRepository.findTenTourByPriceDecrease();
        List<TourDto> tourDtos = tours.stream().map((tour)-> {
            try {

                var tourDto = mapperTourAndTourDto.tourToTourDto(tour);
                tourDto.setDescription(""); // set phan mo ta de giam luu luu luong truyen tai

                return tourDto;
            } catch (SQLException e) {
                throw new ResourceNotExceptionFound("Error chuyen doi sql");
            }
        }).collect(Collectors.toList());
        return tourDtos;
    }

    // search tour by location or price
    @Override
    public List<TourDto> searchByLocationOrPrice(String location, String price) {
        List<Tour> tours = tourRepository.findByAddressContainingOrPriceContaining(location,price);
        List<TourDto> tourDtos = new ArrayList<>();
        if(tours != null || tours.size() > 0){
            tourDtos = tours.stream().map(tour -> {
                try {

                    TourDto tourDto = mapperTourAndTourDto.tourToTourDto(tour);

                    return tourDto;
                } catch (SQLException e) {
                    throw new RuntimeException(e);
                }
            }).collect(Collectors.toList());
        }
        return tourDtos;
    }

    // search by date start
    @Override
    public List<TourDto> searchByStartDate(Date date) {
        List<Tour> tour = tourRepository.findByStartDate(date);
        List<TourDto> tourDtos = new ArrayList<>();

        if(!tour.isEmpty()){
            tourDtos = tour.stream().map(
                    t-> {
                        try {

                            TourDto tourDto = mapperTourAndTourDto.tourToTourDto(t);

                            return tourDto;
                        } catch (SQLException e) {
                            throw new RuntimeException(e);
                        }
                    }
            ).collect(Collectors.toList());
        }
        return tourDtos;
    }

    // search by number page pass into
    @Override
    public Page<TourDto> getListTourByPaginate(int numPage) {
        // tim theo trang va theo gia giam dan va ten tang dan
        Pageable searchTourByPriceAndSortByName = PageRequest.of(numPage,4,
                Sort.by("price").descending().and(Sort.by("name").ascending()));
        // lay ket qua
        Page<Tour> tours = tourRepository.findAll(searchTourByPriceAndSortByName);
        if (tours.isEmpty())return Page.empty();


        Page<TourDto> tourDtos = tours.map(tour -> {
            try {
                return mapperTourAndTourDto.tourToTourDto(tour);
            } catch (SQLException e) {
                throw new RuntimeException(e);
            }
        });
        return tourDtos;
    }
}
