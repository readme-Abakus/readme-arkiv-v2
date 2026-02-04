import { Metadata } from "next";
import { WithAuthentication } from "@/components/WithAuthentication";
import ArticlesHeading from "./_components/ArticlesHeading";
import ArticleOverview from "./_components/ArticlesOverview";

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
