import { Metadata } from "next";
import { WithAuthentication } from "../../../components/WithAuthentication";
import Articles from "./articles";

export const metadata: Metadata = {
  title: "readme - artikler",
};

export default function Page() {
  return (
    <WithAuthentication>
      <Articles />
    </WithAuthentication>
  );
}
