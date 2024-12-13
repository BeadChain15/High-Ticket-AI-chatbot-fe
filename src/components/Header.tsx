import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState(location.pathname);

  const handleNavigate = (section: string) => {
    setActiveSection(section); // Update the active section
    navigate(section);
  };

  return (
    <>
      {/* Header */}
      <div className="flex fixed w-full bg-white items-center justify-between px-4 py-3 border-b text-black">
        <div className="flex items-center gap-2">
          <h1 className="text-5xl font-medium">High Ticket AI</h1>
        </div>
        <div className="flex space-x-4 px-10">
          <div 
            className={`font-bold cursor-pointer ${activeSection === "/chat" ? "text-blue-700" : "text-black"} hover:text-blue-700`}
            onClick={() => handleNavigate("/chat")}
          >
            Search
          </div>
          <div 
            className={`font-bold cursor-pointer ${activeSection === "/train" ? "text-blue-700" : "text-black"} hover:text-blue-700`}
            onClick={() => handleNavigate("/train")}
          >
            Training Data
          </div>
          <div 
            className={`font-bold cursor-pointer ${activeSection === "/prompt" ? "text-blue-700" : "text-black"} hover:text-blue-700`}
            onClick={() => handleNavigate("/prompt")}
          >
            Prompt
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
