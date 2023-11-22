package com.ll.sbbmission.jwt;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.web.filter.GenericFilterBean;

import java.io.IOException;

@RequiredArgsConstructor
public class JwtFilter extends GenericFilterBean {
    private final JwtConfig jwtConfig;

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        HttpServletRequest httpRequest = (HttpServletRequest) request;
        System.out.println("test");
//        String token = httpRequest.getHeader("jwtConfig.getHeader()");
//
//        if (token != null && token.startsWith("Bearer ")) {
//            token = token.substring(7);
//            try {
//                Claims claims = jwtConfig.parseToken(token);
//                String username = claims.getSubject();
//                List<String> roles = claims.get("roles", List.class);
//                Collection<GrantedAuthority> authorities = new ArrayList<>();
//                for (String role : roles) {
//                    authorities.add(new SimpleGrantedAuthority(role));
//                }
//                Authentication authentication = new UsernamePasswordAuthenticationToken(username, null, authorities);
//                SecurityContextHolder.getContext().setAuthentication(authentication);
//            } catch (Exception e) {
//                // 토큰이 유효하지 않거나 만료된 경우
//                SecurityContextHolder.clearContext();
//            }
//        }

        chain.doFilter(request, response);
    }
}
