import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/register", form);
      setMessage(res.data.msg);
      // Auto-login after registration
      const loginRes = await api.post("/auth/login", { email: form.email, password: form.password });
      localStorage.setItem("token", loginRes.data.token);
      navigate("/dashboard");
    } catch (err) {
      setMessage(err.response?.data?.msg || "Error");
    }
  };

  return (
    <div className="px-2 py-4 sm:p-6 md:p-8 flex justify-center items-center min-h-[70vh] w-full">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg border border-blue-100 p-4 sm:p-8">
        <h2 className="text-3xl mb-6 font-bold text-blue-700 text-center">Register</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <input type="text" placeholder="Name" value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="block p-3 border border-blue-200 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition" />
          <input type="email" placeholder="Email" value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="block p-3 border border-blue-200 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition" />
          <input type="password" placeholder="Password" value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="block p-3 border border-blue-200 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition" />
          <button className="w-full bg-gradient-to-r from-blue-600 to-green-500 text-white px-4 py-3 rounded-lg font-bold text-lg shadow hover:scale-[1.02] transition">Register</button>
        </form>
        {message && <p className="mt-4 text-green-600 text-center mt-6">{message}</p>}
      </div>
    </div>
  );
}

// Add Footer to page
export function RegisterWithFooter() {
  return <>
    <Register />
    <Footer />
  </>;
}

export default Register;
