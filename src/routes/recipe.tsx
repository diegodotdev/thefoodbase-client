import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getRecipe } from "../lib/actions";
import Loader from "../components/loader";
import ErrorComponent from "../components/error";
import RelatedRecipes from "../components/related-recipes";
import { urlFor } from "../lib/utils";

export default function Recipe() {
  const { id } = useParams();

  if (!id) throw new Error("No recipe ID was found");

  const { data, error, isPending } = useQuery({
    queryKey: ["recipe"],
    queryFn: () => getRecipe(id),
  });

  if (isPending) return <Loader />;
  if (error) return <ErrorComponent />;
  return (
    <div className="w-full flex gap-5 py-5">
      <div className="w-8/12 flex flex-col gap-5">
        <p className="text-4xl font-[600]">{data.title}</p>
        <img
          src={
            data.image.includes("https") ? data.image : urlFor(data.image).url()
          }
          alt={`image of ${data.image}`}
          className="w-full h-[500px] rounded-lg object-cover"
        />
        <div className="w-full flex">
          <div className="w-1/2 flex flex-col gap-1 items-center justify-center py-2">
            <p className="text-gray-500">Prep Time:</p>
            <p>{data.prepTime}</p>
          </div>
          <div className="w-1/2 flex flex-col gap-1 items-center justify-center py-2 border-l border-gray-400">
            <p className="text-gray-500">Servings Time:</p>
            <p>{data.servings}</p>
          </div>
        </div>
        <p className="text-3xl font-[600]">Ingredients</p>
        {data.ingredients.map((i, idx) => (
          <label key={idx} className="w-full flex items-center gap-2">
            <input type="checkbox" /> <p>{i}</p>
          </label>
        ))}
        <p className="text-3xl font-[600]">Instructions</p>
        {data.instructions.map((i, idx) => (
          <div key={idx} className="w-full flex items-center gap-2">
            <p>
              {idx + 1}. {i}
            </p>
          </div>
        ))}
      </div>
      <RelatedRecipes category={data.category} />
    </div>
  );
}
