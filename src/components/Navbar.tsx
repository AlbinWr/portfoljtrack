
import { BiLogoReact } from "react-icons/bi";
import { NavLink } from "react-router-dom";
import { useSaldo } from "../hooks/useSaldo";
import { DiAptana } from 'react-icons/di';
import { GoGraph } from 'react-icons/go';
import { MdContactSupport } from 'react-icons/md';
import { LuSunDim, LuMoon } from 'react-icons/lu';
import { useState, useEffect } from "react";

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

  return (
    <nav className="fixed top-0 left-0 w-full bg-slate-800 shadow-lg flex items-center justify-between px-8 py-3 z-100">
      {/* Logotyp och titel */}
      <NavLink to="/">
        <div className="flex items-center gap-3 text-blue-400">
          <BiLogoReact className="text-5xl sm:hidden" />
          <span className="font-semibold text-2xl hidden sm:block">AktieX</span>
        </div>
      </NavLink>

      {/* Navigationslänkar */}
      <div className="flex items-center gap-6 px-4">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "relative py-1 px-3 text-lg font-light text-sky-300 rounded-2xl bg-slate-700 transition duration-300 group hidden sm:block"
              : "relative py-1 px-3 text-lg font-light text-white  hover:text-sky-300 rounded-2xl hover:bg-slate-700 transition duration-300 group hidden sm:block"
          }
        >
          Home
          <span className="absolute left-0 -bottom-1 h-[2px] w-full origin-center scale-x-0 bg-sky-300 transition-transform duration-300 group-hover:scale-x-100"></span>
        </NavLink>

        <NavLink
          to="/aktier"
          className={({ isActive }) =>
            isActive
              ? "relative py-1 px-3 text-lg font-light text-sky-300 rounded-2xl bg-slate-700 transition duration-300 group"
              : "relative py-1 px-3 text-lg font-light text-white  hover:text-sky-300 rounded-2xl hover:bg-slate-700 transition duration-300 group"
          }
        >
          {/* Ikon för mobil */}
          <GoGraph className="text-xl sm:hidden" />

          {/* Text för desktop */}
          <span className="hidden sm:inline">Aktier</span>

          {/* Effekt */}
          <span className="absolute left-0 -bottom-1 h-[2px] w-full origin-center scale-x-0 bg-sky-300 transition-transform duration-300 group-hover:scale-x-100"></span>
        </NavLink>

        <NavLink
          to="/installningar"
          className={({ isActive }) =>
            isActive
              ? "relative py-1 px-3 text-lg font-light text-sky-300 rounded-2xl bg-slate-700 transition duration-300 group"
              : "relative py-1 px-3 text-lg font-light text-white  hover:text-sky-300 rounded-2xl hover:bg-slate-700 transition duration-300 group"
          }
        >
          {/* Ikon för mobil */}
          <DiAptana className="text-xl sm:hidden" />

          {/* Text för desktop */}
          <span className="hidden sm:inline">Inställningar</span>

          {/* Effekt */}
          <span className="absolute left-0 -bottom-1 h-[2px] w-full origin-center scale-x-0 bg-sky-300 transition-transform duration-300 group-hover:scale-x-100"></span>
        </NavLink>

        <NavLink
          to="/kontakt"
          className={({ isActive }) =>
            isActive
              ? "relative py-1 px-3 text-lg font-light text-sky-300 rounded-2xl bg-slate-700 transition duration-300 group"
              : "relative py-1 px-3 text-lg font-light text-white  hover:text-sky-300 rounded-2xl hover:bg-slate-700 transition duration-300 group"
          }
        >
          {/* Ikon för mobil */}
          <MdContactSupport className="text-xl sm:hidden" />

          {/* Text för desktop */}
          <span className="hidden sm:inline">Kontakta</span>

          {/* Effekt */}
          <span className="absolute left-0 -bottom-1 h-[2px] w-full origin-center scale-x-0 bg-sky-300 transition-transform duration-300 group-hover:scale-x-100"></span>
        </NavLink>
      </div>

      <div className="flex items-center gap-6">
        {/* Saldot */}
        <div className="bg-slate-700 text-white text-sm px-3 py-1 rounded-full shadow">
          <span className="font-semibold text-orange-300">
            {saldo.toLocaleString("sv-SE")} SEK
          </span>
        </div>

        {/* Dark mode toggle */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleDarkMode}
            className="relative w-10 h-10 flex items-center justify-center rounded-full bg-slate-700 dark:bg-slate-600 hover:bg-slate-600 dark:hover:bg-slate-500 transition duration-300 text-white text-xl"
          >
            <span
              className={`inline-block transition-all duration-300 transform ${
                darkMode
                  ? "rotate-180 scale-110 opacity-0"
                  : "rotate-0 scale-100 opacity-100"
              }`}
            >
              <LuSunDim className="text-orange-300" />
            </span>
            <span
              className={`inline-block transition-all duration-300 transform absolute ${
                darkMode
                  ? "rotate-0 scale-100 opacity-100"
                  : "rotate-180 scale-110 opacity-0"
              }`}
            >
              <LuMoon className="text-sky-300" />
            </span>
          </button>
        </div>
      </div>
    </nav>
  );
};
