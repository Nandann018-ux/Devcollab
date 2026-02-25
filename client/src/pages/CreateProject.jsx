import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateProject({ addProject }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tech: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newProject = {
      id: Date.now(),
      ...formData,
    };

    addProject(newProject);
    navigate("/dashboard");
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>Create New Project 🚀</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Project Title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <br /><br />

        <textarea
          name="description"
          placeholder="Project Description"
          value={formData.description}
          onChange={handleChange}
          required
        />
        <br /><br />

        <input
          type="text"
          name="tech"
          placeholder="Tech Stack (React, Node...)"
          value={formData.tech}
          onChange={handleChange}
          required
        />
        <br /><br />

        <button type="submit">Create Project</button>
      </form>
    </div>
  );
}

export default CreateProject;