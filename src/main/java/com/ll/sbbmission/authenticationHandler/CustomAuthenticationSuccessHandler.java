package com.ll.sbbmission.authenticationHandler;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

import java.io.IOException;

public class CustomAuthenticationSuccessHandler implements AuthenticationSuccessHandler {

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        // 여기에 사용자 정의 로직을 추가합니다.
        // 예를 들어, 특정 작업을 수행하거나 응답에 추가 정보를 넣을 수 있습니다.

        // 사용자에 대한 추가 정보 가져오기
        response.setStatus(HttpServletResponse.SC_OK);
    }
}
