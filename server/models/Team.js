import mongoose from "mongoose";

// Team schema — a group of users collaborating on one or more projects.
// A team is owned by a user who has admin rights over membership.
const teamSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Team name is required"],
      trim: true,
    },
    description: {
      type: String,
      default: "",
    },
    // The user who created the team — has permission to add/remove members
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    // Array of users belonging to this team
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    // Projects this team is working on — cross-reference for dashboard views
    projects: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
      },
    ],
    // Optional emoji or short code for team avatar display
    avatar: {
      type: String,
      default: "🚀",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Team", teamSchema);
