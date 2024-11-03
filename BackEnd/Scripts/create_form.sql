-- Insert a user (assuming a user exists; you can also insert a user first)
INSERT INTO Users (username, email, password_hash) 
VALUES ('john_doe', 'john@example.com', 'hashed_password');

-- Insert a form associated with the user
INSERT INTO Forms (user_id, title, description) 
VALUES ((SELECT id FROM Users WHERE username = 'john_doe'), 'Customer Feedback', 'A form to collect customer feedback about our services.');

-- Insert fields for the form
INSERT INTO Form_Fields (form_id, field_label, field_type, is_required, options)
VALUES 
    ((SELECT id FROM Forms WHERE title = 'Customer Feedback'), 'How satisfied are you with our service?', 'Select', 1, '{"options":["Very Satisfied", "Satisfied", "Neutral", "Dissatisfied", "Very Dissatisfied"]}'),
    ((SELECT id FROM Forms WHERE title = 'Customer Feedback'), 'Please provide your feedback', 'Text', 0, NULL),
    ((SELECT id FROM Forms WHERE title = 'Customer Feedback'), 'Rate our service from 1 to 5', 'Number', 1, NULL),
    ((SELECT id FROM Forms WHERE title = 'Customer Feedback'), 'Would you recommend us to a friend?', 'Checkbox', 1, '{"options":["Yes", "No"]}');
