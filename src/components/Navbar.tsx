import { BiLogoReact } from "react-icons/bi";
import { NavLink } from "react-router-dom";
import { useSaldo } from "../hooks/useSaldo";
import { DiAptana } from 'react-icons/di';
import { GoGraph } from 'react-icons/go';
import { MdContactSupport } from 'react-icons/md';
import { LuSunDim, LuMoon } from 'react-icons/lu';
import { useState, useEffect } from "react";
import { StressBar } from "./stressBar";

export const Navbar = () => {
  const { saldo } = useSaldo();
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    return saved === "true" ? true : false;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", darkMode.toString());
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Navigationslänk stilar
  const basLink =
    "relative py-1 px-3 text-lg font-light rounded-2xl transition duration-300 group";
  const aktivLink =
    basLink + " text-sky-500 dark:text-sky-300 bg-slate-200 dark:bg-slate-700";
  const inaktivLink =
    basLink +
    " text-slate-800 dark:text-white hover:text-sky-600 dark:hover:text-sky-300 hover:bg-slate-200 dark:hover:bg-slate-700";

  interface NavItemProps {
    to: string;
    label: string;
    Icon?: React.ComponentType<{ className?: string }>;
    hiddenMobile?: boolean;
  }

  // Enskild navigationslänk komponent
  const NavItem = ({ to, label, Icon, hiddenMobile }: NavItemProps) => {
    return (
      <NavLink
        to={to}
        className={({ isActive }) => (isActive ? aktivLink : inaktivLink) + (hiddenMobile ? " hidden sm:block" : "")}
      >
        {Icon && <Icon className="text-xl sm:hidden" />}
        <span className="hidden sm:inline">{label}</span>
        <span className="absolute left-0 -bottom-1 h-[2px] w-full origin-center scale-x-0 bg-sky-300 transition-transform duration-300 group-hover:scale-x-100"></span>
      </NavLink>
    );
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-zinc-50 dark:bg-slate-800 shadow-md flex flex-col justify-between z-50">
      <div className="flex items-center justify-between px-8 py-3">
        
        {/* Logotyp */}
        <NavLink to="/">
          <div className="flex items-center gap-3 text-blue-400 dark:text-blue-400">
            <BiLogoReact className="text-5xl active:scale-95" />
          </div>
        </NavLink>

        {/* Navigationslänkar */}
        <div className="flex items-center justify-between px-8 py-3 gap-2">
          <NavItem to="/" label="Portfölj" hiddenMobile/>
          <NavItem to="/aktier" label="Aktier" Icon={GoGraph} />
          <NavItem to="/installningar" label="Inställningar" Icon={DiAptana} />
          <NavItem to="/kontakt" label="Kontakta" Icon={MdContactSupport} />
        </div>

        {/* Saldot och Dark Mode Toggle */}
        <div className="flex items-center gap-6">

          {/* Saldot */}
          <div className="bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-white text-sm px-3 py-1 rounded-full shadow">
            <span className="font-semibold text-orange-400 dark:text-orange-300">
              {saldo.toLocaleString("sv-SE")} SEK
            </span>
          </div>

          {/* Dark mode toggle */}
          <div className="flex items-center gap-4">
            <button
              onClick={toggleDarkMode}
              className="relative w-10 h-10 flex items-center justify-center rounded-full bg-slate-200 dark:bg-slate-600 hover:bg-slate-300 dark:hover:bg-slate-500 transition duration-300 text-xl"
            >
              <span
                className={`inline-block transition-all duration-300 transform ${
                  darkMode
                    ? "rotate-180 scale-110 opacity-0"
                    : "rotate-0 scale-100 opacity-100"
                }`}
              >
                <LuSunDim className="text-orange-500" />
              </span>
              <span
                className={`inline-block transition-all duration-300 transform absolute ${
                  darkMode
                    ? "rotate-0 scale-100 opacity-100"
                    : "rotate-180 scale-110 opacity-0"
                }`}
              >
                <LuMoon className="text-sky-400" />
              </span>
            </button>
          </div>
        </div>

      </div>
      
      <StressBar />
    </nav>
  );
};
