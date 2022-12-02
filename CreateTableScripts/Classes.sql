CREATE TABLE classes
(
    Class_ID INT NOT NULL AUTO_INCREMENT,
    Tutor_ID INT NOT NULL,
    Class_MaxCapacity INT NOT NULL,
    Class_CurrentCapacity INT NOT NULL,
    Class_Name VARCHAR(255) NOT NULL,
    Class_Date DATE NOT NULL,
    Class_Duration FLOAT NOT NULL,
    Class_Status VARCHAR(1) NOT NULL,

    PRIMARY KEY(Class_ID),
    FOREIGN KEY(Tutor_ID) REFERENCES users(User_ID)
);