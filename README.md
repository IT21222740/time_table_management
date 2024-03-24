[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/MhkFIDKy)

# University Timetable Management API

This project is aimed at providing a comprehensive API for managing university timetables. It allows administrators to schedule classes, allocate resources, manage courses, and handle user authentication.

## Getting Started

To get started with the project, follow these steps:

1. Clone the repository:

   ```bash
   git clone <repository_url>

   ```

2. Install dependencies
   npm install

3. set up environmental varable
   PORT=5000
   MONGODB_URI=<your_mongodb_uri>

### To run the prject

npm run dev

### To run unit tests

npm test

# API Endpoints

## Courses

- `GET /api/courses`: Retrieve all courses.
- `POST /api/courses`: Create a new course (admin only).
- `GET /api/courses/:id`: Retrieve a specific course.
- `PUT /api/courses/:id`: Update a course (admin only).
- `DELETE /api/courses/:id`: Delete a course (admin only).

## Users

- `POST /api/users/register`: Register a new user.
- `POST /api/users/login`: Login an existing user.
- `GET /api/users/current`: Get information about the current user.

## Faculty Courses

- `GET /api/faculty`: Retrieve courses associated with a faculty member.
- Add more endpoints as needed for faculty-specific functionality.

## Resources

- `POST /api/resources`: Create new resources (admin only).

## Class Sessions

- `POST /api/class-session`: Schedule a new class session (admin only).
- `POST /api/class-session/slot`: Book resources for a class session.
- `POST /api/class-session/check-availability`: Check availability of resources for a class session.
- `PUT /api/class-session/:id`: Update a class session (admin only).
- `GET /api/class-session/:id`: Retrieve information about a class session.
- `DELETE /api/class-session/:id`: Delete a class session (admin only).

# Project Explanation

This project serves as a backend system for managing university timetables. It provides endpoints for CRUD operations on courses, users, class sessions, and resources. Additionally, it handles user authentication to ensure secure access to the system.

# Technologies Used

- Node.js
- Express.js
- MongoDB
- JSON Web Tokens (JWT) for authentication
- Mongoose for MongoDB object modeling

