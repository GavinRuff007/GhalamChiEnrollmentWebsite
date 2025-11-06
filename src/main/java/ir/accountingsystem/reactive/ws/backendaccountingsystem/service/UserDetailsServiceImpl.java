package ir.accountingsystem.reactive.ws.backendaccountingsystem.service;

import ir.accountingsystem.reactive.ws.backendaccountingsystem.model.UserModel;
import ir.accountingsystem.reactive.ws.backendaccountingsystem.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserModel userModel = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        Set<GrantedAuthority> authorities = userModel.getRoleModels()
                .stream()
                .map(r -> new SimpleGrantedAuthority(r.getName()))
                .collect(Collectors.toSet());
        return new org.springframework.security.core.userdetails.User(
                userModel.getUsername(), userModel.getPassword(), authorities);
    }
}
