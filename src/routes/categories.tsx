import { CATEGORIES } from "../constants";
import { Link } from "react-router-dom";

export default function Categories() {
  return (
    <div className="w-full grid grid-cols-3 gap-5 py-5">
      {CATEGORIES.map((i) => (
        <Link to={i.href} key={i.id} className="w-full">
          <div className="w-full h-[300px] relative rounded-lg overflow-hidden group">
            <img
              src={i.image}
              alt={i.label}
              className="w-full h-full object-cover duration-[.8s] group-hover:scale-105"
            />
            <div className="absolute z-50 bg-black/50 top-0 right-0 w-full h-full flex justify-start items-end p-5 group-hover:opacity-0 duration-[.8s]">
              <p className="text-white font-[600] text-2xl">{i.label}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
