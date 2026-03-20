import mongoose from "mongoose";

// Message schema — simple direct messaging between two users.
// For a group chat, you would extend this with a "channel" or "room" field,
// but keeping it to sender/receiver is clean and interview-friendly.
const messageSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
      required: [true, "Message content cannot be empty"],
      trim: true,
      maxlength: 2000,
    },
    // read flag lets us show unread badge counts in the UI
    read: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true } // createdAt is used as the message "sent at" timestamp
);

export default mongoose.model("Message", messageSchema);
