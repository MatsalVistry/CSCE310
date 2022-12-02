CREATE TABLE enrollments
(
    Enrollment_ID INT NOT NULL AUTO_INCREMENT,
    Student_ID INT NOT NULL,
    Class_ID INT NOT NULL,
    
    PRIMARY KEY(Enrollment_ID),
    FOREIGN KEY(Student_ID) REFERENCES users(User_ID),
    FOREIGN KEY(Class_ID) REFERENCES classes(Class_ID)
);