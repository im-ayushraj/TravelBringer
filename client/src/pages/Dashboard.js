import { useEffect, useState } from "react";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import api from "../api";
import { Link } from "react-router-dom";

function Dashboard() {
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        await api.delete(`/travels/${id}`);
        setMyTravels(myTravels.filter(post => post._id !== id));
      } catch (err) {
        alert("Failed to delete post.");
      }
    }
  };
  // ...existing code...
  const [myTravels, setMyTravels] = useState([]);
  const [allTravels, setAllTravels] = useState([]);
  const navigate = useNavigate();

  const fetchData = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }
      const myTravelRes = await api.get("/travels/my-posts");
      setMyTravels(myTravelRes.data);
      const allTravelRes = await api.get("/travels");
      setAllTravels(allTravelRes.data);
    } catch (err) {
      alert("Session expired. Please login again.");
      localStorage.removeItem("token");
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);


  return (
    <div className="px-2 py-4 sm:p-6 md:p-8 max-w-4xl mx-auto w-full">
      <div className="mb-6 p-4 bg-yellow-100 border-l-4 border-yellow-500 rounded-lg text-yellow-900">
        <h3 className="font-bold mb-2 text-base sm:text-lg">Guidelines & Disclaimer</h3>
        <ul className="list-disc pl-3 sm:pl-5 mb-2 text-xs sm:text-sm">
          <li>TravelBringer is a peer-to-peer platform. We are <span className="font-bold">not responsible</span> for any transactions, communications, or outcomes between users.</li>
          <li>Always use caution when chatting with anyone on WhatsApp or sharing personal information.</li>
          <li>Verify the identity of the person you are communicating with before making any arrangements.</li>
          <li>Use this platform <span className="font-bold">at your own risk</span>.</li>
        </ul>
        <span className="text-xs sm:text-sm">If you encounter suspicious activity, please report it to us immediately.</span>
      </div>
      <div className="flex justify-between mb-6">
        <h2 className="text-2xl font-bold text-blue-700">Your Dashboard</h2>
      </div>

      <div>
        <h3 className="text-xl font-bold mb-2 text-blue-600">Your Travel Posts</h3>
        {myTravels.length === 0 ? (
          <p>No travel posts yet.</p>
        ) : (
          myTravels.map((post, i) => (
            <div
              key={i}
              className="group p-4 sm:p-6 mb-6 bg-white rounded-2xl shadow-lg border border-blue-100 flex flex-col sm:flex-row items-center transition-transform hover:scale-[1.02] hover:shadow-2xl"
            >
              <div className="flex items-center mr-6">
                <span className="inline-block w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center sm:mr-3 mr-0 mb-3 sm:mb-0 shadow-lg">
                  <span className="text-white text-xl font-bold">
                    {(post.userName || post.name || "T").charAt(0)}
                  </span>
                </span>
                <span className="font-semibold text-blue-700 text-lg">
                  {post.userName || post.name || "You"}
                </span>
              </div>
              <div className="flex-1">
                <p className="text-gray-800 text-base mb-1">
                  <span className="font-semibold text-blue-600">{post.userName || post.name || "You"}</span>
                  <span> is traveling from </span>
                  <span className="font-semibold text-green-700">{post.from}</span>
                  <span> to </span>
                  <span className="font-semibold text-green-700">{post.to}</span>
                </p>
                <p className="text-sm text-gray-500 mb-1">Date: <span className="font-medium text-gray-700">{post.date}</span></p>
                <p className="text-gray-700 mb-2">{post.notes}</p>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-600">Contact:</span>
                  <span className="text-gray-900 break-all">{post.contactInfo || "N/A"}</span>
                  {post.contactInfo ? (
                    post.contactInfo.startsWith("http") ? (
                      <a
                        href={post.contactInfo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-2 px-3 py-1 rounded-full bg-blue-600 text-white text-sm font-semibold shadow hover:bg-blue-700 transition"
                      >
                        Chat Now
                      </a>
                    ) : (
                      <a
                        href={`https://wa.me/${post.contactInfo.replace(/[^0-9]/g,"")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-2 px-3 py-1 rounded-full bg-green-600 text-white text-sm font-semibold shadow hover:bg-green-700 transition"
                      >
                        Chat Now
                      </a>
                    )
                  ) : null}
                  <button onClick={() => handleDelete(post._id)} className="ml-2 px-3 py-1 rounded-full bg-red-500 text-white text-sm font-semibold shadow hover:bg-red-700 transition">Delete</button>
                </div>
              </div>
            </div>
          ))
        )}
        <h3 className="text-xl font-bold mb-2 text-green-600 mt-8">Other Travelers</h3>
        {allTravels.filter(post => !myTravels.some(my => my._id === post._id)).length === 0 ? (
          <p>No other travel posts available.</p>
        ) : (
          allTravels.filter(post => !myTravels.some(my => my._id === post._id)).map((post, i) => (
            <div
              key={i}
              className="group p-4 sm:p-6 mb-6 bg-white rounded-2xl shadow-lg border border-blue-100 flex flex-col sm:flex-row items-center transition-transform hover:scale-[1.02] hover:shadow-2xl"
            >
              <div className="flex items-center mr-6">
                <span className="inline-block w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center sm:mr-3 mr-0 mb-3 sm:mb-0 shadow-lg">
                  <span className="text-white text-xl font-bold">
                    {(post.userName || post.name || "T").charAt(0)}
                  </span>
                </span>
                <span className="font-semibold text-blue-700 text-lg">
                  {post.userName || post.name || "Traveler"}
                </span>
              </div>
              <div className="flex-1">
                <p className="text-gray-800 text-base mb-1">
                  <span className="font-semibold text-blue-600">{post.userName || post.name || "Traveler"}</span>
                  <span> is traveling from </span>
                  <span className="font-semibold text-green-700">{post.from}</span>
                  <span> to </span>
                  <span className="font-semibold text-green-700">{post.to}</span>
                </p>
                <p className="text-sm text-gray-500 mb-1">Date: <span className="font-medium text-gray-700">{post.date}</span></p>
                <p className="text-gray-700 mb-2">{post.notes}</p>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-600">Contact:</span>
                  <span className="text-gray-900 break-all">{post.contactInfo || "N/A"}</span>
                  {post.contactInfo ? (
                    post.contactInfo.startsWith("http") ? (
                      <a
                        href={post.contactInfo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-2 px-3 py-1 rounded-full bg-blue-600 text-white text-sm font-semibold shadow hover:bg-blue-700 transition"
                      >
                        Chat Now
                      </a>
                    ) : (
                      <a
                        href={`https://wa.me/${post.contactInfo.replace(/[^0-9]/g,"")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-2 px-3 py-1 rounded-full bg-green-600 text-white text-sm font-semibold shadow hover:bg-green-700 transition"
                      >
                        Chat Now
                      </a>
                    )
                  ) : null}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// Add Footer to page
export function DashboardWithFooter() {
  return <>
    <Dashboard />
    <Footer />
  </>;
}

export default Dashboard;
