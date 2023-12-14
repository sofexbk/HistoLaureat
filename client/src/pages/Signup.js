import React, { useState } from "react";
import { useSignup } from "../hooks/useSignup";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const roles = ["etudiant", "laureat"];
  const { Signup: handleSignup, isLoading, } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
      return;
    }

    try {
      await handleSignup(email, password, confirmPassword, role);
    } catch (error) {
      setError("Échec de l'inscription");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
      >
        <h3 className="text-2xl font-bold mb-6">Inscription</h3>

        <div className="mb-4">
          <label htmlFor="email" className="text-gray-600">
            Email:
          </label>
          <input
            required={true}
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="Email"
            className="w-full h-12 px-3 border rounded focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="role" className="text-gray-600">
            Rôle:
          </label>
          <select
            required={true}
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full h-12 px-3 border rounded focus:outline-none focus:border-blue-500"
          >
            <option value="" disabled>
              Sélectionner un rôle
            </option>
            {roles.map((roleOption) => (
              <option key={roleOption} value={roleOption}>
                {roleOption}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="text-gray-600">
            Mot de passe:
          </label>
          <input
            required={true}
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="Mot de passe"
            className="w-full h-12 px-3 border rounded focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="confirmPassword" className="text-gray-600">
            Confirmer le mot de passe:
          </label>
          <input
            required={true}
            type="password"
            id="confirmPassword"
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
            placeholder="Confirmer le mot de passe"
            className="w-full h-12 px-3 border rounded focus:outline-none focus:border-blue-500"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Valider
        </button>

        {error && <div className="text-red-500 mt-4">{error}</div>}
      </form>
    </div>
  );
}

export default Signup;
