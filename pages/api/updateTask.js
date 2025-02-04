import Task from "../../models/Task";
import connectDb from "../../middleware/mongoose";

const handler = async (req, res) => {
  if (req.method === "PUT") {
    try {
      const { _id, title, description, dueDate } = req.body;

      if (!_id || !title || !description || !dueDate) {
        return res.status(400).json({ success: false, error: "All fields are required." });
      }

      const updatedTask = await Task.findByIdAndUpdate(
        _id,
        { title, description, dueDate },
        { new: true, runValidators: true }
      );

      if (!updatedTask) {
        return res.status(404).json({ success: false, error: "Task not found." });
      }

      return res.status(200).json({ success: true, task: updatedTask, message: "✅ Task updated successfully!" });
    } catch (error) {
      console.error("Error updating task:", error);
      return res.status(500).json({ success: false, error: "Internal Server Error." });
    }
  } else {
    return res.status(405).json({ success: false, error: "Method Not Allowed." });
  }
};

export default connectDb(handler);
