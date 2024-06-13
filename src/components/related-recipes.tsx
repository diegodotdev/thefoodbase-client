import { useQuery } from "@tanstack/react-query";
import { getRecipesByCategory } from "../lib/actions";
import Error from "./error";
import Loader from "./loader";
import { Link } from "react-router-dom";
import { urlFor } from "../lib/utils";

export default function RelatedRecipes({ category }: { category: string }) {
  const { data, error, isPending } = useQuery({
    queryKey: ["category"],
    queryFn: () => getRecipesByCategory(category),
  });

  if (isPending) return <Loader />;
  if (error) return <Error />;
  return (
    <div className="w-4/12 flex flex-col justify-start items-start gap-5">
      <p className="text-lg font-[600]">Similar Recipes</p>
      {data.map((i) => (
        <Link to={`/recipes/${i.id}`} key={i.id} className="w-full">
          <div className="w-full h-[250px] relative rounded-lg overflow-hidden group">
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
