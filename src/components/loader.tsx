import { Loader as LoadingIcon } from "lucide-react";

export default function Loader() {
  return (
    <div className="w-full py-10 grid place-items-center">
      <LoadingIcon size="15px" className="animate-spin" />
    </div>
  );
}
