CREATE VIEW ExpandedReviews AS
SELECT 
    r.Review_ID as review_id,
    r.Student_ID as student_id,
    r.Review_String as review_string,
    r.tutor_ID as tid,
    un.User_First_Name as student_first_name,
    un.User_Last_Name as student_last_name,
    un2.User_First_Name as tutor_first_name,
    un2.User_Last_Name as tutor_last_name,
    un2.User_Email as tutor_email
FROM 
    reviews as r 
INNER JOIN 
    users as un 
        ON r.Student_ID = un.User_ID
INNER JOIN 
    users as un2
        ON r.Tutor_ID = un2.User_ID;