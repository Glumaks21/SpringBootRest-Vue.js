package letscode.sarafan.controller;

import letscode.sarafan.domain.User;
import letscode.sarafan.repo.MessageRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.HashMap;
import java.util.Map;

@RequiredArgsConstructor
@Controller
@RequestMapping("/")
public class MainController {

    @Value("${spring.profile.active}")
    private String profile;
    private final MessageRepo messageRepo;

    @GetMapping
    public String main(Model model, @AuthenticationPrincipal OAuth2User user) {
        Map<Object, Object> data = new HashMap<>();

        data.put("profile", user);
        data.put("messages", messageRepo.findAll());

        model.addAttribute("frontedData", data);
        model.addAttribute("isDevMode", "dev".equals(profile));
        return "index";
    }

}
