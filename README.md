# Berkeley's Dilemma

A project designed and developed by Rodrigo Lopez and David Avalos, with contributions from Erasmo Medina, focused on creating an interactive web environment with responsive design, multi-environment UI, and dynamic elements.

---

## Project Overview

**Berkeley's Dilemma** is a web application that explores interactive design elements through a multi-environment interface. The project combines various frontend and backend components to create a seamless and engaging user experience. It also integrates backend functionalities like authentication, email notifications, and environmental data visualizations.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Usage](#usage)
- [Server-Free Usage](#server-free-usage)
- [Development Diary](#development-diary)
- [Contributors](#contributors)
- [License](#license)

---

## Features

- **Responsive UI** with dynamic components
- **Multi-environment support** for enhanced user interactivity
- **Custom Carousel and Timeline** for smooth, engaging navigation
- **Sliding Bar** and other UI elements for improved navigation
- **Modular CSS** for maintainability and easy customization
- **Secure Authentication** using password hashing and validation with bcrypt
- **Email Notifications** for user engagement via Nodemailer and Google OAuth2
- **Environment Visualization Map** powered by ArcGIS API for location-based data insights

---

## Technologies

- **Frontend**: HTML, CSS, JavaScript, Bootstrap
- **Backend**: Node.js, Express, MongoDB Atlas, Mongoose
- **Emailing**: Nodemailer, Google OAuth2
- **Map API**: ArcGIS for client-side mapping and location-based data
- **Environment Variables**: Managed via `.env` file for secure credential storage
- **Version Control**: Git and GitHub

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/RLG-UP/Berkeleys-Dilemma.git

---

## Usage

1. Open `http://localhost:3000` in your browser.
2. Access different environments through the navigation, sign in with custom forms, and explore UI features.
3. Use the map interface to visualize location-based environmental data.

## Server-Free Usage
- Access to the Server-Free runtime of our application at `https://berkeleys-dilemma.onrender.com/` in your browser.

---

## Development Diary

- **Login Design & Logic**: Enhanced UI and validation for user login and password verification.
- **Email Sending Functionality**: Implemented Nodemailer and OAuth2 for automated welcome emails.
- **Password Hashing**: Integrated bcrypt for secure user password storage.
- **Environment Visualization**: Set up ArcGIS map API to dynamically display environmental information.

---

## Contributors

- Rodrigo Lopez
- David Avalos
- Erasmo Medina

---

## License

This project is licensed under the MIT License.

