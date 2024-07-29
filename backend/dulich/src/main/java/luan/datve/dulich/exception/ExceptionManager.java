package luan.datve.dulich.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.multipart.support.MissingServletRequestPartException;

import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
public class ExceptionManager {

    @ExceptionHandler(value = ResourceNotExceptionFound.class)
    public ResponseEntity<?> notFound(ResourceNotExceptionFound resourceNotExceptionFound){
        return new ResponseEntity<>(resourceNotExceptionFound.getLocalizedMessage(), HttpStatus.BAD_REQUEST);
    }
    @ExceptionHandler(value = MethodArgumentNotValidException.class)
    public ResponseEntity<?> validTourException(MethodArgumentNotValidException exception){
        ValidTourException validTourException = new ValidTourException();
        if(exception.hasErrors()){
            Map<String,String> map = new HashMap<>();
            for(FieldError error : exception.getFieldErrors()){
                map.put(error.getField(),error.getDefaultMessage());

            }
            validTourException.setMap(map);
        }

        return new ResponseEntity<>(validTourException.getMap(),HttpStatus.BAD_REQUEST);
    }
    @ExceptionHandler(value = MissingServletRequestPartException.class)
    ResponseEntity<?> fileError(MissingServletRequestPartException exception){
        Map<String,String> map = new HashMap<>();
        map.put("file","file ko bo trong");
        return new ResponseEntity<>(map,HttpStatus.BAD_REQUEST);
    }
}
