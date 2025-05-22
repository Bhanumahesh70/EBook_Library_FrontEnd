# 📚 Ebook Management Frontend (React + TypeScript + Vite)

This is the frontend of an **Ebook Management System**, developed using **React**, **TypeScript**, and **Vite**. It connects with a Spring Boot backend and supports authentication, book browsing, reservations, fines, and role-based access.

---

## 📑 Table of Contents

- [Features](#features)
- [Detailed Code Overview](#-detailed-code-overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)

---

## 📖 Detailed Code Overview

For a comprehensive breakdown of the frontend architecture and implementation details, refer to the following document in the [`docs/`](docs) folder:

- [`CODE_OVERVIEW.md`](docs/CODE_OVERVIEW.md)

---

## ✨ Features

- 📚 View and manage books, authors, categories, publishers, and book reservations
- 👤 User Authentication Sign In
- 🔐 Role-based access control using protected routes (Admin/User)
- 💳 Borrow and return books with automated fine calculations
- 📅 User-specific dashboards for reservations and borrowing
- 🔍 Global search and filtering
- 🧾 Fine tracking with dynamic status and cost
- 🎨 Responsive and clean UI design with custom form components

> ⚠️ **Note:** The above features include both admin and user functionalities. Admins can manage all entities, while regular users only see and interact with their own data (e.g., borrowed books, reservations, fines).

---

## 🛠️ Tech Stack

- React 18 + TypeScript
- Vite
- React Router v6
- Axios
- Context API
- CSS Modules or custom styles
- VS Code + ESLint + Prettier

---

## 🗂️ Project Structure

```
src
├── assets/                    # Static assets (images, icons, etc.)
├── components/
│   ├── Authentication         # Login, context, and route guards
│   ├── EntityComponents/      # Domain-specific entities
│   │   ├── Books/, Authors/,
│   │       Categories/, Users/, Fines/, etc.
│   ├── Form                   # Reusable form elements
│   ├── Layout                 # Header, Navbar
│   ├── Modals/                # Feedback and status modals
│   └── Utilities/             # Filter, global search context
├── services                   # API interaction logic
├── App.tsx                    # App entry point with route definitions
├── main.tsx                   # Main bootstrap
└── index.css                  # Global styles
```

---

## 🚀 Setup Instructions

### Prerequisites

- Node.js 18+
- npm or yarn

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/Bhanumahesh70/EBook_Library_FrontEnd.git
   cd EbookWebsite_FrontendReact
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Run the app:

   ```bash
   npm run dev
   ```

---
