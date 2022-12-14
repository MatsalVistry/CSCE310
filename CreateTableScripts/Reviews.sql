CREATE TABLE reviews
(
    Review_ID INT NOT NULL AUTO_INCREMENT,
    Student_ID INT NOT NULL,
    Tutor_ID INT NOT NULL,
    Review_String VARCHAR(1000) NOT NULL,

    PRIMARY KEY(Review_ID),
    FOREIGN KEY(Student_ID) REFERENCES users(User_ID),
    FOREIGN KEY(Tutor_ID) REFERENCES users(User_ID)
);