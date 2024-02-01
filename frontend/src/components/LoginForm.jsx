import { useState } from "react";
import axios from "axios";
import '../styles/loginForm.scss'

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (username === "" || password === "") {
      alert("Veuillez remplir tous les champs requis.");
      return;
    }

    try {
      const response = await axios.post("https://api.quintarddylan.fr:4000/api/auth/login", {
        username,
        password,
      });

      if (response.status === 200) {

        // Store the token in local storage
        localStorage.setItem('token', response.token);

        // Redirect to the dashboard
        window.location.href = '/dashboard';
      } else {
        const error = response.data.error;
        alert(`Erreur: ${error}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="loginForm">
      <h2>Se connecter</h2>
      <input
        type="text"
        placeholder="Nom d'utilisateur"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Mot de passe"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Se connecter</button>
    </form>
  );
};

export default LoginForm;