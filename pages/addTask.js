import { useRouter } from "next/router";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function AddTask() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { title, description, dueDate };

    let res = await fetch(`/api/addTask`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    let response = await res.json();
    if (response.success) {
      toast.success("Task Added Successfully!", {
        duration: 1500,
        position: "top-center",
      });

      setTitle("");
      setDescription("");
      setDueDate("");

      setTimeout(() => {
        router.push("/");
      }, 1500);
    } else {
      toast.error("Failed to Add Task! Please try again.", {
        duration: 2000,
        position: "top-center",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-purple-200 px-6">
      <Toaster />
      <div className="w-full max-w-md bg-purple-300 p-8 rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">📝 Add New Task</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="title"
            placeholder="Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:outline-none"
          />

          <textarea
            name="description"
            placeholder="Task Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border border-gray-300 rounded-lg p-3 h-24 focus:ring-2 focus:ring-purple-500 focus:outline-none"
          />

          <input
            type="date"
            name="dueDate"
            value={dueDate}
            onChange={(e) => {
              const selectedDate = new Date(e.target.value);
              const today = new Date();
              today.setHours(0, 0, 0, 0);
              if (selectedDate < today) {
                toast.error("Invalid date! Please select a future date.");
              } else {
                setDueDate(e.target.value);
              }
            }}
            required
            className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:outline-none"
          />

          <button
            type="submit"
            className="bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition shadow-md"
          >
            ➕ Add Task
          </button>

          <button
            type="button"
            onClick={() => router.push("/")}
            className="text-gray-600 hover:underline text-center"
          >
            ← Back to Home
          </button>
        </form>
      </div>
    </div>
  );
}
