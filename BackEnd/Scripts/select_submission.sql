SELECT 
    r.id AS response_id,
    f.title AS form_title,
    u.username,
    rf.value,
    ff.field_label,
    ff.field_type
FROM 
    Responses r
JOIN 
    Forms f ON r.form_id = f.id
LEFT JOIN 
    Users u ON r.user_id = u.id
JOIN 
    Response_Fields rf ON r.id = rf.response_id
JOIN 
    Form_Fields ff ON rf.form_field_id = ff.id
WHERE 
    f.title = 'Customer Feedback' 
    AND r.user_id = 1;  -- Assuming you want to filter by user ID
