CREATE VIEW ExpandedClasses AS 
SELECT 
    c.*,
    u2.User_First_Name,
    u2.User_Last_Name,
    u.User_ID as Student_ID
FROM 
    enrollments as e
INNER JOIN 
    users as u
        ON e.Student_ID = u.User_ID
INNER JOIN 
    classes as c
        ON e.Class_ID = c.Class_ID
INNER JOIN 
    users as u2
        ON c.Tutor_ID = u2.User_ID;