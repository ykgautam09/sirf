DROP DATABASE IF EXISTS `upirf`;
CREATE DATABASE IF NOT EXISTS `upirf`;
USE `upirf`;

CREATE TABLE IF NOT EXISTS `user`(
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `aktu_id` VARCHAR(50) NOT NULL,
    `aicte_id` VARCHAR(50) NOT NULL,
    `college_name` VARCHAR(200) NOT NULL,
    `username` VARCHAR(50) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `password` VARCHAR(100) NOT NULL,
    `institute_type` VARCHAR(10) NOT NULL
);
