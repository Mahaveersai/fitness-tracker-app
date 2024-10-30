# Fitness Tracker App

A web application for users to track their fitness activities, register, and log in securely.

## Features
- User registration and login functionality
- Secure password storage using bcrypt
- MongoDB as a database for user data

## Technologies Used
- Node.js
- Express.js
- MongoDB
- Mongoose
- bcryptjs

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/Mahaveersai/fitness-tracker-app.git
Navigate into the project directory:

bash
Copy code
cd fitness-tracker-app
Install the necessary dependencies:

bash
Copy code
npm install
Set up your MongoDB connection string in the server.js file.

Start the server:

bash
Copy code
node server.js
Usage
To register a new user, send a POST request to /register with the following JSON body:

json
Copy code
{
    "name": "Your Name",
    "email": "your.email@example.com",
    "password": "yourPassword"
}
To log in, send a POST request to /login with the following JSON body:

json
Copy code
{
    "email": "your.email@example.com",
    "password": "yourPassword"
}
