-- -----------------------------------------------------
-- Schema oquiz
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Table "level"
-- -----------------------------------------------------
DROP TABLE IF EXISTS "level" ;

CREATE TABLE IF NOT EXISTS "level" (
  "id" SERIAL NOT NULL,
  "name" VARCHAR(32) NOT NULL,
  "status" INT NOT NULL DEFAULT 0,
  "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP NULL,
  PRIMARY KEY ("id"));


-- -----------------------------------------------------
-- Table "answer"
-- -----------------------------------------------------
DROP TABLE IF EXISTS "answer" ;

CREATE TABLE IF NOT EXISTS "answer" (
  "id" SERIAL NOT NULL,
  "description" VARCHAR(255) NOT NULL,
  "status" INT NOT NULL DEFAULT 0,
  "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP NULL,
  "question_id" INT NOT NULL,
  PRIMARY KEY ("id"));


-- -----------------------------------------------------
-- Table "app_user"
-- -----------------------------------------------------
DROP TABLE IF EXISTS "app_user" ;

CREATE TABLE IF NOT EXISTS "app_user" (
  "id" SERIAL NOT NULL,
  "email" VARCHAR(255) NOT NULL,
  "password" VARCHAR(60) NOT NULL,
  "firstname" VARCHAR(64) NULL,
  "lastname" VARCHAR(64) NULL,
  "status" INT NOT NULL DEFAULT 0,
  "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP NULL,
  PRIMARY KEY ("id"));


-- -----------------------------------------------------
-- Table "quizz"
-- -----------------------------------------------------
DROP TABLE IF EXISTS "quizz" ;

CREATE TABLE IF NOT EXISTS "quizz" (
  "id" SERIAL NOT NULL,
  "title" VARCHAR(64) NOT NULL,
  "description" VARCHAR(255) NULL,
  "status" INT NOT NULL DEFAULT 0,
  "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP NULL,
  "app_user_id" INT NOT NULL,
  PRIMARY KEY ("id"));


-- -----------------------------------------------------
-- Table "question"
-- -----------------------------------------------------
DROP TABLE IF EXISTS "question" ;

CREATE TABLE IF NOT EXISTS "question" (
  "id" SERIAL NOT NULL,
  "question" VARCHAR(255) NOT NULL,
  "anecdote" TEXT NULL,
  "wiki" VARCHAR(64) NULL,
  "status" INT NOT NULL DEFAULT 0,
  "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP NULL,
  "level_id" INT NOT NULL,
  "answer_id" INT NOT NULL, /* COMMENT 'Id de la bonne réponse',*/
  "quizz_id" INT NOT NULL,
  PRIMARY KEY ("id"));


-- -----------------------------------------------------
-- Table "tag"
-- -----------------------------------------------------
DROP TABLE IF EXISTS "tag" ;

CREATE TABLE IF NOT EXISTS "tag" (
  "id" SERIAL NOT NULL,
  "name" VARCHAR(64) NOT NULL,
  "status" INT NOT NULL DEFAULT 0,
  "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP NULL,
  PRIMARY KEY ("id"));


-- -----------------------------------------------------
-- Table "quizz_has_tag"
-- -----------------------------------------------------
DROP TABLE IF EXISTS "quizz_has_tag" ;

CREATE TABLE IF NOT EXISTS "quizz_has_tag" (
  "quizz_id" INT NOT NULL,
  "tag_id" INT NOT NULL,
  "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY ("quizz_id", "tag_id"));