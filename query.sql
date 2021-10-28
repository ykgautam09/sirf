DROP DATABASE IF EXISTS `upirf`;
CREATE DATABASE IF NOT EXISTS `upirf`;
USE `upirf`;

CREATE TABLE IF NOT EXISTS `institute`(
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `aktu_id` VARCHAR(50) NOT NULL,
    `aicte_id` VARCHAR(50) NOT NULL,
    `name` VARCHAR(200) NOT NULL,
    `username` VARCHAR(50) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `password` VARCHAR(150) NOT NULL,
    `type` VARCHAR(10) NOT NULL,
    `website` VARCHAR(200) DEFAULT NULL,
    `officer_name` VARCHAR(200) NOT NULL,
    `officer_contact` VARCHAR(50) NOT NULL,
    `officer_post` VARCHAR(50) NOT NULL,
    `certificate` VARCHAR(200) NOT NULL,
    `miscellaneous` TEXT NULL DEFAULT NULL
);


CREATE TABLE IF NOT EXISTS `otp`(
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `otp` VARCHAR(25) NOT NULL,
    `user_id` BIGINT NOT NULL,
    `time` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
