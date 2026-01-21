import Head from "next/head";
import Image from "next/image";
import drikkelek from "../public/images/drikkelek.png";

const Drikkelek = () => {
  return (
    <div>
      <Head>
        <title>readme - drikkelek</title>
      </Head>

      <Image src={drikkelek} alt="drikkelek" />
    </div>
  );
};

export default Drikkelek;
