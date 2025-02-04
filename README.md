# 📝 Task Manager (Next.js + MongoDB)

A simple **Task Manager** built with **Next.js** and **MongoDB**, allowing users to **add, edit, delete, and update tasks** with a clean UI.

## 🚀 Features
- ✅ Add new tasks with **title, description, and due date**  
- ✅ Edit existing tasks using a **modal form**  
- ✅ Mark tasks as **completed or pending**  
- ✅ Delete tasks from the list  
- ✅ Prevents **past due dates**  
- ✅ Beautiful **responsive UI with Tailwind CSS**  

---

## 📂 **Project Setup**
### 1️⃣ Clone the Repository
```sh
git clone https://github.com/yourusername/task-manager.git
cd task-manager

2️⃣ Install Dependencies
npm install

3️⃣ Create a .env.local File
Inside the project root, create a .env.local file and add your MongoDB connection string:

MONGO_URI=your_mongodb_connection_string
SECRET_KEY=your_secret_key


5️⃣ Run the Project in Development Mode
npm run dev
Now, open http://localhost:3000 in your browser. 🎉

🔧 API Endpoints
GET	/api/getTask --	Fetch all tasks
POST /api/addTask --	Add a new task
PUT	/api/updateTask --	Edit task details
PUT	/api/updateStatus --	Change task status (completed/pending)
DELETE/api/deleteTask --	Remove a task


🎨 Tech Stack
Frontend: Next.js (React) + Tailwind CSS
Backend: Node.js + Express.js
Database: MongoDB
State Management: React Hooks (useState, useEffect)
Notifications: react-hot-toast


🔧 Project Structure
📂 task-manager
│── 📂 pages
│   ├── 📜 index.js          # Main Task List Page
│   ├── 📜 addTask.js        # Add New Task Page
│── 📂 api
│   ├── 📜 getTask.js        # Fetch Tasks API
│   ├── 📜 addTask.js        # Add Task API
│   ├── 📜 updateTask.js     # Update Task API
│   ├── 📜 updateStatus.js   # Change Status API
│   ├── 📜 deleteTask.js     # Delete Task API
│── 📂 models
│   ├── 📜 Task.js           # Mongoose Task Schema
│── 📂 middleware
│   ├── 📜 mongoose.js       # MongoDB Connection
│── 📜 .env.local            # Environment Variables
│── 📜 README.md             # Project Documentation
│── 📜 package.json          # Dependencies & Scripts