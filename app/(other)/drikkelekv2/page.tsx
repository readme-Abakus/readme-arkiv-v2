import Image from "next/image";
import drikkelek from "../../../public/images/100spm.png";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "readme - drikkelek",
};

export default function Page() {
  return (
    <div>
      <Image src={drikkelek} alt="drikkelek" />
    </div>
  );
}
