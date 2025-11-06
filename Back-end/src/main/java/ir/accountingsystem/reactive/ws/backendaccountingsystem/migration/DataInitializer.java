package ir.accountingsystem.reactive.ws.backendaccountingsystem.migration;

import ir.accountingsystem.reactive.ws.backendaccountingsystem.model.RoleModel;
import ir.accountingsystem.reactive.ws.backendaccountingsystem.model.UserModel;
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
            RoleModel adminRoleModel = roleRepo.save(new RoleModel(null, "ROLE_ADMIN"));
            RoleModel userRoleModel = roleRepo.save(new RoleModel(null, "ROLE_USER"));

            UserModel admin = new UserModel();
            admin.setUsername("admin");
            admin.setPassword(encoder.encode("1234"));
            admin.getRoleModels().add(adminRoleModel);
            userRepo.save(admin);

            UserModel userModel = new UserModel();
            userModel.setUsername("user");
            userModel.setPassword(encoder.encode("1234"));
            userModel.getRoleModels().add(userRoleModel);
            userRepo.save(userModel);
        }
    }
}
