# Todo API

A simple Todo API for managing tasks, built with Node.js, TypeScript, MongoDB, and JWT for authentication. The application is hosted on Render with MongoDB Atlas for the database.

## Technologies Used

- **Node.js** (with TypeScript)
- **Express.js**
- **MongoDB** with Mongoose
- **JWT** (JSON Web Tokens) for authentication
- **Render** for hosting
- **MongoDB Atlas** for cloud database

## Requirements

To run this project locally, you need:

- Node.js
- MongoDB (locally or on MongoDB Atlas)
- npm or yarn

1. Clone the repository:
   ```bash
   git clone https://github.com/username/todo-api.git
   cd todo-api

2. Install dependencies:
   ```bash
   npm install

3. Configure environment variables in a .env file:
   ```bash
   MONGO_URI=<Your_MongoDB_URI>
   JWT_SECRET=<Your_JWT_Secret>
   PORT=<Your_Port>

4. Start the server:
   ```bash
   npm run dev

The server will start on port 5000 or the port you define.

## API Endpoints

### Authentication

- **POST** `/api/auth/register`
  - Registers a new user.
  - **Body:**  
    ```json
    { "email": "string", "password": "string" }
    ```

- **POST** `/api/auth/login`
  - Logs in a user and returns a JWT token.
  - **Body:**  
    ```json
    { "email": "string", "password": "string" }
    ```

### Todos (Requires Authorization)
> Every request in this section requires an `Authorization: Bearer <JWT Token>` header.

- **GET** `/api/todos`
  - Retrieves the task list for the logged-in user.

- **POST** `/api/todos`
  - Creates a new task.
  - **Body:**  
    ```json
    { "title": "string" }
    ```

- **PUT** `/api/todos/`
  - Updates an existing task.
  - **Body:**  
    ```json
    { "title": "string", "completed": boolean }
    ```

- **DELETE** `/api/todos/`
  - Deletes a task with the specified ID.

### User Account Management (Requires Authorization)
> All endpoints in this section require an `Authorization: Bearer <JWT Token>` header.

- **GET** `/api/user`
  - Retrieves user information for the logged-in user.

- **PUT** `/api/user`
  - Updates user profile information.
  - **Body:**  
    ```json
    { "email": "string", "password": "string" }
    ```

- **DELETE** `/api/user`
  - Deletes the account of the logged-in user.
