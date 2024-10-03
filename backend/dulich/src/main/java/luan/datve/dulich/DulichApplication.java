package luan.datve.dulich;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class DulichApplication {

	public static void main(String[] args) {
		SpringApplication.run(DulichApplication.class, args);
	}

}
