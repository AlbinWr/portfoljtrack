import kontaktbild from "../assets/kontaktbild.jpeg";
import githubSvartIcon from "../assets/icons/githubSvart.svg";
import githubVitIcon from "../assets/icons/githubVit.svg";
import linkedinIcon from "../assets/icons/linkedin.svg";

export const Kontakta = () => {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 text-slate-900 dark:text-white">
      <h1 className="text-3xl font-semibold mb-6">Kontakta mig</h1>
      <div className="space-y-4">
        
        {/** Kontaktinformation */}
        <div className="p-4 rounded-lg border border-slate-200 dark:border-slate-700/60 bg-slate-100/70 dark:bg-slate-800/90 shadow-lg backdrop-blur-md flex items-center gap-4">
          <img
            src={kontaktbild}
            alt="Albin Wreeby"
            className="w-20 h-20 rounded-full object-cover border-2 border-slate-300 dark:border-slate-600"
          />
          <div>
            <h2 className="text-lg font-semibold mb-1">Albin Wreeby</h2>
            <p>
              Byggt av <span className="font-semibold">Albin</span>, Systemutvecklare och teknikentusiast.
            </p>
            {/* Sociala länkar */}
            <div className="flex items-center gap-4 mt-2">
              <a href="https://www.linkedin.com/in/albinwreeby" target="_blank">
                <img src={linkedinIcon} alt="LinkedIn" className="w-8 h-8 hover:opacity-80 transition" />
              </a>
              <a href="https://github.com/AlbinWr?tab=repositories" target="_blank">
                <img src={githubSvartIcon} alt="Github" className="w-7 h-7 hover:opacity-80 transition dark:hidden" />
                <img src={githubVitIcon} alt="Github" className="w-7 h-7 hover:opacity-80 transition dark:block hidden" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
