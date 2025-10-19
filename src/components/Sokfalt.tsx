import { BsSearch } from 'react-icons/bs';

interface SokfaltProps {
  value: string;
  onChange: (newValue: string) => void;
}

export const Sokfalt = ({ value, onChange }: SokfaltProps) => {
  return (
    <div className="bg-slate-800 w-full rounded-lg h-[12] p-4 shadow-lg flex items-center">
      <BsSearch className="text-[#F9F8F8] cursor-pointer"/>
      <input type="text" placeholder="Sök..." value={value} onChange={(e) => onChange?.(e.target.value)} className="bg-transparent border-none outline-none text-xl ml-1 placeholder:text-gray-300 text-white w-full pl-2"/>
    </div>
  )
};