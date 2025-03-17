# AI Simple Data Management System

## Overview
A lightweight, modern web app to **manage student records** with full **CRUD functionality**.  
Features:
- Add, view, update, delete student records.
- Clean, card-based UI with modals for editing/deleting.
- Drag & drop functionality to rearrange records visually.
- Frontend built with **Flask + Bootstrap**.
- Backend API using **Flask REST** and **CSV storage**.

---

##  Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/simple-data-management.git
cd simple-data-management
```

---

### 2. Install Dependencies

```bash
pip install Flask requests
```

---

### 3. Project Structure

```
ai-simple-data-management/
├── students.csv               # CSV file storing records
├── api/                       # Backend CRUD operations
│   ├── file_operations.py
│   ├── create.py
│   ├── retrieve.py
│   ├── update.py
│   └── delete.py
├── flask_app/                 # Frontend Flask app
│   ├── app.py
│   ├── validators.py
│   ├── static/
│   │   ├── css/styles.css
│   │   └── js/
│   │       ├── script.js
│   │       └── validation.js
│   └── templates/
│       ├── base.html
│       ├── index.html
│       ├── create.html
│       └── records.html
└── server/
    └── api.py                 # Backend API routes
```

---

### 4. Running the App

**Step 1: Start Backend API**
```bash
cd ai-simple-data-management
python -m server.api
```

Backend runs on:
```
http://127.0.0.1:5000
```

---

**Step 2: Start Frontend App**
```bash
cd ../flask_app
python app.py
```

Frontend runs on:
```
http://127.0.0.1:5001
```

---

## Key Features
- **CSV-based storage, no database setup required**
- **Form validation & input length limits**
- **Modals for updating/deleting records**
- **Drag & drop reordering of student cards**
- **Separation of concerns: clean API + frontend split**
