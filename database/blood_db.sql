CREATE DATABASE blood_db;
USE blood_db;
CREATE TABLE donors (
  id INT AUTO_INCREMENT PRIMARY KEY,

  name VARCHAR(100) NOT NULL,
  donor_id VARCHAR(50) NOT NULL UNIQUE,
  phone VARCHAR(15) NOT NULL,
  email VARCHAR(100) NOT NULL,

  blood_group ENUM(
    'A+','A-','B+','B-',
    'AB+','AB-','O+','O-'
  ) NOT NULL,

  department VARCHAR(50) NOT NULL,
  year VARCHAR(20) NOT NULL,
  gender ENUM('Male','Female','Other') NOT NULL,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO donors
(name, donor_id, phone, email, blood_group, department, year, gender)
VALUES
('cat', 'STU101', '9999999999', 'akhil@gmail.com', 'O+', 'CSE', '3rd Year', 'Male');
 select * from donors;