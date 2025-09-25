
import { BiLogoReact } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useSaldo } from "../hooks/useSaldo";

export const Navbar = () => {
  const { saldo } = useSaldo();

  return (
    <nav className="no-underline bg-slate-800 shadow-lg flex items-center justify-around py-3 px-32 fixed top-0 left-0 w-full">
      <Link to="/">
        <span className="font-semibold text-lg flex items-center gap-3 text-blue-400 fixed top-0 left-0">
          <BiLogoReact className="text-6xl" />
          <span className="font-semibold text-2xl">AktieX</span>
        </span>
      </Link>

      <div className="flex items-center gap-5 text-black">
        {/* Saldot */}
        <div className="text-white text-sm">
          Saldo:{" "}
          <span className="font-semibold">
            {saldo.toLocaleString("sv-SE")} SEK
          </span>
        </div>

        {/* Navigationslänkar */}
        <Link
          to="/"
          className="relative py-1 px-3 text-lg font-light text-white  hover:text-sky-300 rounded-2xl hover:bg-slate-700 transition duration-300 group"
        >
          Home
          <span className="absolute left-0 -bottom-1 h-[2px] w-full origin-center scale-x-0 bg-sky-300 transition-transform duration-300 group-hover:scale-x-100"></span>
        </Link>

        <Link
          to="/aktier"
          className="relative py-1 px-3 text-lg font-light text-white  hover:text-sky-300 rounded-2xl hover:bg-slate-700 transition duration-300 group"
        >
          Aktier
          <span className="absolute left-0 -bottom-1 h-[2px] w-full origin-center scale-x-0 bg-sky-300 transition-transform duration-300 group-hover:scale-x-100"></span>
        </Link>

        <Link
          to="/installningar"
          className="relative py-1 px-3 text-lg font-light text-white  hover:text-sky-300 rounded-2xl hover:bg-slate-700 transition duration-300 group"
        >
          Inställningar
          <span className="absolute left-0 -bottom-1 h-[2px] w-full origin-center scale-x-0 bg-sky-300 transition-transform duration-300 group-hover:scale-x-100"></span>
        </Link>

        <Link
          to="/Contact"
          className="relative py-1 px-3 text-lg font-light text-white  hover:text-sky-300 rounded-2xl hover:bg-slate-700 transition duration-300 group"
        >
          Contact
          <span className="absolute left-0 -bottom-1 h-[2px] w-full origin-center scale-x-0 bg-sky-300 transition-transform duration-300 group-hover:scale-x-100"></span>
        </Link>
      </div>
    </nav>
  );
};
