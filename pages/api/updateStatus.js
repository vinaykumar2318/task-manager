import Task from "../../models/Task";
import connectDb from "../../middleware/mongoose";

const handler = async (req, res) => {
  if (req.method === "PUT") {
    try {
      const { id, isCompleted } = req.body;
      await Task.findByIdAndUpdate(id, { isCompleted });
      return res.status(200).json({ success: true });
    } catch (error) {
      return res.status(500).json({ success: false, error: "Internal Server Error" });
    }
  }
  res.status(405).json({ success: false, error: "Method Not Allowed" });
};

export default connectDb(handler);
