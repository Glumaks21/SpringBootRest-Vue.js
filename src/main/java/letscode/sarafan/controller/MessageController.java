package letscode.sarafan.controller;

import com.fasterxml.jackson.annotation.JsonView;
import letscode.sarafan.domain.Message;
import letscode.sarafan.domain.Views;
import letscode.sarafan.dto.EventType;
import letscode.sarafan.dto.ObjectType;
import letscode.sarafan.repo.MessageRepo;
import letscode.sarafan.util.WsSender;
import org.springframework.beans.BeanUtils;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.function.BiConsumer;

@RestController
@RequestMapping(path = "/messages")
@CrossOrigin(origins = "http://localhost:8000")
public class MessageController {

    private final MessageRepo repo;
    private final BiConsumer<EventType, Message> wsSender;

    public MessageController(MessageRepo repo, WsSender wsSender) {
        this.repo = repo;
        this.wsSender = wsSender.getSender(ObjectType.MESSAGE, Views.IdName.class);
    }

    @GetMapping(produces = "application/json")
    @JsonView(Views.IdName.class)
    public List<Message> getAll() {
        return repo.findAll();
    }

    @GetMapping(path = "/{id}", produces = "application/json")
    public Message getOne(@PathVariable("id") Message message) {
        return message;
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PutMapping(path = "/{id}", consumes = "application/json", produces="application/json")
    public Message update(@PathVariable("id") Message messageFromDb,
                          @RequestBody Message message) {
        BeanUtils.copyProperties(message, messageFromDb, "id");

        Message updatedMessage = repo.save(messageFromDb);

        wsSender.accept(EventType.UPDATE, updatedMessage);

        return updatedMessage;
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping(consumes = "application/json", produces = "application/json")
    public Message create(@RequestBody Message message) {
        message.setCreationTime(LocalDateTime.now());
        Message savedMessage = repo.save(message);

        wsSender.accept(EventType.CREATE, savedMessage);

        return savedMessage;
    }

    @DeleteMapping(path = "/{id}", produces = "application/json")
    public void delete(@PathVariable("id") Message message) {
        repo.delete(message);
        wsSender.accept(EventType.REMOVE, message);
    }

}
