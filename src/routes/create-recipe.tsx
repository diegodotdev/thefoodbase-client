import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import Loader from "../components/loader";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ImageUp, Loader2, X } from "lucide-react";
import { CATEGORIES } from "../constants";
import { sanity, urlFor } from "../lib/utils";
import { useState } from "react";
import { createRecipe } from "../lib/actions";

const formSchema = z.object({
  title: z.string(),
  description: z.string().max(300),
  category: z.string(),
  ingredients: z.array(
    z.object({
      value: z.string(),
    })
  ),
  instructions: z.array(
    z.object({
      value: z.string(),
    })
  ),
  image: z.string(),
  servings: z.string(),
  prepTime: z.string(),
});

export default function CreateRecipe() {
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [recipeImage, setRecipeImage] = useState<string>("");
  const { isSignedIn, isLoaded } = useUser();
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      image: "",
      servings: "",
      prepTime: "",
      ingredients: [],
      instructions: [],
      category: "",
    },
  });

  const uploadImage = (e: any) => {
    const selectedFile = e.target.files[0];
    // uploading asset to sanity
    if (
      selectedFile.type === "image/png" ||
      selectedFile.type === "image/svg" ||
      selectedFile.type === "image/jpeg" ||
      selectedFile.type === "image/gif" ||
      selectedFile.type === "image/tiff"
    ) {
      setLoading(true);
      sanity.assets
        .upload("image", selectedFile, {
          contentType: selectedFile.type,
          filename: selectedFile.name,
        })
        .then((document: any) => {
          form.setValue("image", document._id);
          setRecipeImage(document._id);
          setLoading(false);
        })
        .catch((error) => {
          console.log("Upload failed:", error.message);
        });
    } else {
      setLoading(false);
    }
  };

  const {
    fields: ings,
    append: addIng,
    remove: remIng,
  } = useFieldArray({
    control: form.control,
    name: "ingredients",
  });

  const {
    fields: ins,
    append: addIns,
    remove: remIns,
  } = useFieldArray({
    control: form.control,
    name: "instructions",
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const ings = values.ingredients.map((i) => i.value);
    const ins = values.instructions.map((i) => i.value);

    const body = {
      ...values,
      userId: user?.id as string,
      userAvatar: user?.imageUrl as string,
      userName: user?.firstName as string,
      ingredients: ings,
      instructions: ins,
    };
    await createRecipe(body);
    form.reset();
    setRecipeImage("");
  };
  if (!isLoaded) return <Loader />;
  if (!isSignedIn) navigate("/");
  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="py-5 w-full flex gap-5 mx-auto"
    >
      <div className="w-1/2 flex flex-col gap-5">
        <p className="text-3xl font-[600]">Create Recipe</p>
        <div className="flex flex-col gap-2">
          <p className="font-[600]">Title</p>
          <Controller
            name="title"
            control={form.control}
            render={({ field }) => (
              <input
                type="text"
                {...field}
                className="w-full px-5 py-2 border border-gray-500 rounded-lg outline-none"
                onChange={field.onChange}
              />
            )}
          />
        </div>
        <div className="flex flex-col gap-2">
          <p className="font-[600]">Image</p>
          <label className="border border-gray-500 rounded-lg p-4 grid place-items-center relative h-[400px]">
            {loading && <Loader2 className="animate-spin" />}
            {recipeImage.length === 0 && !loading && (
              <>
                <input
                  type="file"
                  className="w-0 h-0 absolute opacity-0"
                  onChange={uploadImage}
                />
                <ImageUp />
              </>
            )}
            {recipeImage.length > 0 && (
              <>
                <button
                  className="p-2 bg-red-400 rounded-lg text-white absolute top-2 right-2"
                  onClick={() => setRecipeImage("")}
                  type="button"
                >
                  <X size="15px" />
                </button>
                <img
                  src={urlFor(recipeImage).url()}
                  alt="recipe image"
                  className="h-[350px] object-contain rounded-lg"
                />
              </>
            )}
          </label>
        </div>
        <div className="flex flex-col gap-2">
          <p className="font-[600]">Description</p>
          <Controller
            name="category"
            control={form.control}
            render={({ field }) => (
              <select
                {...field}
                className="w-full px-5 py-2 border border-gray-500 rounded-lg outline-none"
                onChange={field.onChange}
              >
                <option>Select</option>
                {CATEGORIES.map((i) => (
                  <option key={i.id} value={i.label}>
                    {i.label}
                  </option>
                ))}
              </select>
            )}
          />
        </div>
        <div className="flex flex-col gap-2">
          <p className="font-[600]">Description</p>
          <Controller
            name="description"
            control={form.control}
            render={({ field }) => (
              <textarea
                {...field}
                className="w-full px-5 py-2 border border-gray-500 rounded-lg outline-none resize-none h-[150px]"
                onChange={field.onChange}
              />
            )}
          />
        </div>
        <div className="w-full flex items-center gap-5">
          <div className="flex flex-col gap-2 w-1/2">
            <p className="font-[600]">Servings</p>
            <Controller
              name="servings"
              control={form.control}
              render={({ field }) => (
                <input
                  type="number"
                  {...field}
                  className="w-full px-5 py-2 border border-gray-500 rounded-lg outline-none"
                  onChange={field.onChange}
                />
              )}
            />
          </div>
          <div className="flex flex-col gap-2 w-1/2">
            <p className="font-[600]">Prep Time</p>
            <Controller
              name="prepTime"
              control={form.control}
              render={({ field }) => (
                <input
                  type="text"
                  {...field}
                  className="w-full px-5 py-2 border border-gray-500 rounded-lg outline-none resize-none"
                  onChange={field.onChange}
                />
              )}
            />
          </div>
        </div>
      </div>
      <div className="w-1/2 flex flex-col gap-5">
        <div className="w-full flex flex-col gap-2 min-h-[40vh]">
          <div className="w-full flex justify-between items-center py-2 sticky top-0 bg-white">
            <p className="font-[600]">Ingredients</p>
            <button
              onClick={() => addIng({ value: "" })}
              className="px-5 py-1 bg-black text-white rounded-lg outline-none"
              type="button"
            >
              Add
            </button>
          </div>
          {ings.map((field, index) => (
            <Controller
              name={`ingredients.${index}.value`}
              control={form.control}
              key={field.id}
              render={({ field }) => (
                <div className="flex items-center gap-5 w-full">
                  <input
                    {...field}
                    className="w-full px-5 py-2 border border-black rounded-lg outline-none"
                    onChange={field.onChange}
                  />
                  <button
                    className="text-white bg-red-400 rounded-lg p-3"
                    onClick={() => remIng(index)}
                    type="button"
                  >
                    <X size="15px" />
                  </button>
                </div>
              )}
            />
          ))}
        </div>
        <div className="w-full flex flex-col gap-2 min-h-[40vh]">
          <div className="w-full flex justify-between items-center py-2 sticky top-0 bg-white">
            <p className="font-[600]">Instructions</p>
            <button
              onClick={() => addIns({ value: "" })}
              className="px-5 py-1 bg-black text-white rounded-lg outline-none"
              type="button"
            >
              Add
            </button>
          </div>
          {ins.map((field, index) => (
            <Controller
              name={`instructions.${index}.value`}
              control={form.control}
              key={field.id}
              render={({ field }) => (
                <div className="flex items-center gap-5 w-full">
                  <input
                    {...field}
                    className="w-full px-5 py-2 border border-black rounded-lg outline-none"
                    onChange={field.onChange}
                  />
                  <button
                    className="text-white bg-red-400 rounded-lg p-3"
                    onClick={() => remIns(index)}
                    type="button"
                  >
                    <X size="15px" />
                  </button>
                </div>
              )}
            />
          ))}
          <div className="w-full flex justify-end items-center py-2">
            <button
              className="px-5 py-1 bg-black text-white rounded-lg outline-none"
              type="submit"
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
