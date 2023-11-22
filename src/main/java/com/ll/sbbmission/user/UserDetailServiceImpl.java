package com.ll.sbbmission.user;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetailsService;

@RequiredArgsConstructor
public class UserDetailServiceImpl implements UserDetailsService {
    private final UserRepository userRepository;

    @Override
    public SiteUser loadUserByUsername(String username) {
        return this.userRepository.findByUsername(username);
    }
}
