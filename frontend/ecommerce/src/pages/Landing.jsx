import { useState, useEffect } from "react";
import NavBar from "../components/NavBar.jsx";
import SideBar from "../components/SideBar.jsx";
import Collection from "../components/Collection.jsx";
import Footer from "../components/Footer.jsx";
import Request from "../api/Request.js";
import { Menu, X } from "lucide-react";

export default function Landing() {
  const [collections, setCollections] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    async function getCollections() {
      try {
        const res = await Request("collections").getAll();
        if (res) setCollections(res.data);
      } catch (err) {
        console.log("Error:", err);
      }
    }
    getCollections();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />

      {/* Mobile sidebar toggle */}
      <button
        className="md:hidden fixed bottom-4 left-4 z-50 bg-indigo-600 text-white p-3 rounded-full shadow-lg"
        onClick={() => setSidebarOpen(!sidebarOpen)}
        aria-label="Toggle sidebar"
      >
        {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/40 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex flex-1">
        {/* Sidebar: hidden on mobile, fixed visible on md+ */}
        <div
          className={`${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 fixed md:relative z-40 md:z-auto transition-transform duration-300 ease-in-out h-full md:h-auto`}
        >
          <SideBar />
        </div>

        {/* Main content: fills remaining width */}
        <div className="flex-1 min-w-0 flex flex-col">
          {collections.map((c, k) => (
            <Collection key={k} collection={c} />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
