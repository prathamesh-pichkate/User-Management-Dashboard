# User-Management-Dashboard

## 📌 Objective

The goal of this project is to develop a simple web application where users can **view, add, edit, and delete user details**, interacting with a mock backend API. This application simulates CRUD operations on user data using the **JSONPlaceholder API**.

## 🚀 Technologies Used

- **React 19** – For building the user interface and managing state.
- **React Redux** – For state management and handling user data.
- **Tailwind CSS v4** – For styling and responsiveness.
- **Flowbite** – A Tailwind-based component library for UI enhancements.
- **Axios** – For making HTTP requests to the backend API.
- **React Router DOM** – For handling navigation within the app.

---

## ✨ Features

### 🔹 View Users
- Displays a list of users fetched from the **JSONPlaceholder API** (`/users` endpoint).

### 🔹 Add User
- A form to add a new user.
- Sends a **POST** request to `/users` (simulated, does not persist).

### 🔹 Edit User
- Allows users to edit existing user details.
- Updates data via a **PUT** request.

### 🔹 Delete User
- Deletes a user via a **DELETE** request to `/users/:id`.

### 🔹 Responsive Design
- Fully responsive using **Tailwind CSS**, optimized for mobile & desktop.

### 🔹 Error Handling
- Displays error messages if API requests fail.

### 🔹 Show More Users
- Initially loads 10 users, with a **Show More** button to fetch additional users.

---

## 🛠️ Getting Started

### ✅ Prerequisites

Ensure you have the following installed:

- **Node.js** (>= 16.x)
- **npm** or **yarn**

### 📥 Installation

Clone the repository:

```sh
git clone https://github.com/your-username/user-management-dashboard.git
cd user-management-dashboard
