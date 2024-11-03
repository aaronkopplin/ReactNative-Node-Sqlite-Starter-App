const express = require("express");
const sqlite3 = require("sqlite3").verbose();

const app = express();
const port = 3000;

// Connect to the SQLite database
const db = new sqlite3.Database("../Database/forms_database.db", (err) => {
  if (err) {
    console.error("Error connecting to database:", err.message);
  } else {
    console.log("Connected to the SQLite database.");
  }
});

// Middleware to parse JSON requests
app.use(express.json());

// Route to get all forms
app.get("/forms", (req, res) => {
  const sql = `SELECT * FROM Forms`;
  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ forms: rows });
  });
});

// Route to get questions for a specific form
app.get("/forms/:formId/questions", (req, res) => {
  const { formId } = req.params;
  const sql = `
        SELECT id, field_label, field_type, is_required, options
        FROM Form_Fields
        WHERE form_id = ?`;
  db.all(sql, [formId], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ questions: rows });
  });
});

// Route to get a specific submission for a form
app.get("/forms/:formId/responses/:responseId", (req, res) => {
  const { formId, responseId } = req.params;
  const sql = `
        SELECT 
            rf.value,
            ff.field_label,
            ff.field_type
        FROM 
            Response_Fields rf
        JOIN 
            Form_Fields ff ON rf.form_field_id = ff.id
        WHERE 
            rf.response_id = ?
            AND ff.form_id = ?`;
  db.all(sql, [responseId, formId], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ submission: rows });
  });
});

// Route to get all responses for a specific form
app.get("/forms/:formId/responses", (req, res) => {
  const { formId } = req.params;
  const sql = `
        SELECT 
            r.id AS response_id,
            rf.value,
            ff.field_label,
            ff.field_type
        FROM 
            Responses r
        JOIN 
            Response_Fields rf ON r.id = rf.response_id
        JOIN 
            Form_Fields ff ON rf.form_field_id = ff.id
        WHERE 
            r.form_id = ?`;
  db.all(sql, [formId], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ responses: rows });
  });
});

// Close the database connection when the server stops
process.on("SIGINT", () => {
  db.close((err) => {
    if (err) {
      console.error("Error closing the database:", err.message);
    } else {
      console.log("Database connection closed.");
    }
    process.exit();
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
