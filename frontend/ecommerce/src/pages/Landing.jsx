import { useState, useEffect } from "react";
import NavBar from "../components/NavBar.jsx";
import SideBar from "../components/SideBar.jsx";
import Collection from "../components/Collection.jsx";
import Footer from "../components/Footer.jsx";
import Request from "../api/Request.js";
export default function Landing() {
  const [collections, setCollections] = useState([]);
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
    <div>
      <NavBar />
      <div className="flex">
        <SideBar />
        <div className="flex flex-col ">
          {collections.map((c, k) => (
            <Collection key={k} collection={c} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
