CREATE TABLE db.User (
    ID INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `Name` VARCHAR(20) NOT NULL,
    Surname VARCHAR(20) NOT NULL,
    `Login` VARCHAR(20),
    `Password` VARCHAR(20),
    Phone VARCHAR(15) NOT NULL,
    Email VARCHAR(50),
    Registration_Timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `Role` ENUM('USER', 'ADMIN', 'MODERATOR') DEFAULT "USER"
);

CREATE TABLE db.Category(
    ID INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    Category VARCHAR(10) NOT NULL
);

CREATE TABLE db.Place(
    ID INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    Title VARCHAR(50) NOT NULL,
    Adress VARCHAR(100) NOT NULL CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
    Category_ID INT NOT NULL,
    Latitude FLOAT NOT NULL,
    Longitude FLOAT NOT NULL,
    Added_Timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    Requested_Timestamp DATETIME,
    Opened BOOLEAN DEFAULT TRUE,
    Submission_User_ID INT,
    FOREIGN KEY (Category_ID) REFERENCES db.Category(ID),
    FOREIGN KEY (Submission_User_ID) REFERENCES db.User(ID)
);

CREATE TABLE db.Place_Submission(
    ID INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    Title VARCHAR(50) NOT NULL,
    Adress VARCHAR(255) NOT NULL CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
    Category_ID INT NOT NULL,
    Latitude FLOAT,
    Longitude FLOAT,
    Submission_User_ID INT,
    Requested_Timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (Category_ID) REFERENCES db.Category(ID),
    FOREIGN KEY (Submission_User_ID) REFERENCES db.User(ID)
);

CREATE TABLE db.Feedback(
    ID INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    Place_ID INT NOT NULL,
    Rate TINYINT NOT NULL,
    `Comment` VARCHAR(140),
    Budget_Rating TINYINT,
    User_ID INT,
    FOREIGN KEY (Place_ID) REFERENCES db.Place(ID),
    FOREIGN KEY (User_ID) REFERENCES db.User(ID)
);