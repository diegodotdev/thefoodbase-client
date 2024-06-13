import { useQuery } from "@tanstack/react-query";
import { getRecipes } from "../lib/actions";
import Loader from "../components/loader";
import Error from "../components/error";
import { Link } from "react-router-dom";
import { urlFor } from "../lib/utils";

export default function Recipes() {
  const { data, isPending, error } = useQuery({
    queryKey: ["recipes"],
    queryFn: getRecipes,
  });

  if (isPending) return <Loader />;
  if (error) return <Error />;
  return (
    <div className="w-full py-5 grid place-items-start gap-5 grid-cols-1 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5">
      {data.map((i) => (
        <Link to={`/recipes/${i.id}`} key={i.id} className="w-full">
          <div className="w-full h-[200px] relative rounded-lg overflow-hidden group">
            <img
              src={i.image.includes("https") ? i.image : urlFor(i.image).url()}
              alt={i.title}
              className="w-full h-full object-cover group-hover:scale-105 duration-[.8s]"
            />
            <div className="absolute top-0 right-0 w-full h-full bg-black/50 duration-[.8s] group-hover:opacity-0 p-4 flex justify-start items-end">
              <p className="text-white font-[600] text-lg">{i.title}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
