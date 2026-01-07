import { Metadata } from "next";
import { WithAuthentication } from "@/components/WithAuthentication";
import ArticlesHeading from "./ArticlesHeading";
import ArticleOverview from "./ArticlesOverview";

export const metadata: Metadata = {
  title: "readme - artikler",
};

export default function Page() {
  return (
    <WithAuthentication>
      <ArticlesHeading />
      <ArticleOverview />
    </WithAuthentication>
  );
}
