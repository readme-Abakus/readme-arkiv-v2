import Image from "next/image";
import abapol from "../../../public/images/abapol.jpg";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "readme - Abapol",
};

export default function Page() {
  return (
    <div>
      <Image src={abapol} alt="abapol" />
    </div>
  );
}
