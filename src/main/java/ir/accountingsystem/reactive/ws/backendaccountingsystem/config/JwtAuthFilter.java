package ir.accountingsystem.reactive.ws.backendaccountingsystem.config;

import ir.accountingsystem.reactive.ws.backendaccountingsystem.service.authentication.UserDetailsServiceImpl;
import ir.accountingsystem.reactive.ws.backendaccountingsystem.util.JwtTokenProvider;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@RequiredArgsConstructor
public class JwtAuthFilter extends OncePerRequestFilter {

    private final JwtTokenProvider jwtTokenProvider;
    private final UserDetailsServiceImpl userDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {

        String header = request.getHeader("Authorization");
        String token = null;
        String username = null;

        try {
            if (header != null && header.startsWith("Bearer ")) {
                token = header.substring(7);
                username = jwtTokenProvider.getUsername(token);
            }
        } catch (Exception ex) {
            System.out.println("❌ JWT Parse Error: " + ex.getMessage());
        }

        if (username != null &&
                SecurityContextHolder.getContext().getAuthentication() == null) {

            if (jwtTokenProvider.validateToken(token)) {

                // 🔥 UserDetails از دیتابیس
                UserDetails userDetails = userDetailsService.loadUserByUsername(username);

                // 🔥 Authentication با نقش‌ها
                UsernamePasswordAuthenticationToken auth =
                        new UsernamePasswordAuthenticationToken(
                                userDetails,
                                null,
                                userDetails.getAuthorities()   // نقش‌ها اینجاست
                        );

                auth.setDetails(
                        new WebAuthenticationDetailsSource().buildDetails(request)
                );

                // 🔥 امنیت پر می‌شود → 403 رفع می‌شود
                SecurityContextHolder.getContext().setAuthentication(auth);
            }
        }

        filterChain.doFilter(request, response);
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        String path = request.getRequestURI();
        return path.equals("/api/auth/login") ||
                path.equals("/api/auth/refresh-check");
    }

}
