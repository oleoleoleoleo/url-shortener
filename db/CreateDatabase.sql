USE ShortenedUrls;

CREATE TABLE
    urls (
        id integer not null auto_increment,
        slug varchar(200),
        url varchar(200),
        hit_count INTEGER NOT NULL DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        primary key (id)
    );

SET character_set_client = utf8;

SET character_set_connection = utf8;

SET character_set_results = utf8;

SET collation_connection = utf8_general_ci;

INSERT INTO urls (slug, url) VALUES ("ggl", "http://google.com");