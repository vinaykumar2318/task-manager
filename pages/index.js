import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import toast, { Toaster } from "react-hot-toast";

export default function Home() {
  const router = useRouter();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingTask, setEditingTask] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch("/api/getTask");
        const data = await res.json();
        if (data.success) {
          setTasks(data.tasks);
        } else {
          toast.error("Failed to fetch tasks");
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
        toast.error("Error fetching tasks");
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const handleDelete = async (taskId) => {
    try {
      const res = await fetch(`/api/deleteTask`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: taskId }),
      });

      const data = await res.json();
      if (data.success) {
        setTasks(tasks.filter((task) => task._id !== taskId));
        toast.success("Task deleted successfully!");
      } else {
        toast.error("Failed to delete task.");
      }
    } catch (error) {
      console.error("Error deleting task:", error);
      toast.error("An error occurred.");
    }
  };

  const handleStatusUpdate = async (taskId, isCompleted) => {
    try {
      const res = await fetch(`/api/updateStatus`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: taskId, isCompleted: !isCompleted }),
      });

      const data = await res.json();
      if (data.success) {
        setTasks(
          tasks.map((task) =>
            task._id === taskId ? { ...task, isCompleted: !isCompleted } : task
          )
        );
        toast.success("Task status updated!");
      } else {
        toast.error("Failed to update task.");
      }
    } catch (error) {
      console.error("Error updating task:", error);
      toast.error("An error occurred.");
    }
  };

  const handleUpdateTask = async () => {
    console.log(editingTask);
    try {
      const res = await fetch("/api/updateTask", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingTask),
      });

      const data = await res.json();
      if (data.success) {
        setTasks(tasks.map((task) => (task._id === editingTask._id ? editingTask : task)));
        toast.success("Task updated successfully!");
        setShowModal(false);
      } else {
        toast.error("Failed to update task.");
      }
    } catch (error) {
      console.error("Error updating task:", error);
      toast.error("An error occurred.");
    }
  };


  return (
    <div className="min-h-screen p-6 sm:p-12 bg-purple-200">
      <Toaster />
      <div className="px-24 flex justify-between items-center mb-8">
        <h1 className="text-5xl font-extrabold text-gray-800">Task Manager</h1>
        <button
          onClick={() => router.push("/addTask")}
          className="bg-purple-600 text-white text-2xl py-2 px-6 rounded-lg shadow-md hover:bg-purple-700 transition font-semibold flex items-center"
        >
          <span className="pr-2 text-3xl">+</span> Add Task
        </button>
      </div>

      {loading ? (
        <p className="text-gray-700 text-lg">Loading tasks...</p>
      ) : tasks.length === 0 ? (
        <p className="text-gray-500 text-lg">No tasks available. Add a new task to get started!</p>
      ) : (
        <section className="text-gray-600 body-font">
          <div className="container mx-auto px-24 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tasks.map((task) => (
                <div
                  key={task._id}
                  className={`p-6 rounded-xl shadow-lg bg-purple-300 border border-gray-200`}
                >
                  <div className="h-full flex flex-col justify-between">
                    <div>
                      <div className="flex flex-row justify-between">
                        <div>
                          <h2 className="tracking-widest text-xs font-medium text-indigo-500 mb-1">
                            {task.isCompleted ? "✅ Completed" : "❌ Pending"}
                          </h2>
                          <h1 className="title-font text-xl font-medium text-gray-900 mb-3">{task.title}</h1>
                        </div>
                        <button
                          onClick={() => { setEditingTask(task); setShowModal(true); }}
                          disabled={task.isCompleted}
                          className={`text-sm h-12 px-4 py-2 rounded-lg font-semibold bg-purple-600 ${task.isCompleted ? "cursor-not-allowed": ""} text-white shadow-md hover:bg-yellow-600`}
                        >
                          ✏️ Edit
                        </button>
                      </div>
                      <p className="leading-relaxed mb-3">{task.description}</p>
                      <p className="text-sm text-gray-600 mb-2">
                        📅 Due: {new Date(task.dueDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex justify-between mt-4">
                      <button
                        onClick={() => handleStatusUpdate(task._id, task.isCompleted)}
                        disabled={task.isCompleted}
                        className={`text-sm mx-2 w-1/2 px-2 py-2 rounded-lg font-semibold shadow-md ${
                          task.isCompleted
                            ? "bg-green-600 text-white hover:bg-green-700 cursor-not-allowed"
                            : "bg-purple-400 text-white hover:bg-purple-500"
                        }`}
                      >
                        {task.isCompleted ? "Completed" : "Mark as Completed"}
                      </button>
                      
                      <button
                        onClick={() => handleDelete(task._id)}
                        className={`text-sm mx-2 w-1/2 px-2 py-2 rounded-lg font-semibold bg-red-500 text-white shadow-md ${task.isCompleted ? "cursor-not-allowed": ""} hover:bg-red-600`}
                      >
                        🗑 Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-purple-300 p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Edit Task</h2>
            <input
              type="text"
              value={editingTask.title}
              onChange={(e) => setEditingTask({ ...editingTask, title: e.target.value })}
              className="w-full border p-2 rounded mb-3"
              placeholder="Task Title"
            />
            <textarea
              value={editingTask.description}
              onChange={(e) => setEditingTask({ ...editingTask, description: e.target.value })}
              className="w-full border p-2 rounded mb-3 h-24"
              placeholder="Task Description"
            />
            <input
              type="date"
              value={editingTask.dueDate}
              min={new Date().toISOString().split("T")[0]} // Prevents past dates
              onChange={(e) => {
                const selectedDate = new Date(e.target.value);
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                if (selectedDate < today) {
                  toast.error("Invalid date! Please select a future date.");
                } else {
                  setEditingTask({ ...editingTask, dueDate: e.target.value });
                }
              }}
              className="w-full border p-2 rounded mb-3"
            />
            <div className="flex justify-between">
              <button onClick={handleUpdateTask} className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">
                💾 Save
              </button>
              <button onClick={() => setShowModal(false)} className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500">
                ❌ Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
