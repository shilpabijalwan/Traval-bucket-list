import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function ThemeToggle() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.classList.toggle("dark", savedTheme === "dark");
  }, []);

  // toggling the theme
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  return (
    <button
      onClick={toggleTheme}
      style={{
        ...container,
        backgroundColor: theme === "dark" ? "#1f2937" : "#e5e7eb", // dark gray / light gray
        justifyContent: theme === "dark" ? "flex-end" : "flex-start",
      }}
    >
      <motion.div
        style={handle}
        layout
        transition={{ type: "spring", duration: 0.4, bounce: 0.25 }}
      />
    </button>
  );
}

const container = {
  width: 50,
  height: 26,
  borderRadius: 32,
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  padding:3,
  border: "2px solid #cbd5e1",
  transition: "background-color 0.3s ease",
};

const handle = {
  width: 22,
  height: 22,
  backgroundColor: "white",
  borderRadius: "50%",
  boxShadow: "0 1px 3px rgba(0,0,0,0.3)",
};
