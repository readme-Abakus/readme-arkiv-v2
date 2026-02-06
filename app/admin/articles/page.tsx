import { Metadata } from "next";
import ArticlesHeading from "./_components/ArticlesHeading";
import ArticleOverview from "./_components/ArticlesOverview";

export const metadata: Metadata = {
  title: "readme - artikler",
};

export default function Page() {
  return (
    <div className="flex flex-col items-left gap-5 w-full">
      <ArticlesHeading />
      <ArticleOverview />
    </div>
  );
}
