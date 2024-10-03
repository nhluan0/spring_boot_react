package luan.datve.dulich.service.impl;

import lombok.AllArgsConstructor;
import luan.datve.dulich.repository.LogoutTokenRepository;
import luan.datve.dulich.service.LogoutTokenService;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class LogoutTokenServiceImp implements LogoutTokenService {
    private LogoutTokenRepository logoutTokenRepository;
    @Scheduled(cron = "0 10 12 * * *")
    @Override
    public void deleteAllTokenLogout() {
        logoutTokenRepository.deleteAll();
        System.out.println("scheduling is running");
    }
}
