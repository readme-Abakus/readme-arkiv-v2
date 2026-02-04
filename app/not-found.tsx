import Image from "next/image";
import redaktør from "../public/images/redaktør.png";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "readme - 404",
};

export default function NotFound() {
  return (
    <div className="flex flex-col items-center gap-3">
      <Image src={redaktør} alt="Forvirret redaktør" />
      <h1 className="text-3xl font-bold text-default-foreground">404</h1>
      <p>Oups! Vi finner visst ikke den siden.</p>
    </div>
  );
}
