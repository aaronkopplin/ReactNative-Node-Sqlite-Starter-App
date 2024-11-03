-- Enable foreign key support
PRAGMA foreign_keys = ON;

-- Create Users table
CREATE TABLE Users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    created_at TEXT DEFAULT (datetime('now')),
    updated_at TEXT DEFAULT (datetime('now'))
);

-- Create Forms table
CREATE TABLE Forms (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    title TEXT NOT NULL,
    description TEXT,
    created_at TEXT DEFAULT (datetime('now')),
    updated_at TEXT DEFAULT (datetime('now')),
    FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE
);

-- Create Form_Fields table
CREATE TABLE Form_Fields (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    form_id INTEGER,
    field_label TEXT NOT NULL,
    field_type TEXT CHECK(field_type IN ('Text', 'Number', 'Email', 'Select', 'Checkbox', 'Radio')) NOT NULL,
    is_required BOOLEAN NOT NULL DEFAULT 0,
    options TEXT, -- Store JSON or comma-separated values for options
    created_at TEXT DEFAULT (datetime('now')),
    updated_at TEXT DEFAULT (datetime('now')),
    FOREIGN KEY (form_id) REFERENCES Forms(id) ON DELETE CASCADE
);

-- Create Responses table
CREATE TABLE Responses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    form_id INTEGER,
    user_id INTEGER,
    submitted_at TEXT DEFAULT (datetime('now')),
    FOREIGN KEY (form_id) REFERENCES Forms(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE SET NULL
);

-- Create Response_Fields table
CREATE TABLE Response_Fields (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    response_id INTEGER,
    form_field_id INTEGER,
    value TEXT,
    created_at TEXT DEFAULT (datetime('now')),
    updated_at TEXT DEFAULT (datetime('now')),
    FOREIGN KEY (response_id) REFERENCES Responses(id) ON DELETE CASCADE,
    FOREIGN KEY (form_field_id) REFERENCES Form_Fields(id) ON DELETE CASCADE
);
