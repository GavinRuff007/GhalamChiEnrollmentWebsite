package ir.accountingsystem.reactive.ws.backendaccountingsystem.service;

import ir.accountingsystem.reactive.ws.backendaccountingsystem.model.User;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class UserService {

    private final Map<String, User> users = new HashMap<>();

    public UserService() {
        users.put("admin", new User("admin", "1234", "ADMIN"));
        users.put("john", new User("john", "abcd", "USER"));
        users.put("sara", new User("sara", "1111", "USER"));
    }

    public User findByUsername(String username) {
        return users.get(username);
    }
}
