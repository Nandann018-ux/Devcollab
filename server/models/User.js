import mongoose from "mongoose";

// User schema — keeps fields minimal and interview-explainable.
// avatar uses DiceBear seeded by the user's name for consistent visuals.
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true, // Normalize before storage so "USER@test.com" === "user@test.com"
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
    },
    // Role lets us filter teammates by specialty in the Teams view
    role: {
      type: String,
      enum: ["developer", "designer", "pm", "devops"],
      default: "developer",
    },
    bio: {
      type: String,
      default: "",
      maxlength: 280,
    },
    // Stores a DiceBear seed string so every profile has a consistent avatar
    avatar: {
      type: String,
      default: function () {
        return this.name; // Seed defaults to the user's own name
      },
    },
  },
  { timestamps: true } // Adds createdAt and updatedAt automatically
);

export default mongoose.model("User", userSchema);
