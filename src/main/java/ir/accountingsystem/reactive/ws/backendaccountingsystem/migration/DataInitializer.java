package ir.accountingsystem.reactive.ws.backendaccountingsystem.migration;

import ir.accountingsystem.reactive.ws.backendaccountingsystem.model.Role;
import ir.accountingsystem.reactive.ws.backendaccountingsystem.model.User;
import ir.accountingsystem.reactive.ws.backendaccountingsystem.repository.RoleRepository;
import ir.accountingsystem.reactive.ws.backendaccountingsystem.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepo;
    private final RoleRepository roleRepo;
    private final PasswordEncoder encoder;

    @Override
    public void run(String... args) {
        if (roleRepo.count() == 0) {
            Role adminRole = roleRepo.save(new Role(null, "ROLE_ADMIN"));
            Role userRole = roleRepo.save(new Role(null, "ROLE_USER"));

            User admin = new User();
            admin.setUsername("admin");
            admin.setPassword(encoder.encode("1234"));
            admin.getRoles().add(adminRole);
            userRepo.save(admin);

            User user = new User();
            user.setUsername("user");
            user.setPassword(encoder.encode("1234"));
            user.getRoles().add(userRole);
            userRepo.save(user);
        }
    }
}
