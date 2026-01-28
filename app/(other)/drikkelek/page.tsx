import Image from "next/image";
import drikkelek from "../../../public/images/drikkelek.png";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "readme - drikkelek",
};

export default function Page() {
  return (
    <div className="max-w-80">
      <Image src={drikkelek} alt="drikkelek" />
    </div>
  );
}
