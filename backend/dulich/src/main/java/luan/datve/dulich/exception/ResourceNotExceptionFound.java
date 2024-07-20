package luan.datve.dulich.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class ResourceNotExceptionFound extends RuntimeException{
    public ResourceNotExceptionFound(String mess){
        super(mess);
    }
}
