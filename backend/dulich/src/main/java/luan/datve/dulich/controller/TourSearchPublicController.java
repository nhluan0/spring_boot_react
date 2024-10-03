package luan.datve.dulich.controller;

import lombok.AllArgsConstructor;
import luan.datve.dulich.dto.TourDto;
import luan.datve.dulich.service.TourService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;
@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/tour")
@AllArgsConstructor
public class TourSearchPublicController {
    private TourService tourService;
    // buil api search theo address or price
    @GetMapping("/search/{addressOrPrice}")
    public ResponseEntity<?> searchByAddressOrPrice(@PathVariable("addressOrPrice") String addressOrPrice){
        List<TourDto> tourDtos = new ArrayList<>();
        tourDtos = tourService.searchByLocationOrPrice(addressOrPrice,addressOrPrice);
        if(tourDtos.isEmpty()) return new ResponseEntity<>("Search ko ra gia tri", HttpStatus.BAD_REQUEST);
        return ResponseEntity.ok(tourDtos);
    }
    @GetMapping("/search/date/{start_date}")
    public ResponseEntity<?> searchByStartDate(@PathVariable("start_date")Date date){
        List<TourDto> tourDtos = tourService.searchByStartDate(date);
        if(tourDtos.isEmpty())
            return new ResponseEntity<>("Ko tim thay chuyen du lich co ngay bat dau: "+date.toString(),HttpStatus.BAD_REQUEST);
        return ResponseEntity.ok(tourDtos);
    }


}
