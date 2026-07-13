import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import Navbar from "../components/Navbar";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import api from "../libs/axios";

function Signup() {
  
  const {user, login, loading: authLoading} = useContext(AuthContext); // context values

  const navigate = useNavigate();
  
    useEffect(() => {
        if(!authLoading && user) {
          navigate('/');
      }
  }, [user, authLoading, navigate]);


  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const username = formData.username.trim();
    const email = formData.email.trim().toLowerCase();
    const password = formData.password;

    if (!username.trim() || !email.trim() || !password.trim()) {
      setError("Please fill in all fields.");
      toast.error("Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);

      const res = await api.post("/users/create", {
        username,
        email,
        password,
      });
      
      // console.log({
      //   username,
      //   email,
      //   password,
      // });

      login(res.data);
      toast.success('Registration Successful');

    } catch (error) {
      setError(error.response?.data?.message || "Registration failed");
      toast.error(error.response?.data?.message || "Registration failed");

    } finally {
      setLoading(false);
    }
  };

  return (
    <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-base-100 shadow-xl rounded-xl p-8">

        <h1 className="text-3xl font-bold text-center">
          Create Account
        </h1>

        <p className="text-center text-base-content/70 mt-2 mb-6">
          Register to start managing your notes
        </p>

        {error && (
          <div className="alert alert-error mb-5">
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="label">
              <span className="label-text">Username</span>
            </label>

            <input
              type="text"
              name="username"
              placeholder="Enter your username"
              className="input input-bordered w-full"
              value={formData.username}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="label">
              <span className="label-text">Email</span>
            </label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="input input-bordered w-full"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="label">
              <span className="label-text">Password</span>
            </label>

            <input
              type="password"
              name="password"
              placeholder="Create a password"
              className="input input-bordered w-full"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

        

          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="loading loading-spinner loading-sm"></span>
                Creating Account...
              </>
            ) : (
              "Register"
            )}
          </button>

        </form>

        <p className="text-center mt-6 text-sm">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-primary font-semibold hover:underline"
          >
            Login
          </Link>
        </p>

      </div>
    </div>
    </>
  );
}

export default Signup;