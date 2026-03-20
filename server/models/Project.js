import mongoose from "mongoose";

// Project schema — represents a dev project with Kanban-style status tracking.
const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Project name is required"],
      trim: true,
    },
    description: {
      type: String,
      default: "",
    },
    // owner is a reference to the User who created it.
    // Using ref: "User" enables Mongoose's .populate() to join the data.
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    // Tracks project lifecycle state — drives UI badge color
    status: {
      type: String,
      enum: ["active", "completed", "archived", "on-hold"],
      default: "active",
    },
    // Array of strings — e.g. ["React", "Node.js", "MongoDB"]
    techStack: [
      {
        type: String,
        trim: true,
      },
    ],
    deadline: {
      type: Date,
      default: null,
    },
    // Completion percentage (0–100), updated manually or via task aggregation
    progress: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
  },
  { timestamps: true }
);

export { projectSchema };
export default mongoose.model("Project", projectSchema);
