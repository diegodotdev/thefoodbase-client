import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
} from "@clerk/clerk-react";
import { Link } from "react-router-dom";

export default function Nav() {
  const LINKS = [
    { id: 1, label: "Home", href: "/" },
    { id: 2, label: "Categories", href: "/categories" },
    { id: 3, label: "Recipes", href: "/recipes" },
  ];

  return (
    <header className="w-full h-[10vh] flex justify-between items-center">
      <Link to="/">
        <span className="text-4xl font-[lobster]">TheFoodbase</span>
      </Link>
      <nav className="flex items-center gap-10">
        {LINKS.map((i) => (
          <Link to={i.href} key={i.id}>
            <span>{i.label}</span>
          </Link>
        ))}
        <SignedIn>
          <Link to="/create-recipe">
            <span>Create Recipe</span>
          </Link>
          <SignOutButton>
            <button className="px-5 py-1 rounded-lg bg-red-400 text-white">
              Sign Out
            </button>
          </SignOutButton>
        </SignedIn>
        <SignedOut>
          <SignInButton mode="modal">
            <button className="px-5 py-1 rounded-lg bg-black text-white">
              Sign In
            </button>
          </SignInButton>
        </SignedOut>
      </nav>
    </header>
  );
}
