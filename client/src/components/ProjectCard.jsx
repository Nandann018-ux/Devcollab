function ProjectCard({ project }) {
    return (
      <div style={{
        border: "1px solid #ddd",
        padding: "16px",
        borderRadius: "10px",
        marginBottom: "16px"
      }}>
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <p><strong>Tech:</strong> {project.tech}</p>
        <p><strong>Owner:</strong> {project.owner}</p>
      </div>
    );
  }
  
  export default ProjectCard;