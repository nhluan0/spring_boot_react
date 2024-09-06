package luan.datve.dulich.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;

import javax.print.attribute.standard.Media;
import java.io.IOException;

public class JwtAuthenticationEntryPoint implements AuthenticationEntryPoint {
    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException, ServletException {

        String token = request.getHeader("Authorization");
//        if(token != null && token.startsWith("Bearer ")){
            // set status response
            response.setStatus(HttpStatus.UNAUTHORIZED.value());
            // set context type tra ve
            response.setContentType(MediaType.APPLICATION_JSON_VALUE);
            // set body response
            response.getWriter().write("Un_Authentication ko hop le");
            response.flushBuffer();
//        }

    }
}
