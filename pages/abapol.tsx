import Head from "next/head";
import Image from "next/image";
import { Fade } from "react-bootstrap";

import abapol from "../public/images/abapol.jpg";

const Abapol = () => {
  return (
    <Fade appear in>
      <div>
        <Head>
          <title>readme - Abapol</title>
        </Head>

        <Image src={abapol} alt="abapol" />
      </div>
    </Fade>
  );
};

export default Abapol;
