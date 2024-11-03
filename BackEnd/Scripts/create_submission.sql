-- Assuming the user has already been inserted and you have their user ID
-- For example, let's say the user ID of 'john_doe' is 1.

-- Insert a response for the form
INSERT INTO Responses (form_id, user_id) 
VALUES (
    (SELECT id FROM Forms WHERE title = 'Customer Feedback'), 
    1  -- Assuming user ID is 1
);

-- Insert response fields for the submitted answers
INSERT INTO Response_Fields (response_id, form_field_id, value)
VALUES 
    ((SELECT id FROM Responses WHERE form_id = (SELECT id FROM Forms WHERE title = 'Customer Feedback') AND user_id = 1), 
     (SELECT id FROM Form_Fields WHERE field_label = 'How satisfied are you with our service?'), 
     'Very Satisfied'),
     
    ((SELECT id FROM Responses WHERE form_id = (SELECT id FROM Forms WHERE title = 'Customer Feedback') AND user_id = 1), 
     (SELECT id FROM Form_Fields WHERE field_label = 'Please provide your feedback'), 
     'Great service and friendly staff!'),
     
    ((SELECT id FROM Responses WHERE form_id = (SELECT id FROM Forms WHERE title = 'Customer Feedback') AND user_id = 1), 
     (SELECT id FROM Form_Fields WHERE field_label = 'Rate our service from 1 to 5'), 
     '5'),
     
    ((SELECT id FROM Responses WHERE form_id = (SELECT id FROM Forms WHERE title = 'Customer Feedback') AND user_id = 1), 
     (SELECT id FROM Form_Fields WHERE field_label = 'Would you recommend us to a friend?'), 
     'Yes');
