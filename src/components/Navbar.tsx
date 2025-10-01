
import { BiLogoReact } from "react-icons/bi";
import { NavLink } from "react-router-dom";
import { useSaldo } from "../hooks/useSaldo";

export const Navbar = () => {
  const { saldo } = useSaldo();

  return (
    <nav className="fixed top-0 left-0 w-full bg-slate-800 shadow-lg flex items-center justify-between px-8 py-3">

      {/* Logotyp och titel */}
      <NavLink to="/">
        <div className="flex items-center gap-3 text-blue-400">
          <BiLogoReact className="text-5xl" />
          <span className="font-semibold text-2xl">AktieX</span>
        </div>
      </NavLink>

      {/* Navigationslänkar */}
      <div className="flex items-center gap-6">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "relative py-1 px-3 text-lg font-light text-sky-300 rounded-2xl bg-slate-700 transition duration-300 group"
              : "relative py-1 px-3 text-lg font-light text-white  hover:text-sky-300 rounded-2xl hover:bg-slate-700 transition duration-300 group"
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
          Aktier
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
          Inställningar
          <span className="absolute left-0 -bottom-1 h-[2px] w-full origin-center scale-x-0 bg-sky-300 transition-transform duration-300 group-hover:scale-x-100"></span>
        </NavLink>

        <NavLink
          to="/Contact"
          className={({ isActive }) =>
            isActive
              ? "relative py-1 px-3 text-lg font-light text-sky-300 rounded-2xl bg-slate-700 transition duration-300 group"
              : "relative py-1 px-3 text-lg font-light text-white  hover:text-sky-300 rounded-2xl hover:bg-slate-700 transition duration-300 group"
          }
        >
          Contact
          <span className="absolute left-0 -bottom-1 h-[2px] w-full origin-center scale-x-0 bg-sky-300 transition-transform duration-300 group-hover:scale-x-100"></span>
        </NavLink>
      </div>
      
        {/* Saldot */}
        <div className="bg-slate-700 text-white text-sm px-3 py-1 rounded-full shadow">
          Saldo:{" "}
          <span className="font-semibold text-orange-300">
            {saldo.toLocaleString("sv-SE")} SEK
          </span>
        </div>
    </nav>
  );
};
