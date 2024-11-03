SELECT 
    ff.id AS field_id,
    ff.field_label,
    ff.field_type,
    ff.is_required,
    ff.options
FROM 
    Form_Fields ff
JOIN 
    Forms f ON ff.form_id = f.id
WHERE 
    f.title = 'Customer Feedback';
