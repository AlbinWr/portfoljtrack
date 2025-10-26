import { BsSearch } from 'react-icons/bs';

interface SokfaltProps {
  value: string;
  onChange: (newValue: string) => void;
}

export const Sokfalt = ({ value, onChange }: SokfaltProps) => {
  return (
    <div className="border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 w-full rounded-lg h-[12] p-4 shadow-md flex items-center">
      <BsSearch className="dark:text-white cursor-pointer"/>
      <input type="text" placeholder="Sök..." value={value} onChange={(e) => onChange?.(e.target.value)} className="border-none outline-none text-xl ml-1 placeholder:dark:text-white w-full pl-2"/>
    </div>
  )
};