DROP DATABASE IF EXISTS earworm_report;
CREATE DATABASE earworm_report;

\c earworm_report

CREATE TABLE users(
  id SERIAL PRIMARY KEY NOT NULL,
  username VARCHAR UNIQUE NOT NULL
);

CREATE TABLE genres(
  id SERIAL PRIMARY KEY NOT NULL,
  genre_name VARCHAR UNIQUE NOT NULL
);

CREATE TABLE songs(
  id SERIAL PRIMARY KEY,
  title VARCHAR NOT NULL,
  img_url VARCHAR,
  user_id INT REFERENCES users(id),
  genre_id INT REFERENCES genres(id)
);

CREATE TABLE favorites(
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id),
  song_id INT REFERENCES songs(id)
);

CREATE TABLE comments(
  id SERIAL PRIMARY KEY,
  comment_body TEXT,
  user_id INT REFERENCES users(id),
  song_id INT REFERENCES songs(id)
);
