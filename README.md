# Course Peer Review Form
This is an application that gives students and instructors the ability to review and make comments about the class, classmates,
and/or their instructor anonymously.  
This platform facilitates seamless interaction between instructors and students, offering robust review, team, and reporting features while prioritizing security, accessibility, and modern development practices.

---
## Names:
- Connor Smith
- Damian Owen
- Elijah Beatty
- Liam Rivers
## Class: 
CSC 3410 Web Design 
## Teacher:  
Ben Burchfield 

---
## Features:  

### Sitewide:  
- Static, informative landing page about the platform
- Mobile-first, responsive design
- Add-to-Home Screen capability (PWA manifest)

### Instructor Experience:
- Register & Login (email with `.edu` validation and MFA support)
- Password reset and secure logout
- Course management:
  - Create and manage courses
  - Add students via upload or invite codes
- Team and Review management:
  - Create teams
  - Create, read, update, delete (CRUD) review questions
  - Support for Likert, multiple choice, and short answer formats
  - Schedule reviews and view results (public/private)
- Reporting tools:
  - Student averages (100pt scale)
  - Class metrics (sortable)

### Student Experience: 
- Register & Login with contact info (mobile, Discord, Teams)
- Secure login with MFA and password recovery
- Participate in assigned reviews
- Submit public and private feedback
- View personal reports:
  - Combined feedback from peers
  - Overall performance scores

---

## Constraints & Compliance:
- Emails must be valid
- Passwords must comply with NIST standards and never stored as plain text
- Secure backend routes and authentication using Passport.js
- Backend: Node.js with Express
- Frontend: HTML, CSS (Bootstrap), JavaScript (frameworks allowed if covered in class)
- Organized codebase modeled after "charts" example
- All data persisted in a relational DB
- Must meet accessibility standards

## Tech Stack:
| Layer        | Tech                          |
|--------------|-------------------------------|
| Frontend     | HTML, CSS (Bootstrap), JS     |
| Backend      | Node.js, Express              |
| Database     | MariaDB or PostgreSQL         |
| Authentication | Passport.js + MFA (Email/SMS) |

---