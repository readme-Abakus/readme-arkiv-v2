import Head from "next/head";
import Image from "next/image";
import { Fade } from "react-bootstrap";

const Oppskrifter = () => {
  return (
    <Fade appear in>
      <div>
        <Head>
          <title>readme - Oppskrifter</title>
        </Head>

        <p><a href="https://www.ethanchlebowski.com/cooking-techniques-recipes/lower-calorie-butter-chicken">Butter Chicken</a></p>
        <p><a href="https://www.cookwell.com/recipe/marcella-hazan-s-3-ingredient-tomato-sauce">Tomatsaus</a></p>
      </div>
    </Fade>
  );
};

export default Oppskrifter;
