# 📝 To-Do List App

A dynamic task management application built with **Vanilla JavaScript**, **ES6 Modules**, and **Webpack**. This project demonstrates the separation of concerns by decoupling the application logic (Data) from the DOM manipulation (UI).

## 🚀 Features

-   **Task Management**: Create, read, update, and delete tasks.
-   **Projects**: Organize tasks into specific projects.
-   **Prioritization**: Assign priority levels (High, Medium, Low) to tasks.
-   **Smart Sorting**:
    -   **Main**: View all tasks.
    -   **Projects**: View tasks grouped by projects.
    -   **Close-in**: View tasks sorted by deadline (upcoming first).
    -   **By Priority**: View tasks sorted by importance.
-   **Data Persistence**: Uses `localStorage` so you don't lose your data on refresh.


## 🛠 Technologies Used

-   **HTML5 & CSS3**
-   **JavaScript (ES6+)**
-   **Webpack** (Module Bundler)
-   **NPM** (Package Manager)

## 📂 Project Structure

The code is organized using the **MVC (Model-View-Controller)** pattern logic:

-   `src/index.js` (Controller): The entry point. Connects the Logic and the DOM, handles event listeners.
-   `src/storage.js` (Model): Handles data logic, arrays, and `localStorage` interactions.
-   `src/dom.js` (View): Handles all DOM manipulations, rendering lists, and modal interactions.
-   `dist/`: Contains the production-ready bundled files.


*(Optional: Add a screenshot of your app here)*
## 👤 Author

**Sherikov Nafasbek**

-   GitHub: [@Sherikov](https://github.com/Sherikov)
