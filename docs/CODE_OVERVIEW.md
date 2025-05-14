# 📘 Code Overview

## 📑 Table of Contents

1. [Authentication & Contexts](#-authentication--contexts)
2. [Routing Overview](#-routing-overview)
3. [Component Overview](#-component-overview)
4. [Abstract Entity Components](#-abstract-entity-components)
5. [Forms](#-forms)
6. [Tables](#-tables)
7. [Entity Books Display](#-entity-books-display)
8. [Services](#-services)
9. [Utilities & Infrastructure](#-utilities--infrastructure)

---

## 🔐 Authentication & Contexts

### Authentication

- `LoginPage.tsx` – Handles Firebase login
- `AuthenticationContext.tsx` – Provides authentication state
- `ProtectedRoute.tsx` – Guards private routes for authorized access

### Contexts Used

- `AuthenticationContext`: Tracks user authentication status.
- `LoginUserContext`: Stores logged-in user's ID and role.
- `BooksIdsContext`: Holds currently selected books.
- `GlobalSearchContext`: Enables universal search across table views.

These are wrapped around the root routing structure to ensure context access throughout the component tree.

### Navbar Context Usage

- `useAuthentication()` – Controls logout and login status
- `useLoginUser()` – Reads role (`ROLE_ADMIN` or `ROLE_USER`) and ID for dynamic URL construction
- `useGlobalSearch()` – Binds global search input to filter across components

### Role-Based Routing

The application enforces **role-based access** by conditionally rendering routes and navigation options:

- **Admins** can manage users, books, authors, categories, publishers, reservations, fines (with add/edit forms).
- **Users** can view and interact with their own borrowed books, reservations, and fines. Can view all book listings and author/category/publisher details.

---

## 🔄 Routing Overview

The application uses **React Router v6** with route protection via `<ProtectedRoute />`. Global providers wrap the routing structure:

```tsx
<AuthenticationProvider>
  <LoginUserProvider>
    <BooksIdsProvider>
      <GlobalSearchProvider>
        <Router>
          <Layout>
            <Routes>...</Routes>
          </Layout>
        </Router>
      </GlobalSearchProvider>
    </BooksIdsProvider>
  </LoginUserProvider>
</AuthenticationProvider>
```

These manage:

- 🔐 Authentication state
- 👤 Logged-in user details
- 📚 Book-User mappings
- 🔍 Global search across tables

### 🛡 Public Routes

| Route     | Description     |
| --------- | --------------- |
| `/login`  | Login page      |
| `/signup` | New user signup |

### 🔐 Protected Routes

| Route                           | Description                    | Role      |
| ------------------------------- | ------------------------------ | --------- |
| `/ebook`                        | Main book listing page         | All users |
| `/ebook/books`                  | Add a new book                 | Admin     |
| `/ebook/books/:id`              | View book details              | All users |
| `/ebook/books/:id/edit`         | Edit book details              | Admin     |
| `/ebook/categories`             | View categories                | All users |
| `/ebook/categories/form`        | Add new category               | Admin     |
| `/ebook/categories/:id/edit`    | Edit category                  | Admin     |
| `/ebook/categories/:id/books`   | Books under a category         | All users |
| `/ebook/users`                  | User management dashboard      | Admin     |
| `/ebook/users/form`             | Add new user                   | Admin     |
| `/ebook/users/:id`              | Edit user profile              | Admin     |
| `/ebook/users/:id/books`        | Borrowed books of a user       | Admin     |
| `/ebook/users/:id/reservations` | Reservations made by a user    | Admin     |
| `/ebook/users/:id/fines`        | Fines incurred by a user       | Admin     |
| `/ebook/authors`                | List of authors                | All users |
| `/ebook/authors/form`           | Add a new author               | Admin     |
| `/ebook/authors/:id`            | Edit an author                 | Admin     |
| `/ebook/authors/:id/details`    | View author details            | All users |
| `/ebook/authors/:id/books`      | Books written by the author    | All users |
| `/ebook/publishers`             | List of publishers             | All users |
| `/ebook/publishers/form`        | Add a publisher                | Admin     |
| `/ebook/publishers/:id/form`    | Edit a publisher               | Admin     |
| `/ebook/publishers/:id`         | View publisher details         | All users |
| `/ebook/publishers/:id/books`   | Books published by a publisher | All users |
| `/ebook/reservations`           | Reservation management         | All users |
| `/ebook/borrowedBooks`          | Borrowed books listing         | All users |
| `/ebook/fines`                  | Fine summary                   | All users |

---

## 🧩 Component Overview

### 📦 Entity Components

- `Books/`, `Authors/`, `Users/`, `Categories/`, `Fines/`, etc.

### 🧾 Forms

- `TextInputField`, `TextAreaField`, `DropDownList`, `EntityForm`
- Dynamically generate forms based on entity schema

### 🖼 Layout

- `Navbar.tsx` with dropdowns and search
- `Header.tsx` for consistent page headers

---

## 🧱 Abstract Entity Components

The system utilizes powerful, reusable **abstract components** to reduce duplication and enforce consistency across forms, tables, and entity displays:

| Component         | Description                                                     | Used By                                      |
| ----------------- | --------------------------------------------------------------- | -------------------------------------------- |
| `EntityForm.tsx`  | Dynamic form with image upload, modals, navigation              | `BookForm`, `UserForm`, `AuthorForm`, etc.   |
| `EntityTable.tsx` | Generic searchable, filterable, sortable table                  | `AuthorsList`, `UsersList`, `FineList`, etc. |
| `EntityBooks.tsx` | Renders books for an entity (author, user, category, publisher) | `AuthorBooks`, `UserBorrowedBooks`, etc.     |

These components accept props such as entity-specific fetch, update, and render logic—allowing maximum flexibility with minimal repetition.

---

## 🧾 Forms

All entity forms are generated through the abstract `EntityForm.tsx`, which handles:

- 🧩 Custom field rendering
- 🖼 Optional image upload preview (e.g., book cover)
- 🔁 Dynamic useEffect and navigation hooks
- ✅ Feedback modal post-submission
- 📤 Post-submit logic for uploading images after entity persistence

---

## 🖼 Tables

`EntityTable.tsx` provides:

- 🔍 Global search via `GlobalSearchContext`
- 🔁 Toggleable filters per column
- ↕️ Sorting with ascending/descending logic
- 📑 Render and filter customization
- 📌 Column types: `text`, `date`, `select`, etc.

---

## 📘 Entity Books Display

- `EntityBooks.tsx` is reused by components that show books for a particular entity.
- Props like `fetchBooks`, `entityType`, and `keyName` drive reusability.
- Reused by `AuthorBooks`, `CategoryBooks`, `UserBorrowedBooks`, and `PublisherBooks`

---

## ⚙️ Services

The `EntityService<T>` class is a generic API handler that supports all CRUD operations, file uploads, and custom endpoint invocations.

### API Methods

| Method                                       | Description                                         |
| -------------------------------------------- | --------------------------------------------------- |
| `getAllItems()`                              | Fetch all records of entity `T`                     |
| `getItemById(id)`                            | Fetch one record by ID                              |
| `addItem(entity)`                            | Add a new record                                    |
| `updateItem(id, entity)`                     | Update an existing record                           |
| `deleteItemById(id)`                         | Delete entity by ID                                 |
| `getRelatedEntityItemsForThisEntityWithId()` | Fetch related entities (e.g., books of a publisher) |
| `addRelatedEntityItemForThisEntityWithId()`  | Add a related record                                |
| `uploadImage(formData, id, path)`            | Upload image to custom endpoint                     |
| `actionMethod(entity, path)`                 | Custom non-CRUD POST actions                        |
| `actionMethodByid(id, path)`                 | Custom POST actions with ID payload                 |

### Example

```ts
const entityService = new EntityService<Book>('/ebook/books');
export const getBooks = entityService.getAllItems;
```

### Benefits

- ✅ Consistent
- ✅ Testable
- ✅ DRY
- ✅ Centralized error logging

---

## 🧰 Utilities & Infrastructure

### 🔗 `apiClient.ts`

Handles JWT token injection via axios interceptors.

### 📝 `formUtilities.ts`

- `handleFormSubmit<T>()`: Unified form submit logic with success/failure modal
- `handleInputOnChange<T>()`: Handles controlled input changes dynamically by key

### 💬 `modalUtilities.ts`

- `textInModal()` – Displays form success or error messages dynamically.
- `handleModalClosing()` – Resets or navigates on modal close

### 🔐 `loginService.ts`

- `authenticateUser()` – Authenticates against backend using credentials.
- `ValidateUser()` – JWT session validation

### 🧠 `useFilterSort.ts`

Custom hook to handle:

- Filter toggles per column
- Sorting by ascending/descending logic
- Integration with `GlobalSearchContext`

### 🧾 `types.ts`

- Declares shared interfaces (`Book`, `User`, etc.)
- Used throughout UI and service layers

---
