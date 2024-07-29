package luan.datve.dulich.controller;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import luan.datve.dulich.dto.TourDto;
import luan.datve.dulich.dto.TourModalAttribute;
import luan.datve.dulich.exception.ValidTourException;
import luan.datve.dulich.service.TourService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.sql.Date;
import java.sql.SQLException;
import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/tours")
@AllArgsConstructor
public class TourController {
    private TourService tourService;

    // build Api add new Tour
    @PostMapping
    public ResponseEntity<?> addNewTour( @Valid @ModelAttribute TourModalAttribute tourModalAttribute,
                                        @RequestParam("file") MultipartFile file, BindingResult bindingResult) throws SQLException, IOException {

        // Chuyển đổi LocalDate sang java.sql.Date
        Date startDate = Date.valueOf(tourModalAttribute.getStart_date());
        Date endDate = Date.valueOf(tourModalAttribute.getDate_end());
        TourDto tourDto = tourService.addNewTour(tourModalAttribute.getTitle(),
                file,tourModalAttribute.getDescription(),
                startDate,endDate,
                tourModalAttribute.getPrice(),tourModalAttribute.getAddress());
        return new ResponseEntity<>(tourDto, HttpStatus.CREATED);

    }
    // build api get Tour by id
    @GetMapping("{id}")
    public ResponseEntity<?> getTourById(@PathVariable("id") Long id) throws SQLException {
        TourDto tourDto = tourService.getById(id);
        return ResponseEntity.ok(tourDto);
    }
    // build api get all tour
    @GetMapping
    public ResponseEntity<List<TourDto>> getAllTour(){
        List<TourDto> tourDtos = tourService.getAllTour();
        return ResponseEntity.ok(tourDtos);
    }

    // search by address
    @GetMapping("/search/{address}")
    public ResponseEntity<?> searchByAddress(@PathVariable("address") String address){
        List<TourDto> tourDtos = tourService.searchByAddress(address);
        if(tourDtos == null) return new ResponseEntity<>("Khong tim thay dia chi da nhap, vui long nhap dia chi khac",HttpStatus.BAD_REQUEST);
        return ResponseEntity.ok(tourDtos);
    }
}
