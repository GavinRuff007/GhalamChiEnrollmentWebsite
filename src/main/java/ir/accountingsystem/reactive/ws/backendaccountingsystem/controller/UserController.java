package ir.accountingsystem.reactive.ws.backendaccountingsystem.controller;

import ir.accountingsystem.reactive.ws.backendaccountingsystem.model.User;
import ir.accountingsystem.reactive.ws.backendaccountingsystem.service.UserService;
import org.springframework.web.bind.annotation.*;


@CrossOrigin(origins = "*")  // برای اجازه دادن به درخواست از React
@RestController
@RequestMapping("/user")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/{username}")
    public User getUserByUsername(@PathVariable String username) {
        User user = userService.findByUsername(username);
        if (user == null) {
            // در صورت عدم وجود کاربر، پاسخ خالی می‌دهیم تا React خودش هندل کند
            return new User();
        }
        return user;
    }
}
