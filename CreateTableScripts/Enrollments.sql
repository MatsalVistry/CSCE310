CREATE TABLE Enrollments
(
    Enrollment_ID INT NOT NULL AUTO_INCREMENT,
    Student_ID INT NOT NULL,
    Class_ID INT NOT NULL,
    
    PRIMARY KEY(Enrollment_ID),
    FOREIGN KEY(Student_ID) REFERENCES Users(User_ID),
    FOREIGN KEY(Class_ID) REFERENCES Classes(Class_ID)
);