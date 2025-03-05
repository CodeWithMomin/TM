import { useState ,useEffect} from "react";
import { Sun, Moon } from "lucide-react";


const ThemeToggle = () => {
 
const [toggle,setToggle]=useState(() => {
    return localStorage.getItem("theme") !== "light";
  })
  // Apply theme whenever toggle changes
  useEffect(() => {
    if (toggle) {
      document.body.classList.remove("light-mode");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.add("light-mode");
      localStorage.setItem("theme", "light");
    }
  }, [toggle]);
  return (
    <div className="darkmodediv">
      {toggle ? (
        <Sun className="mode" onClick={() => setToggle(false)} size={24} />
      ) : (
        <Moon className="mode" onClick={() => setToggle(true)} size={24} />
      )}
    </div>
  );
};

export default ThemeToggle;
