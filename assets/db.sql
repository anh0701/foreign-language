create table words (
    id int AUTO_INCREMENT primary key ,
    en VARCHAR(100),
    vi VARCHAR(255),
    audio_url VARCHAR(255),
    level int
);

create table sentences (
    id int AUTO_INCREMENT primary key,
    sentence text,
    answer VARCHAR(50),
    options json, -- (["eat","drink","buy"])
    translation text,
    level int
);

SELECT JSON_ARRAYAGG(
  JSON_OBJECT(
    -- 'id', id,
    'en', en,
    'vi', vi,
    -- 'audio_url', audio_url,
    -- 'level', level
  )
) AS json_result
FROM words;

SELECT JSON_ARRAYAGG(
  JSON_OBJECT(
    -- 'id', id,
    'sentence', sentence,
    'answer', answer,
    'options', options,
    'translation', translation,
    -- 'level', level
  )
) AS json_result
FROM sentences;


