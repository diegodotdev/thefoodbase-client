export default function Error() {
  return (
    <div className="w-full py-10 grid place-items-center">
      <p>
        Something went wrong,{" "}
        <span
          onClick={() => window.location.reload()}
          className="text-red-500 cursor-pointer"
        >
          refresh
        </span>{" "}
        the page to try again
      </p>
    </div>
  );
}
