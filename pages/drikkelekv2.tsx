import Head from "next/head";
import Image from "next/image";

import drikkelek from "../public/images/100spm.png";

const DrikkelekV2 = () => {
  return (
    <div>
      <Head>
        <title>readme - drikkelek</title>
      </Head>

      <Image src={drikkelek} alt="drikkelek" />
    </div>
  );
};

export default DrikkelekV2;
