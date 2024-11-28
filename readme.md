# Role-Based Access Control (RBAC) Project

This project demonstrates a **Role-Based Access Control (RBAC)** system with four roles:

1. **Owner**  
2. **Admin**  
3. **User**  
4. **Guest**

The access hierarchy is as follows:  
**Owner > Admin > User > Guest**

---

## Features

- **User Management**: Roles are dynamically assigned, and permissions are enforced based on the user's role.
- **Post Management**:
  - Owners and Admins can manage posts (approve/unapprove, delete).
  - Guests have restricted access to content.
- **Secure File Uploads**: Integrated with Cloudinary for image and media storage.
- **Authentication**: JSON Web Tokens (JWT) for secure user authentication.
- **Frontend and Backend**: Full-stack application with a separate `client` for the frontend and `api` for the backend.

---

## File Structure

```
├── api                # Backend folder
│   ├── config         # Configuration files
│   ├── controllers    # Business logic for routes
│   ├── middlewares    # Middleware for authentication and role validation
│   ├── models         # Database models
│   ├── routes         # API routes
│   ├── utils          # Utility functions
│   ├── .env           # Environment variables (not included in the repo)
│   ├── package.json   # Project metadata and dependencies (for backend)
│   ├── app.js         # Main Express app
│   └── server.js      # Entry point for the backend
│
├── client             # Frontend folder
│   └── (React app with components, pages, and assets)
│
├── .gitignore         # Ignored files and folders
└── readme.md          # Project documentation
```

---

## Environment Variables Setup

Create a `.env` file in the `api` folder and add the following keys:

```env
MONGO_URI=""
JWT_SECRET=""
PORT="6969"
CLOUDINARY_CLOUD_NAME=""
CLOUDINARY_API_KEY=""
CLOUDINARY_API_SECRET=""
```

---

## Project Setup

### Backend (API)

1. Navigate to the `api` folder:
   ```bash
   cd api
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the backend server:
   ```bash
   npm run dev
   ```

### Frontend (Client)

1. Navigate to the `client` folder:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

---

## Role-Based Access Overview

| Role   | Permissions                                                                                     |
|--------|-------------------------------------------------------------------------------------------------|
| Owner  | Full control over posts, users, and application settings.                                       |
| Admin  | Manage posts (approve/unapprove, delete) and moderate users but cannot override Owner actions. |
| User   | Create posts, edit their own posts, and view unapproved content.                                 |
| Guest  | View public content only.                                                                      |

---

## Video Demo

[![Video Demo](https://via.placeholder.com/800x400.png?text=Video+Demo+Placeholder)](https://your-video-link.com)  
*Click the image above to view the project demo.*

---
