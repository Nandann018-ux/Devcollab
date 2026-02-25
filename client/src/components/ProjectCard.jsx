function ProjectCard({ project }) {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        padding: "20px",
        marginTop: "20px",
        borderRadius: "8px",
      }}
    >
      <h3>{project.title}</h3>
      <p>{project.description}</p>
      <p><strong>Tech Stack:</strong> {project.techStack}</p>
    </div>
  );
}

export default ProjectCard;