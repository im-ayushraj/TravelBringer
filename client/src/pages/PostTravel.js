import { useState } from "react";
import api from "../api";
import Footer from "../components/Footer";

function PostTravel() {
  const [form, setForm] = useState({ user: "", from: "", to: "", date: "", notes: "", contactInfo: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/travels", form);
      alert("Travel post submitted!");
    } catch (err) {
      alert("Error posting travel.");
    }
  };

  return (
    <div className="px-2 py-4 sm:p-6 md:p-8 flex justify-center items-center min-h-[70vh] w-full">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg border border-blue-100 p-4 sm:p-8">
        <h2 className="text-3xl mb-6 font-bold text-blue-700 text-center">Post Travel Plan</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <input type="text" placeholder="Your Name" value={form.user}
            onChange={(e) => setForm({ ...form, user: e.target.value })}
            className="block p-3 border border-blue-200 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition" />
          <div className="flex flex-col sm:flex-row gap-4">
            <input type="text" placeholder="From City" value={form.from}
              onChange={(e) => setForm({ ...form, from: e.target.value })}
              className="block p-3 border border-blue-200 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition" />
            <input type="text" placeholder="To City" value={form.to}
              onChange={(e) => setForm({ ...form, to: e.target.value })}
              className="block p-3 border border-blue-200 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition" />
          </div>
          <input type="date" value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            className="block p-3 border border-blue-200 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition" />
          <textarea placeholder="Notes" value={form.notes}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
            className="block p-3 border border-blue-200 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition" rows={3} />
          <input type="text" placeholder="Contact Info (phone, email, WhatsApp, etc.)" value={form.contactInfo}
            onChange={(e) => setForm({ ...form, contactInfo: e.target.value })}
            className="block p-3 border border-blue-200 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition" />
          <button className="w-full bg-gradient-to-r from-blue-600 to-green-500 text-white px-4 py-3 rounded-lg font-bold text-lg shadow hover:scale-[1.02] transition">Post</button>
        </form>
      </div>
    </div>
  );
}

// Add Footer to page
export function PostTravelWithFooter() {
  return <>
    <PostTravel />
    <Footer />
  </>;
}

export default PostTravel;
