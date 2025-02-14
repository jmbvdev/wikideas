package com.idforideas.wikideas.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.Set;

@Getter
@Setter
@Builder(toBuilder = true)
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "themes")
public class ThemeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idTheme")
    private Long idTheme;

    @Column(name = "theme")
    @NotNull
    @Enumerated (value = EnumType.STRING)
    private ThemeEnum theme;

    @Column(name = "description")
    @NotNull
    private String description;

    @Column(name = "creationDate")
    @CreationTimestamp
    private LocalDateTime creationDate;

    @Column(name = "updateDate")
    @UpdateTimestamp
    private LocalDateTime updateDate;

    @OneToMany(mappedBy="theme",fetch = FetchType.LAZY)
    private Set<ArticleEntity> Article;

}
