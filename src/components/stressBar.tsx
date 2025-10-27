import { useAktieMarknad } from "../context/aktieMarknadContext";

export const StressBar = () => {
  const { stress, kraschSker } = useAktieMarknad();

  return (
    <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 overflow-hidden shadow">
      <div
        className={`h-full transition-all duration-500 ${
          kraschSker
            ? "bg-red-600 animate-pulse"
            : stress > 70
            ? "bg-emerald-600"
            : "bg-emerald-500"
        }`}
        style={{ width: `${stress}%` }}
      ></div>
    </div>
  );
};