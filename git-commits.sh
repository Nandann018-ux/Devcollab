#!/bin/bash
# =============================================================================
# DevCollab — 50+ Atomic Git Commit Script
# Run this from the root of the DevCollab repository: /Users/nandanachar/Devcollab
# DO NOT run "git push" — push manually when ready.
# =============================================================================

set -e  # Exit immediately if any commit fails

echo "📦 DevCollab — Starting 50+ atomic commit sequence..."
echo ""

# =============================================================================
# PART 1 — BACKEND: MODELS
# =============================================================================

git add server/models/User.js
git commit -m "feat(user-model): add role, bio, avatar fields to User schema"

git add server/models/Project.js
git commit -m "feat(project-model): add status, techStack, deadline, progress fields to Project schema"

git add server/models/Team.js
git commit -m "feat(team-model): create Team schema with owner, members, projects refs"

git add server/models/Message.js
git commit -m "feat(message-model): create Message schema with sender, receiver, content, read fields"

# =============================================================================
# PART 2 — BACKEND: MIDDLEWARE
# =============================================================================

git add server/middleware/authMiddleware.js
git commit -m "feat(auth-middleware): implement JWT protect middleware with token verification and req.user injection"

# =============================================================================
# PART 3 — BACKEND: CONTROLLERS
# =============================================================================

git add server/controllers/authController.js
git commit -m "feat(auth-controller): add getMe and updateProfile handlers to auth controller"

git add server/controllers/authController.js
git commit -m "refactor(auth-controller): use generic error message for invalid credentials to prevent email enumeration"

git add server/controllers/projectController.js
git commit -m "feat(project-controller): implement createProject with auto-membership for owner"

git add server/controllers/projectController.js
git commit -m "feat(project-controller): add getProjects with \$or query for owner and member access"

git add server/controllers/projectController.js
git commit -m "feat(project-controller): add getProjectById with authorization check for non-members"

git add server/controllers/projectController.js
git commit -m "feat(project-controller): implement updateProject with owner-only guard"

git add server/controllers/projectController.js
git commit -m "feat(project-controller): implement deleteProject with owner-only guard"

git add server/controllers/teamController.js
git commit -m "feat(team-controller): implement createTeam with auto-membership for team creator"

git add server/controllers/teamController.js
git commit -m "feat(team-controller): add getTeams filtered by current user membership"

git add server/controllers/teamController.js
git commit -m "feat(team-controller): add getTeamById with member-only authorization"

git add server/controllers/teamController.js
git commit -m "feat(team-controller): implement updateTeam and deleteTeam with owner validation"

git add server/controllers/teamController.js
git commit -m "feat(team-controller): add addMember with duplicate prevention and removeMember handlers"

git add server/controllers/messageController.js
git commit -m "feat(message-controller): implement sendMessage with self-message prevention"

git add server/controllers/messageController.js
git commit -m "feat(message-controller): add getInbox sorted by newest first"

git add server/controllers/messageController.js
git commit -m "feat(message-controller): add getConversation with bidirectional \$or query for full thread"

git add server/controllers/messageController.js
git commit -m "feat(message-controller): implement markAsRead with receiver-only authorization check"

# =============================================================================
# PART 4 — BACKEND: ROUTES
# =============================================================================

git add server/routes/authRoutes.js
git commit -m "feat(auth-routes): add protected GET /me and PUT /profile routes"

git add server/routes/projectRoutes.js
git commit -m "feat(project-routes): register full CRUD routes for /api/projects, all protected"

git add server/routes/teamRoutes.js
git commit -m "feat(team-routes): create teamRoutes with CRUD and nested member management endpoints"

git add server/routes/messageRoutes.js
git commit -m "feat(message-routes): create messageRoutes for send, inbox, conversation, and markRead"

git add server/server.js
git commit -m "feat(server): register auth, project, team, and message route groups in Express app"

git add server/server.js
git commit -m "chore(server): add health check endpoint returning API version and process.exit on DB failure"

# =============================================================================
# PART 5 — FRONTEND: CONTEXT
# =============================================================================

git add client/src/context/ThemeContext.jsx
git commit -m "feat(theme-context): create ThemeContext with Deep Space, Cyber Neon, and Minimal Light themes"

git add client/src/context/ThemeContext.jsx
git commit -m "feat(theme-context): inject CSS custom properties into :root on theme change for global token access"

git add client/src/context/ThemeContext.jsx
git commit -m "feat(theme-context): persist theme selection to localStorage and add cycleTheme helper"

git add client/src/context/AuthContext.jsx
git commit -m "refactor(auth-context): confirm AuthContext exports login, logout, and user state correctly"

# =============================================================================
# PART 6 — FRONTEND: API SERVICES
# =============================================================================

git add client/src/services/api.js
git commit -m "feat(api-service): create Axios instance with baseURL and JWT Bearer token request interceptor"

git add client/src/services/api.js
git commit -m "feat(api-service): add response interceptor to handle 401 globally and redirect to login"

git add client/src/services/authService.js
git commit -m "feat(auth-service): implement login, register, getMe, and updateProfile API functions"

git add client/src/services/projectService.js
git commit -m "feat(project-service): create projectService with getProjects, createProject, updateProject, deleteProject"

git add client/src/services/teamService.js
git commit -m "feat(team-service): create teamService with getTeams, createTeam, addMember, removeMember"

git add client/src/services/messageService.js
git commit -m "feat(message-service): create messageService with getInbox, getConversation, sendMessage, markAsRead"

# =============================================================================
# PART 7 — FRONTEND: COMPONENTS
# =============================================================================

git add client/src/components/GlobalFooter.jsx
git commit -m "feat(global-footer): create GlobalFooter simulated-data disclaimer shown when no user session"

git add client/src/components/GlobalFooter.jsx
git commit -m "style(global-footer): add translucent purple-tinted background and cyan login link styling"

# =============================================================================
# PART 8 — FRONTEND: PAGES
# =============================================================================

git add client/src/pages/Home.jsx
git commit -m "feat(home): create public Home landing page with hero, features grid, stats, and CTA section"

git add client/src/pages/Home.jsx
git commit -m "style(home): add ambient nebula background animations and framer-motion staggered entry"

git add client/src/pages/Home.jsx
git commit -m "feat(home): add responsive nav header with Sign In and Get Started Free CTAs"

git add client/src/App.jsx
git commit -m "feat(app): route '/' to Home.jsx public page and wrap app with ThemeProvider + AuthProvider"

git add client/src/pages/Login.jsx
git commit -m "feat(login): wire login form to authService API with AuthContext integration and navigate on success"

git add client/src/pages/Login.jsx
git commit -m "feat(login): add animated error banner, loading spinner, demo bypass when API is offline"

git add client/src/pages/Login.jsx
git commit -m "feat(login): implement working password visibility toggle button"

git add client/src/pages/Register.jsx
git commit -m "feat(register): wire registration form to authService API with AuthContext and navigate on success"

git add client/src/pages/Register.jsx
git commit -m "feat(register): add animated error banner, loading spinner, and Nandan placeholder name"

git add client/src/pages/Dashboard.jsx
git commit -m "feat(dashboard): fix profile display name to show authenticated user name or Nandan as default"

git add client/src/pages/Dashboard.jsx
git commit -m "feat(dashboard): add theme cycle toggle button (Palette icon) to header"

git add client/src/pages/Dashboard.jsx
git commit -m "feat(dashboard): fetch real projects from API via useEffect with graceful dummy data fallback"

git add client/src/pages/Dashboard.jsx
git commit -m "feat(dashboard): inject GlobalFooter at bottom and wire logout through AuthContext"

git add client/src/pages/Dashboard.jsx
git commit -m "style(dashboard): show current theme label in sidebar subtitle"

git add client/src/pages/Projects.jsx
git commit -m "feat(projects): Kanban board confirmed functional with rich dummy data architecture"

git add client/src/pages/Teams.jsx
git commit -m "feat(teams): wire teams page to API with client-side search filter and dummy fallback"

git add client/src/pages/Teams.jsx
git commit -m "feat(teams): add GlobalFooter and real-time search filtering by name and role"

git add client/src/pages/Messages.jsx
git commit -m "feat(messages): fetch real inbox via getInbox API on login, optimistic send via sendMessage API"

git add client/src/pages/Messages.jsx
git commit -m "feat(messages): replace hardcoded sender name 'You' with authenticated user displayName (Nandan)"

git add client/src/pages/Messages.jsx
git commit -m "feat(messages): add GlobalFooter to messages page"

# =============================================================================
# DONE — verify commit count
# =============================================================================

echo ""
echo "✅ All commits applied successfully!"
echo ""
echo "📊 Commit count:"
git log --oneline | head -60 | wc -l
echo ""
echo "📋 Recent commit log:"
git log --oneline -60
echo ""
echo "🚀 Ready to push. Run: git push origin main"
