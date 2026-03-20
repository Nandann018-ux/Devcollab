import Team from "../models/Team.js";

// POST /api/teams — Create a new team
export const createTeam = async (req, res) => {
  try {
    const { name, description, avatar } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Team name is required" });
    }

    const team = await Team.create({
      name,
      description,
      avatar: avatar || "🚀",
      owner: req.user._id,
      members: [req.user._id], // Creator is the first member
    });

    // Populate so the response has the full user object, not just an ID
    const populated = await Team.findById(team._id).populate(
      "members",
      "name avatar role"
    );

    res.status(201).json(populated);
  } catch (error) {
    console.error("Create team error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// GET /api/teams — Get all teams where the user is a member
export const getTeams = async (req, res) => {
  try {
    const teams = await Team.find({ members: req.user._id })
      .populate("owner", "name avatar role")
      .populate("members", "name avatar role")
      .sort({ updatedAt: -1 });

    res.status(200).json(teams);
  } catch (error) {
    console.error("Get teams error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// GET /api/teams/:id — Get a single team
export const getTeamById = async (req, res) => {
  try {
    const team = await Team.findById(req.params.id)
      .populate("owner", "name avatar role")
      .populate("members", "name avatar role")
      .populate("projects", "name status progress");

    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }

    // Only members can view team details
    const isMember = team.members.some((m) => m._id.equals(req.user._id));
    if (!isMember) {
      return res.status(403).json({ message: "Access denied" });
    }

    res.status(200).json(team);
  } catch (error) {
    console.error("Get team by ID error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// PUT /api/teams/:id — Update team name/description (owner only)
export const updateTeam = async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);
    if (!team) return res.status(404).json({ message: "Team not found" });

    if (!team.owner.equals(req.user._id)) {
      return res.status(403).json({ message: "Only the team owner can update it" });
    }

    const { name, description, avatar } = req.body;
    if (name) team.name = name;
    if (description !== undefined) team.description = description;
    if (avatar) team.avatar = avatar;

    const updated = await team.save();
    res.status(200).json(updated);
  } catch (error) {
    console.error("Update team error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE /api/teams/:id — Delete a team (owner only)
export const deleteTeam = async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);
    if (!team) return res.status(404).json({ message: "Team not found" });

    if (!team.owner.equals(req.user._id)) {
      return res.status(403).json({ message: "Only the team owner can delete it" });
    }

    await team.deleteOne();
    res.status(200).json({ message: "Team deleted" });
  } catch (error) {
    console.error("Delete team error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// POST /api/teams/:id/members — Add a member (owner only)
// Body: { userId }
export const addMember = async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);
    if (!team) return res.status(404).json({ message: "Team not found" });

    if (!team.owner.equals(req.user._id)) {
      return res.status(403).json({ message: "Only the team owner can add members" });
    }

    const { userId } = req.body;

    // Prevent duplicate membership using $addToSet (idempotent)
    if (!team.members.includes(userId)) {
      team.members.push(userId);
      await team.save();
    }

    const updated = await Team.findById(team._id).populate(
      "members",
      "name avatar role"
    );
    res.status(200).json(updated);
  } catch (error) {
    console.error("Add member error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE /api/teams/:id/members/:userId — Remove a member (owner only)
export const removeMember = async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);
    if (!team) return res.status(404).json({ message: "Team not found" });

    if (!team.owner.equals(req.user._id)) {
      return res.status(403).json({ message: "Only the team owner can remove members" });
    }

    // $pull removes the userId from the members array
    team.members = team.members.filter(
      (m) => !m.equals(req.params.userId)
    );
    await team.save();

    res.status(200).json({ message: "Member removed" });
  } catch (error) {
    console.error("Remove member error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};
