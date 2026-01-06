import { Metadata } from "next";
import Head from "next/head";

export const metadata: Metadata = {
  title: "readme - Oppskrifter",
};

export default function Page() {
  return (
    <div>
      <p>
        <a href="https://www.ethanchlebowski.com/cooking-techniques-recipes/lower-calorie-butter-chicken">
          Butter Chicken
        </a>
      </p>
      <p>
        <a href="https://www.cookwell.com/recipe/marcella-hazan-s-3-ingredient-tomato-sauce">
          Tomatsaus
        </a>
      </p>
    </div>
  );
}
