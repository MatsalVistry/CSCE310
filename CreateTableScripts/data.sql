DELETE FROM Enrollments;
DELETE FROM Classes;
DELETE FROM Reviews;
DELETE FROM Users;

ALTER TABLE Enrollments AUTO_INCREMENT = 1;
ALTER TABLE Classes AUTO_INCREMENT = 1;
ALTER TABLE Reviews AUTO_INCREMENT = 1;
ALTER TABLE Users AUTO_INCREMENT = 1;

INSERT INTO Users (User_First_Name, User_Last_Name, User_Role, User_Email, User_Password) VALUES 
    ('John', 'Doe', 's', 'JohnDoe@gmail.com', '123'),
    ('Jane', 'Ross', 's', 'JaneRoss@gmail.com', '123'),
    ('Joe', 'Smith', 's', 'JoeSmith@gmail.com', '123'),
    ('Kylie', 'Clause', 's', 'JaneClause@gmail.com','123'),
    ('Rick', 'Kade', 't', 'RickKade@gmail.com', '123'),
    ('Bob', 'Ross', 't', 'BobRoss@gmail.com', '123'),
    ('Chen', 'Zhu', 'a', 'ChenZhu@gmail.com', '123'),
    ('Michael', 'Scott', 'a', 'MichaelScott@gmail.com', '123');


INSERT INTO Classes (Tutor_ID, Class_MaxCapacity, Class_CurrentCapacity, Class_Name, Class_Date, Class_Duration, Class_Status) VALUES
    (5, 2, 0, 'Math', '2022-11-21', 2, 'N'),
    (5, 4, 0, 'English', '2022-05-07', 3, 'N'),
    (6, 5, 0, 'Science', '2022-02-15', 2.5, 'N'),
    (6, 3, 0, 'History', '2022-09-30', 1.5, 'C');

INSERT INTO Enrollments (Student_ID, Class_ID) VALUES
    (1, 1),
    (2, 1),
    (1, 2),
    (2, 2),
    (1, 3),
    (2, 3),
    (3, 3),
    (4, 3),
    (1, 4),
    (2, 4),
    (3, 4);

UPDATE Classes SET Class_CurrentCapacity = (SELECT COUNT(*) FROM Enrollments WHERE Enrollments.Class_ID = Classes.Class_ID);

INSERT INTO Reviews (Student_ID, Tutor_ID, Review_String) VALUES
    (1, 5, 'Great tutor!'),
    (2, 5, 'Awesome tutor!'),
    (3, 5, 'Very helpful!'),
    (4, 5, 'Very knowledgeable!'),
    (1, 6, 'Alright tutor!'),
    (2, 6, 'Could be a better tutor!'),
    (3, 6, 'Not too helpful!'),
    (4, 6, 'Not very knowledgeable!');
