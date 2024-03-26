# Hospital API

[Demo](https://hospital-api-h1h2.onrender.com): https://hospital-api-h1h2.onrender.com

## Table of Contents

- [Overview](#overview)
- [Key Features](#Key-Features)
- [Folder Structure](#folder-structure)
- [File Descriptions](#file-descriptions)
- [Setup and Installation](#setup-and-installation)
- [Security Considerations](#Security-Considerations)
- [Usage](#usage)
- [Contributing](#contributing)

## Overview

This Node.js and MongoDB application provides an API for doctors to manage COVID-19 patient data in a hospital designated for testing, quarantine, and patient well-being.

## Key Features

- User Registration: Sign up with email.
- Login and Sessions: Secure login with cookie management
- Password Management: Secure password hashing (bcrypt)
- Scalable Structure: Organized folder structure for models, controllers, routes, and services
- Well-Commented Code: Clear and concise code comments for easier understanding
- User-Specific Focus - Built with a technology stack including Node.js, Express, and MongoDB for a smooth and efficient user experience.

## Folder Structure

The project follows a structured folder organization:

- hospital-api/

  - |- config/ #Database connection configuration
  - |- features/ # Project feature directories
    - |- doctor/ # Functionality related to doctor
    - |- patient/ # Functionality related to patient
  - |- middleware/ # Middleware functions for request processing
  - |- app.js # Main entry point of the application
  - |- package.json # Project dependencies
  - |- .env.example # Provides a template for environment variables.
  - |- README.md # This file

## File Descriptions

- **config/**: Contains file to connect to the database.

  - `db.js`: Contains code to connect to mongoDB.

- **doctor/**: Contains doctor features.

- `doctor.controller.js`: Handles doctors-related logic.
- `doctor.repository.js`: Interacts with database for doctors data access operations.
- `doctor.route.js`: Defines API endpoints for managing doctors routes.
- `doctor.schema.js`: Defines the Mongoose model for doctors data.

- **patient/**: Contains patient features.

- `patient.controller.js`: Handles patients-related logic.
- `patient.repository.js`: Interacts with database for patients data access operations.
- `patient.route.js`: Defines API endpoints for managing patients routes.
- `patient.schema.js`: Defines the Mongoose model for patients data.
- `patientReports.schema.js`: Defines the Mongoose model for patients reports data.

- **middleware/**: Contains middleware functions for request processing.

  - `jwtAuth.middleware.js`: Middleware function checks if the user is authenticated.
  - `errorHandler.middleware.js`: Middleware for handling errors.
  - `invalidRoutesHandler.middleware.js`: Middleware for handling invalid routes.

- **utils/**: Utility functions for common tasks.

  - `errorHandler.js`: defines a custom error class for improved error handling.

- **.env.example/**: Provides a template for environment variables.

- **app.js**: Main entry point of the application where server setup and configuration occur.

## Setup and Installation

To run the project locally, follow these steps:

1.  Clone the repository: `git clone https://github.com/arjunsutharr/hospital-api`
2.  Install dependencies: `npm install`
3.  Configure environment variables.

    - Create a .env file in the project root directory and add the following environment variables:
      - PORT: Your server listening port
      - DATABASE_URL: Your MongoDB database URI connection string
      - JWT_SECRET: Your JWT secret
      - JWT_EXPIRE: JWT expire time in days (eg. 1d)
      - COOKIE_EXPIRES_IN: Cookie expire time in days(eg. 1)

4.  Start the server: `node app.js`
5.  Access API endpoints: Use tools like Postman to interact with the API.

## Security Considerations

- Password Hashing: The system uses bcrypt to securely store passwords in hashed form, protecting them from compromise.
- jwt: JWTs are used for authentication, ensuring only authorized doctors can access patient data.
- Cookies: Cookies are used for managing user sessions. The httpOnly flag is set to prevent client-side JavaScript access.

## Usage

1. Once the server is running, doctor can Access API endpoints, Use tools like Postman to interact with the API routes.
2. Doctor first have to register himself and login.
3. once doctor is login then doctor can register patient, create patient report, access all reports of a patient, get filtered reports of all the patients.

## Contributing

Contributions to the project are welcome! Feel free to open issues or submit pull requests to help improve the project.
I hope this README content is helpful!😊
