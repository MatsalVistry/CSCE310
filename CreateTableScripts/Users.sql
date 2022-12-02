CREATE TABLE users
(
    User_ID INT NOT NULL AUTO_INCREMENT,
    User_First_Name VARCHAR(50) NOT NULL,
    User_Last_Name VARCHAR(50) NOT NULL,
    User_Role VARCHAR(1) NOT NULL,
    User_Email VARCHAR(255) NOT NULL,
    User_Password VARCHAR(255) NOT NULL,
    PRIMARY KEY(User_ID)
);