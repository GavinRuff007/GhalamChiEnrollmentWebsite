package ir.accountingsystem.reactive.ws.backendaccountingsystem.controller;

import ir.accountingsystem.reactive.ws.backendaccountingsystem.model.RoleModel;
import ir.accountingsystem.reactive.ws.backendaccountingsystem.model.UserModel;
import ir.accountingsystem.reactive.ws.backendaccountingsystem.repository.UserRepository;
import ir.accountingsystem.reactive.ws.backendaccountingsystem.util.JwtTokenProvider;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authManager;
    private final JwtTokenProvider jwtTokenProvider;
    private final UserRepository userRepository;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> request, HttpServletResponse response) {
        Authentication authentication = authManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.get("username"),
                        request.get("password"))
        );
        String accessToken = jwtTokenProvider.generateToken(authentication);
        String refreshToken = jwtTokenProvider.generateRefreshToken(authentication);
        ResponseCookie cookie = ResponseCookie.from("refreshToken", refreshToken)
                .httpOnly(true)
                .secure(false)
                .path("/")
                .maxAge(7 * 24 * 60 * 60)
                .sameSite("Lax")
                .build();
        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());
        System.out.println("✅ Cookie Set: " + cookie.toString());
        UserModel userModel = userRepository.findByUsername(request.get("username")).orElseThrow();
        List<String> roles = userModel.getRoleModels().stream().map(RoleModel::getName).toList();
        return ResponseEntity.ok(Map.of(
                "accessToken", accessToken,
                "refreshToken", refreshToken,
                "roles", roles,
                "state","OK"
        ));
    }

    @PostMapping("/refresh-check")
    public ResponseEntity<?> checkRefreshToken(@CookieValue(value = "refreshToken", required = false) String refreshToken) {
        if (refreshToken == null) {
            return ResponseEntity.status(401).body(Map.of(
                    "state", "invalid",
                    "message", "No refresh token found"
            ));
        }
        if (!jwtTokenProvider.validateToken(refreshToken)) {
            return ResponseEntity.status(401).body(Map.of(
                    "state", "invalid",
                    "message", "Refresh token invalid or expired"
            ));
        }
        String username = jwtTokenProvider.getUsername(refreshToken);
        UserModel userModel = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        List<String> roles = userModel.getRoleModels().stream().map(RoleModel::getName).toList();
        return ResponseEntity.ok(Map.of(
                "state", "ok",
                "roles", roles
        ));
    }

}
