Perfect 👍
Here is the same README, rewritten properly in Markdown using ##, ###, bullet points, and code blocks — ready to paste directly into README.md.

⸻

📚 ACITY Digital Library System

🔎 Project Overview

The ACITY Digital Library System is a full-stack web application designed to manage a digital library for students and administrators.

The system allows:
	•	Students to browse available books, borrow and return books, and view borrowed items.
	•	Administrators to manage the library inventory through full CRUD (Create, Read, Update, Delete) operations.

Role-based access control ensures that only administrators can manage books, while students have borrowing privileges.

⸻

🌍 Deployment Links

🔹 Frontend (GitHub Pages)
	https://awuradwoa88.github.io/web_tech_project_frontend/

🔹 Backend (Render)
	https://web-tech-project-backend-lguj.onrender.com

⸻

🔐 Login Details

Use the following credentials for testing:

👨‍💼 Admin Account
	•	Email: admin@gmail.com
	•	Password: admin

👩‍🎓 Student Account
	•	Email: student@gmail.com
	•	Password: student

Admin users are redirected to the Admin Panel after login.
Students are redirected to the Book Catalog.

⸻

✅ Feature Checklist

🔹 Authentication
	•	Email and password login
	•	Role-based redirection (Admin / Student)
	•	Login session stored using localStorage

🔹 Student Features
	•	View available books
	•	Search books by title
	•	Filter books by category
	•	Borrow books
	•	Return borrowed books
	•	View borrowed books list

🔹 Admin Features
	•	View all books
	•	Add new books
	•	Edit existing books
	•	Delete books
	•	Admin-only access control

🔹 General
	•	RESTful API with Express.js
	•	PostgreSQL database integration
	•	Backend deployed on Render
	•	Frontend deployed on GitHub Pages
	•	Clean and responsive UI

⸻

🛠️ Installation Instructions (Run Locally)

🔹 Prerequisites

Ensure you have the following installed:
	•	Node.js
	•	PostgreSQL
	•	Git

⸻

🔹 Backend Setup

git clone https://github.com/awuradwoa88/web_tech_project_backend.git
cd web_tech_project_backend
npm install

Create a .env file:

DATABASE_URL=your_postgresql_connection_string
PORT=3000

Start the backend server:

node backend/server.js

Backend runs at:

http://localhost:3000


⸻

🔹 Frontend Setup

git clone https://github.com/awuradwoa88/web_tech_project_frontend.git
cd web_tech_project_frontend

Open using Live Server or any HTTP server:

http://127.0.0.1:5500/index.html



⸻

👤 Author
	•	Name: Awura Dwoa Agyare
	•	Course: Web Technologies
	•	Institution: ACITY

