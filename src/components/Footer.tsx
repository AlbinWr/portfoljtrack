import githubSvartIcon from "../assets/icons/githubSvart.svg";
import linkedinIcon from "../assets/icons/linkedin.svg";
import { NavLink } from "react-router-dom";

const socialLinks = [
  { to: "/", text: "Hem" },
  { to: "/aktier", text: "Aktier" },
  { to: "/installningar", text: "Inställningar" },
  { to: "/kontakt", text: "Kontakta mig" },
];

export const Footer = () => {
  return (
    <footer className="relative w-full bg-[#00cba9] text-slate-900 py-8 text-sm">
      {/* Wave SVG */}
      <div className="absolute -top-[120px] left-0 w-full overflow-visible leading-none z-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          className="w-[110%] h-32 -ml-[5%]"
        >
          <path
            fill="#00cba9"
            fillOpacity="1"
            d="M0,320L26.7,282.7C53.3,245,107,171,160,160C213.3,149,267,203,320,218.7C373.3,235,427,213,480,218.7C533.3,224,587,256,640,250.7C693.3,245,747,203,800,202.7C853.3,203,907,245,960,250.7C1013.3,256,1067,224,1120,202.7C1173.3,181,1227,171,1280,144C1333.3,117,1387,75,1413,53.3L1440,32L1440,320L1413.3,320C1386.7,320,1333,320,1280,320C1226.7,320,1173,320,1120,320C1066.7,320,1013,320,960,320C906.7,320,853,320,800,320C746.7,320,693,320,640,320C586.7,320,533,320,480,320C426.7,320,373,320,320,320C266.7,320,213,320,160,320C106.7,320,53,320,27,320L0,320Z"
          ></path>
        </svg>
      </div>

      {/* Innehåll */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
        {/* Information */}
        <div className="md:justify-self-start">
          <h2 className="font-bold text-lg">AktieX</h2>
          <p className="mt-2 text-xs opacity-80">
            En enkel aktiesimulator byggd med React & Tailwind.
          </p>
        </div>

        {/* Snabb länkar */}
        <div className="md:justify-self-center">
          <h2 className="font-bold text-lg">Länkar</h2>
          {socialLinks.map((l) => (
            <NavLink key={l.to} to={l.to} className="block mt-1">
              {l.text}
            </NavLink>
          ))}
        </div>

        {/* Sociala länkar */}
        <div className="md:justify-self-end">
          <h2 className="font-bold text-lg">Socialt</h2>
          <div className="flex justify-center md:justify-start gap-4 mt-2">
            <a
              href="https://github.com/AlbinWr?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={githubSvartIcon} alt="Github" className="w-6 h-6" />
            </a>
            <a
              href="https://www.linkedin.com/in/albinwreeby"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={linkedinIcon} alt="LinkedIn" className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>

      <div className="relative z-10 text-center mt-6 text-xs opacity-70">
        © 2025 AktieX. Alla rättigheter förbehållna.
      </div>
    </footer>
  );
};