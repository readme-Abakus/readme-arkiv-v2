import Head from "next/head";
import Image from "next/image";
import { Fade } from "react-bootstrap";

import drikkelek from "../public/images/drikkelek.png";

const Drikkelek = () => {
  return (
    <Fade appear in>
      <div>
        <Head>
          <title>readme - drikkelek</title>
        </Head>

        <Image src={drikkelek} alt="drikkelek" />
      </div>
    </Fade>
  );
};

export default Drikkelek;
