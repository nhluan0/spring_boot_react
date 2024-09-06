package luan.datve.dulich.Jwt;

import com.nimbusds.jose.JOSEException;
import com.nimbusds.jwt.SignedJWT;
import lombok.AccessLevel;

import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.experimental.NonFinal;

import lombok.extern.slf4j.Slf4j;
import luan.datve.dulich.exception.ResourceNotExceptionFound;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtException;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.stereotype.Component;

import javax.crypto.spec.SecretKeySpec;
import java.text.ParseException;
import java.util.Objects;

@Component
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
@Slf4j
public class JwtCustomDecoder implements JwtDecoder {
    JwtProvider jwtProvider;
    @NonFinal
    NimbusJwtDecoder nimbusJwtDecoder = null;
    @NonFinal
    @Value("${jwt.secret}")
    String jwtSecret;
    @Override
    public Jwt decode(String token) throws JwtException {
        log.info(token);

        try {
            SignedJWT signedJWT = jwtProvider.verifier(token);
        } catch (ParseException e) {
            throw new RuntimeException(e);
        } catch (JOSEException e) {
            throw new RuntimeException(e);
        }
        log.info("co vo day ko");

            if(Objects.isNull(nimbusJwtDecoder)){
                SecretKeySpec secretKeySpec = new SecretKeySpec(jwtSecret.getBytes(),"HS256");
                nimbusJwtDecoder = NimbusJwtDecoder
                        .withSecretKey(secretKeySpec)
                        .macAlgorithm(MacAlgorithm.HS256)
                        .build();
            }
            return nimbusJwtDecoder.decode(token);
        }


}
