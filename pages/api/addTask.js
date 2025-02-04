import Task from "../../models/Task";
import connectDb from "../../middleware/mongoose";

const handler = async (req, res) => {
    if (req.method === "POST") {
        try {
            const { title, description, dueDate } = req.body;

            if (!title || !description || !dueDate) {
                return res.status(400).json({ success: false, error: "All fields are required" });
            }

            let task = new Task({ title, description, dueDate, isCompleted: false });
            await task.save();

            if (task) {
                return res.status(201).json({ success: true, message: "Task created successfully!" });
            }
            
            return res.status(500).json({ success: false, error: "Task creation failed" });
        } catch (error) {
            console.error("Error creating task:", error);
            return res.status(500).json({ success: false, error: "Internal Server Error" });
        }
    } else {
        res.status(405).json({ success: false, error: "Method Not Allowed" });
    }
};

export default connectDb(handler);
