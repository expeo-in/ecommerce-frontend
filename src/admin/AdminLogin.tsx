import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "./auth-store";
import httpClient from "../services/api-client";

const AdminLogin = () => {
  const [formData, setFormData] = useState<any>({ email: "", password: "" });
  const [error, setError] = useState<any>({});
  const navigate = useNavigate();
  const { setUser } = useAuthStore();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    axios
      .post("https://localhost:7058/api/Admin", formData)
      .then((res) => {
        setUser(res.data);
        navigate("/admin");
      })
      .catch((error) => setError(error));
  };

  return (
    <>
      <h2>Login</h2>
      {error?.message && (
        <div className="alert alert-danger">{error.message}</div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            required
            name="email"
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            required
            name="password"
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </>
  );
};

export default AdminLogin;
