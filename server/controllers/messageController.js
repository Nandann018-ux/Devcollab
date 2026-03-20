import Message from "../models/Message.js";

// POST /api/messages — Send a message to another user
export const sendMessage = async (req, res) => {
  try {
    const { receiverId, content } = req.body;

    if (!receiverId || !content) {
      return res
        .status(400)
        .json({ message: "Receiver ID and content are required" });
    }

    // Prevent sending messages to yourself
    if (receiverId === req.user._id.toString()) {
      return res
        .status(400)
        .json({ message: "Cannot send a message to yourself" });
    }

    const message = await Message.create({
      sender: req.user._id,
      receiver: receiverId,
      content,
    });

    // Populate sender info so the client can display name + avatar immediately
    const populated = await Message.findById(message._id)
      .populate("sender", "name avatar")
      .populate("receiver", "name avatar");

    res.status(201).json(populated);
  } catch (error) {
    console.error("Send message error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// GET /api/messages/inbox — Get all messages received by the current user
export const getInbox = async (req, res) => {
  try {
    const messages = await Message.find({ receiver: req.user._id })
      .populate("sender", "name avatar role")
      .sort({ createdAt: -1 }); // Newest first

    res.status(200).json(messages);
  } catch (error) {
    console.error("Get inbox error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// GET /api/messages/conversation/:userId
// Get the full conversation thread between the current user and another user
export const getConversation = async (req, res) => {
  try {
    const { userId } = req.params;

    // We query both directions (sent + received) to build the full thread
    const messages = await Message.find({
      $or: [
        { sender: req.user._id, receiver: userId },
        { sender: userId, receiver: req.user._id },
      ],
    })
      .populate("sender", "name avatar")
      .populate("receiver", "name avatar")
      .sort({ createdAt: 1 }); // Oldest first for chronological display

    res.status(200).json(messages);
  } catch (error) {
    console.error("Get conversation error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// PUT /api/messages/:id/read — Mark a message as read
export const markAsRead = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);

    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }

    // Only the receiver can mark a message as read
    if (!message.receiver.equals(req.user._id)) {
      return res
        .status(403)
        .json({ message: "Not authorized to mark this message as read" });
    }

    message.read = true;
    await message.save();

    res.status(200).json({ message: "Marked as read", _id: message._id });
  } catch (error) {
    console.error("Mark as read error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};
