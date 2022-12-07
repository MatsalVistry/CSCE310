CREATE VIEW ExpandedReviews AS 
SELECT 
    r.Review_ID as review_id,
    r.Student_ID as student_id,
    r.Review_String as review_string,
    un2.User_ID as tutor_id,
    un.User_First_Name as student_first_name,
    un.User_Last_Name as student_last_name,
    un2.User_First_Name as tutor_first_name,
    un2.User_Last_Name as tutor_last_name,
    un2.User_Email as tutor_email
FROM 
    users as un2
LEFT JOIN 
    reviews as r
        ON r.Tutor_ID = un2.User_ID
LEFT JOIN 
    users as un 
        ON r.Student_ID = un.User_ID;