import { useAuth } from "../context/AuthContext";

const { login } = useAuth();

const handleSubmit = (e) => {
  e.preventDefault();

  if (!form.email || !form.password) {
    alert("All fields required");
    return;
  }

  login({
    name: "Nandan",
    email: form.email,
  });

  navigate("/dashboard");
};