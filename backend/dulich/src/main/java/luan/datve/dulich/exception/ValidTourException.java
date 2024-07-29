package luan.datve.dulich.exception;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.util.HashMap;
import java.util.Map;
@Data
@AllArgsConstructor
public class ValidTourException extends RuntimeException{
    private Map<String,String> map;
    public ValidTourException(){
        this.map = new HashMap<>();
    }
}
