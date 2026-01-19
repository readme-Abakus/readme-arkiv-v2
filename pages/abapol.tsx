import Head from "next/head";
import Image from "next/image";

import abapol from "../public/images/abapol.jpg";

const Abapol = () => {
  return (
    <div>
      <Head>
        <title>readme - Abapol</title>
      </Head>

      <Image src={abapol} alt="abapol" />
    </div>
  );
};

export default Abapol;
