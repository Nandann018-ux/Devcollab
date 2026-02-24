import projects from "../data/projects";
import ProjectCard from "../components/ProjectCard";
import { useAuth } from "../context/AuthContext";

function Dashboard() {
  const { user } = useAuth();

  return (
    <div style={{ padding: "40px" }}>
      <h1>Welcome, {user?.name} 🚀</h1>
      <h2 style={{ marginTop: "30px" }}>Explore Projects</h2>

      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}

export default Dashboard;