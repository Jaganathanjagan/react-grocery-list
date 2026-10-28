# 🛒 React Grocery List App

A simple and interactive Grocery List application built using **React.js**. Users can add grocery items, search the list, mark items as completed, and delete items. The application uses **JSON Server** as a mock REST API to store and manage grocery data.

## ✨ Features

- ➕ Add new grocery items
- 🔍 Search grocery items
- ✅ Mark items as completed
- 🗑️ Delete grocery items
- 🔄 Fetch data from a REST API
- 💾 Store and update items using JSON Server
- 📱 Responsive and clean user interface

## 🛠️ Technologies Used

- React.js
- JavaScript (ES6+)
- HTML5
- CSS3
- JSON Server
- Fetch API
- React Icons

## 📁 Project Structure

```text
TO DO LIST/
├── data/
│   └── db.json
├── public/
├── src/
│   ├── AddItem.jsx
│   ├── apiRequest.jsx
│   ├── App.jsx
│   ├── Content.jsx
│   ├── Footer.jsx
│   ├── Header.jsx
│   ├── ItemList.jsx
│   ├── LineItem.jsx
│   ├── SearchItem.jsx
│   ├── index.css
│   └── index.js
├── package.json
├── package-lock.json
└── README.md
```

## ⚙️ Installation and Setup

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

Replace `YOUR_GITHUB_REPOSITORY_URL` with your GitHub repository URL.

### 2. Open the project folder

```bash
cd react-grocery-list
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start JSON Server

Open a terminal and run:

```bash
npx json-server --watch data/db.json --port 3500
```

The API will be available at:

`http://localhost:3500/items`

Keep this terminal running.

### 5. Start the React application

Open a second terminal and run:

```bash
npm start
```

Open `http://localhost:3000` in your browser.

**Note:** This project uses Create React App. If you encounter an OpenSSL compatibility error with a newer Node.js version, check the project's Node.js compatibility requirements.

## 🔌 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/items` | Fetch all grocery items |
| POST | `/items` | Add a new item |
| PATCH | `/items/:id` | Update an item's status |
| DELETE | `/items/:id` | Delete a grocery item |

## 📸 Application Features

- Add items using the input field and plus button.
- Search for items using the search box.
- Check or uncheck items to track completion.
- Delete items you no longer need.

## 🎯 Learning Objectives

This project helped me practise:

- React functional components and props
- React Hooks (`useState`, `useEffect`, and `useRef`)
- Handling forms and user events
- Fetching data from a REST API
- Performing CRUD operations
- Managing API errors
- Styling a React application with CSS

## 🚀 Future Improvements

- Add categories for grocery items
- Add due dates and quantity tracking
- Improve mobile responsiveness
- Deploy the frontend and backend for online access

## 👨‍💻 Author

**Your Name**

GitHub: [Your GitHub Profile](https://github.com/YOUR-USERNAME)

---

⭐ If you find this project useful, feel free to star the repository!
