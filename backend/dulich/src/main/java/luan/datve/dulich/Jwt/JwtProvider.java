package luan.datve.dulich.Jwt;

import com.nimbusds.jose.*;
import com.nimbusds.jose.crypto.MACSigner;

import com.nimbusds.jose.crypto.MACVerifier;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;
import lombok.extern.slf4j.Slf4j;
import luan.datve.dulich.exception.ResourceNotExceptionFound;
import luan.datve.dulich.model.LogoutToken;
import luan.datve.dulich.model.User;
import luan.datve.dulich.repository.LogoutTokenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;


import java.text.ParseException;
import java.time.Instant;
import java.util.Date;
import java.util.Optional;
import java.util.UUID;

@Service
@Slf4j
public class JwtProvider {

    @Value("${jwt.secret}")
    private String jwtSecret;

    @Value("${jwt.expiration}")
    private long jwtExpiration;
    @Autowired
    private LogoutTokenRepository logoutTokenRepository;
    // generate toke jwt
    public String generateToken(User user) throws JOSEException {
        // create header
        JWSHeader header = new JWSHeader(JWSAlgorithm.HS256);
        // set claim
        JWTClaimsSet claimsSet = new JWTClaimsSet.Builder()
                .issuer("luan")
                .subject(user.getUserName())
                .issueTime(new Date())
                .expirationTime(new Date(new Date().getTime() + jwtExpiration))
                .jwtID(UUID.randomUUID().toString())
                .claim("scope",user.getRoles().getRole())
                .build();
        // set signed
        SignedJWT signedJWT = new SignedJWT(header,claimsSet);
        // set chu ky
        JWSSigner signer = new MACSigner(jwtSecret.getBytes());
        signedJWT.sign(signer);
        return signedJWT.serialize();
    }
    // get token tu cac doi tuong da dang nhap
    public String getToken(){
        Jwt authenticated = (Jwt) SecurityContextHolder
                                                    .getContext()
                                                    .getAuthentication()
                                                    .getCredentials();
        System.out.println(authenticated.toString());
        var token = authenticated.getTokenValue();
        return token;
    }

        // 1. xac nhan chu ky
        // 2. verifier token ( if token da co trong co so du lieu or
        // xac thuc chu ky sai or xac thoi gian token da het han thi => return false )
        // nguoc lai tra ve true dong thoi luu vao lai database
    public SignedJWT verifier(String token) throws ParseException, JOSEException {
        log.info(token);
        // xac thuc chu ky
        JWSVerifier jwsVerifier = new MACVerifier(jwtSecret.getBytes());
        // phan tich token
        SignedJWT signedJWT = SignedJWT.parse(token);
        // xac nhan chu ky
        Boolean isValidSignature = signedJWT.verify(jwsVerifier);
        // xac nhan claim
        JWTClaimsSet claimsSet = signedJWT.getJWTClaimsSet();
        System.out.println(claimsSet.getExpirationTime());
        System.out.println(new Date());
        Boolean isValidateExpiration = claimsSet.getExpirationTime().before(new Date());
        System.out.println(isValidateExpiration +" "+isValidSignature);
        // kiem tra token con han su dung ko or token ko xac dinh duoc chu ky
        if(isValidateExpiration || !isValidSignature) throw  new ResourceNotExceptionFound("token ko hop le");
        // lai id tu token
        String id = claimsSet.getJWTID();
        // kiem tra token da co trong co so du lieu chua
       var  logoutToken = logoutTokenRepository.findById(id);
       if(logoutToken.isPresent()) throw new ResourceNotExceptionFound("Token da logout");

        return signedJWT;

    }

    // verifing token
    public Boolean verifyToken(String token) throws ParseException, JOSEException {
        // 1: parse token
        SignedJWT jwt = SignedJWT.parse(token);
        // 2: verify signed
        JWSVerifier jwsVerifier = new MACVerifier(jwtSecret.getBytes());
        Boolean isvalidateSigned = jwt.verify(jwsVerifier);
        // check signed invalidate
        if(!isvalidateSigned)return false;
        // 3: get claim
        JWTClaimsSet claimsSet = jwt.getJWTClaimsSet();
        // 4: get expired
        Instant expired = claimsSet.getExpirationTime().toInstant();
        return expired.isAfter(Instant.now());
    }
    // set expiration time for a token given
    public String generateTokenByUserRegistion(User user,Date expirationDate) throws JOSEException {
        // 1: create header
        JWSHeader header = new JWSHeader(JWSAlgorithm.HS256);
        // 2: set claim
        JWTClaimsSet claimsSet = new JWTClaimsSet.Builder()
                .issuer("luan")
                .subject(user.getUserName())
                .jwtID(user.getId().toString())
                .issueTime(new Date())
                .expirationTime(expirationDate)
                .build();
        // 3: set signature
        SignedJWT signedJWT = new SignedJWT(header,claimsSet);
        // 4: encode signature
        MACSigner  macSigner = new MACSigner(jwtSecret.getBytes());
        // 5: assign signed to jwt
        signedJWT.sign(macSigner);
        return signedJWT.serialize();
    }
    // get user name from token
    public String getUsernameFromToken(String token) throws ParseException {
        // 1: parse token
        SignedJWT jwt = SignedJWT.parse(token);
        // 2: get claimsSet
        JWTClaimsSet claimsSet = jwt.getJWTClaimsSet();
        // 3: get username
        String username = claimsSet.getSubject();
        return username;
    }

}
