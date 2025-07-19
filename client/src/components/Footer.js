import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-100 border-t border-gray-300 py-6 mt-12 w-full">
      <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between text-xs sm:text-sm text-gray-600">
        <div className="mb-2 sm:mb-0">© {new Date().getFullYear()} TravelBringer. All rights reserved.</div>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 items-center">
          <Link to="/terms" className="hover:underline">Terms & Conditions and Terms of Use</Link>
          <Link to="/privacy" className="hover:underline">Privacy Policy</Link>
        </div>
      </div>
    </footer>
  );
}
