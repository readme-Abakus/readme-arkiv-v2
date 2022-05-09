import Image from "next/image";
import { Fade } from "react-bootstrap";

import redaktør from "../public/images/redaktør.png";

export default function Custom404() {
  return (
    <Fade appear in>
      <div>
        <Image src={redaktør} alt="Forvirret redaktør" />
        <h1>404</h1>
        <h4>Oups! Vi finner visst ikke den siden.</h4>
      </div>
    </Fade>
  );
}
