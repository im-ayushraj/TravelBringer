import { useEffect, useState } from "react";
import api from "../api";
import Footer from "../components/Footer";

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    api.get("/travels").then(res => setPosts(res.data));
  }, []);

  return (
    <div className="px-2 py-4 sm:p-6 md:p-8 w-full">
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
      <h1 className="text-3xl font-bold mb-6 text-blue-700">Travel Opportunities</h1>
      {posts.map((post, i) => (
        <div
          key={i}
          className="group p-4 sm:p-6 mb-6 bg-white rounded-2xl shadow-lg border border-blue-100 flex flex-col sm:flex-row items-center transition-transform hover:scale-[1.02] hover:shadow-2xl"
        >
          <div className="flex items-center md:mr-6 mb-4 md:mb-0">
            <span className="inline-block w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center sm:mr-3 mr-0 mb-3 sm:mb-0 shadow-lg">
              <span className="text-white text-xl font-bold">
                {(post.userName || post.name || "T").charAt(0)}
              </span>
            </span>
            <span className="font-semibold text-blue-700 text-lg">
              {post.userName || post.name || "Traveler"}
            </span>
          </div>
          <div className="flex-1 w-full">
            <p className="text-gray-800 text-base mb-1">
              <span className="font-semibold text-blue-600">{post.userName || post.name || "Traveler"}</span>
              <span> is traveling from </span>
              <span className="font-semibold text-green-700">{post.from}</span>
              <span> to </span>
              <span className="font-semibold text-green-700">{post.to}</span>
            </p>
            <p className="text-sm text-gray-500 mb-1">Date: <span className="font-medium text-gray-700">{post.date}</span></p>
            <p className="text-gray-700 mb-2">{post.notes}</p>
            <div className="flex flex-wrap items-center gap-2">
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
      ))}
    </div>
  );
}

// Add Footer to page
export function HomeWithFooter() {
  return <>
    <Home />
    <Footer />
  </>;
}

export default Home;
