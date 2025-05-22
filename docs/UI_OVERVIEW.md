# 🖼️ User Interface Overview

This document showcases key UI screens from the **EBook Management Frontend** application, built using **React**, **TypeScript**, **Vite**, **Bootstrap**, and **React Router v6**.

---

## 📑 Table of Contents

### Core Navigation & Access

- [Login Page](#login-page)
- [SignUp Page](#signup-page)
- [Admin Navbar View](#-admin-navbar-view)
- [User Navbar View](#-user-navbar-view)

### 📚 Books

- [Home Page (Book Listing)](#-home-page-book-listing)
- [User Reserving a Book](#user-reserving-a-book)
- [Book Details (User & Admin)](#book-details)
- [Add New Book](#-add-new-book)
- [Edit Book](#edit-book)

### 👤 Authors

- [Authors Table](#-authors-table)
- [Author Profile View](#-author-profile-view)
- [Books by Author](#-books-by-author)
- [Add Author Form](#-add-author-form)
- [Edit Author Form](#-edit-author-form)

### 🏢 Publishers

- [Publishers List](#publishers)
- [Publisher Profile View](#publishers-profile-view)
- [Books by Publisher](#books-by-publisher)
- [Add Publisher Form](#add-publisher-form)

### 🏷 Categories

- [Categories List](#categories)
- [Books by Category](#books-by-category)
- [Add Category Form](#add-category-form)

### 👥 Users

- [Users Management Table](#users-management-table)
- [Add User Form](#add-user-form)
- [Edit User Form](#edit-user-form)

### 🔄 Transactions

- [Borrowed Books Table](#-borrowed-books-table)
- [Reservations Table](#-reservations-table)
- [Return Book Options](#borrowed-books-return-option)
- [Fines (User & Admin View)](#fines)

### 🧰 Utilities & Features

- [Feedback Modals](#-feedback-modals)
- [Data Filters & Sorting](#-data-filter)
- [Global Search](#-global-search)

---

## Login Page

![Login Page](screenshots/login_page.png)

---

## SignUp Page

![Signup Page](screenshots/signup_page.png)

---

## 📚 Home Page (Book Listing)

![Home Page](screenshots/home_page.png)

**Features:**

- Displays list of books with book cover, title, author, language, and publisher
- Buttons for **View Details** and **Reserve**

---

## 🔐 Admin Navbar View

![Admin Navbar](screenshots/admin_navbar.png)

**Features:**

- Dropdowns for all entities (Books, Authors, Users, etc.)
- Search input and Logout button
- Conditionally visible links based on role: `ROLE_ADMIN`

---

## 🧑‍🎓 User Navbar View

![User Navbar](screenshots/user_navbar1.png)

**Features:**

- No access to "Add" or "Edit" entity pages
- Can only see lists and personal pages (borrowed books, fines, etc.)

---

## User Reserving a Book

![Reserving Book](screenshots/reserving_book.png)

![Reserving Book](screenshots/reserving_book_date_selection.png)

---

## Book Details

### User View

![Book Details](screenshots/book_details.png)

### Admin View

![Book Details](screenshots/book_details_admin_view.png)

---

## 📜 Authors Table

![Authors Table](screenshots/authors.png)

**Features:**

- Shows name, nationality, birth date
- Sortable and filterable columns
- Links to Books and Details

---

## 👤 Author Profile View

### User View

![Author Profile](screenshots/author_details_user_view.png)

### Admin View

![Author Profile](screenshots/author_details.png)

**Features:**

- Author bio, birth date, nationality
- Cover image and quick links to edit or view books

---

## 📕 Books by Author

![Books by Author](screenshots/author_books.png)

**Features:**

- Dynamic listing of books written by selected author
- Cards styled with details and call-to-actions

---

## 📖 Borrowed Books Table

### User View

![Borrowed Books](screenshots/borrowed_books_user_view.png)

### Admin View

![Borrowed Books](screenshots/borrowed_books.png)

**Features:**

- Displays borrow date, return status, fines
- Role-based actions (e.g., Return)

---

### Borrowed Books Return Option

#### With Fine

![Return With Fine](screenshots/user_return_books.png)

#### Without Fine

![Return Without Fine](screenshots/user_return_books_nofine.png)

---

## 🔢 Reservations Table

### User View

![Reservations](screenshots/reservations_user_view.png)

### Admin View

![Reservations](screenshots/reservations.png)

**Features:**

- Status filters
- Book title, reservation date, and duration
- Admins can approve/reject

---

## 📄 Users Management Table

#### Admin Only

![Users](screenshots/users.png)

**Features:**

- Admin-only
- Lists all users with roles, emails, and actions to edit or view borrowed books

---

## 🏢 Publishers

![Publishers](screenshots/publishers.png)

---

## Publishers Profile View

### User View

![Publishers Details](screenshots/publisher_details_user_view.png)

### Admin View

![Publishers Details](screenshots/publisher_details.png)

---

## Books by Publisher

![Books by Publisher](screenshots/books_by_publisher.png)

---

## 🏷 Categories

![Categories](screenshots/categories.png)

---

## Books by Category

![Books by Category](screenshots/books_by_category.png)

---

## 💸 Fines

### User View

![Fines](screenshots/fines_user_view.png)

### Admin View

![Fines](screenshots/fines.png)

---

## 📝 Forms (Admin Only)

### ➕ Add New Book

![Add Book Form](screenshots/boook_form.png)

### Edit Book

![Edit Book Form](screenshots/book_edit_form.png)

#### Form Selections

![Book Form Selections](screenshots/book_form_selections.png)

**Features:**

- Form with fields: Title, Author (dropdown), ISBN, Language, etc.
- Includes image upload
- Light-themed UI for clarity

---

### 📝 Add Author Form

![Add Author](screenshots/author_form.png)

### 📝 Edit Author Form

![Edit Author](screenshots/author_edit_form.png)

---

### ➕ Add User Form

![User Form](screenshots/user_form.png)

### ✏️ Edit User Form

![Edit User Form](screenshots/user_edit_form.png)

### ➕ Add Publisher Form

![Publisher Form](screenshots/publisher_form.png)

### ➕ Add Category Form

![Category Form](screenshots/category_form.png)

---

## 🌟 Features

### ✅ Feedback Modals

![Category added feedback](screenshots/feedback_modal_category_added.png)

![Author updated feedback](screenshots/feedback_modal_author_update.png)

![Book update error feedback](screenshots/feedback_modal_error_updating_book.png)

---

### 🔍 Data Filter

#### By Status

![Filter by Status](screenshots/filter_data_by_status.png)

#### By Field Name

![Search by Field](screenshots/filter_search_by_user_name.png)

#### Sort by Name

![Sort by Name](screenshots/filter_sortby_name.png)

#### Sort by Status

![Sort Status](screenshots/sort_data__resaervationstatus.png)

![Sorted Status](screenshots/sort_data_reservation_status_sorted.png)

---

### 🌐 Global Search

#### Search Books

![Search Books](screenshots/global_search_books.png)

#### Search Users

![Search Users](screenshots/global_search_users.png)
