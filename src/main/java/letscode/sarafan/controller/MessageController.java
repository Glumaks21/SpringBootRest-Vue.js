package letscode.sarafan.controller;

import letscode.sarafan.exceptions.ResourceNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/messages")
public class MessageController {
    private int counter = 4;
    public List<Map<String, String>> messages = new ArrayList<>() {{
        add(new HashMap<>() {{
            put("id", "1");
            put("text", "First message");
        }});
        add(new HashMap<>() {{
            put("id", "2");
            put("text", "Message from server");
        }});
        add(new HashMap<>() {{
            put("id", "3");
            put("text", "Third message");
        }});
    }};


    @GetMapping
    public List<Map<String, String>> list() {
        return messages;
    }


    @GetMapping("{id}")
    public Map<String, String> getOne(@PathVariable String id) {
        return getMessageById(id);
    }

    private Map<String, String> getMessageById(String id) {
        return list().stream()
                .filter(message -> message.get("id").equals(id))
                .findFirst()
                .orElseThrow(() -> new ResourceNotFoundException("message with id: " + id));
    }

    @PostMapping
    public Map<String, String> create(@RequestBody Map<String, String> message) {
        message.put("id", Integer.toString(counter++));
        messages.add(message);
        return message;
    }

    @PutMapping("{id}")
    public Map<String, String> update(@PathVariable String id, @RequestBody Map<String, String> message) {
        Map<String, String> messageFromDb = getMessageById(id);

        messageFromDb.putAll(message);
        messageFromDb.put("id", id);

        return messageFromDb;
    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable String id) {
        Map<String, String> message = getMessageById(id);
        messages.remove(message);
    }

}
