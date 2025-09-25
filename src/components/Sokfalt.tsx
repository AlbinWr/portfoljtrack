import { BsSearch } from 'react-icons/bs';

export const Sokfalt = () => {
  return (
    <div className="bg-[#272838] w-full rounded-lg h-[12] p-4 shadow-lg flex items-center">
      <BsSearch className="text-[#F9F8F8] cursor-pointer"/>
      <input type="text" placeholder="Sök..." className="bg-transparent border-none outline-none text-xl ml-1 placeholder:text-gray-300 text-white w-full pl-2"/>
    </div>
  )
};