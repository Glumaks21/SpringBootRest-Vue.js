package letscode.sarafan.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;

@Getter
@Setter
@ToString
@EqualsAndHashCode(of = "id")

@Entity
@Table(name = "usr")
public class User {
    @Id
    private String id;

    private String name;

    private String userpic;

    private String email;

    private String gender;

    private String locale;

    private LocalDateTime lastVisit;
}
