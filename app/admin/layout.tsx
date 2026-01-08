"use client";

import { WithAuthentication } from "@/components/WithAuthentication";
import { BookOpen, FileText, Gear } from "@gravity-ui/icons";
import { Tab, Tabs } from "@heroui/react";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { ROUTES } from "utils/routes";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const currentTab = useMemo(() => {
    if (pathname.includes(ROUTES.ARTICLE_LIST)) return ROUTES.ARTICLE_LIST;
    if (pathname.includes(ROUTES.EDITION_LIST)) return ROUTES.EDITION_LIST;
    return pathname;
  }, [pathname]);

  return (
    <WithAuthentication>
      <div className="max-w-[1200px] w-full -mt-5">
        <Tabs
          radius="full"
          color="primary"
          variant="underlined"
          selectedKey={currentTab}
          classNames={{
            base: "w-full mb-5",
            tabList:
              "gap-7 w-full relative rounded-none p-0 border-b border-divider",
            tab: "max-w-fit px-0 h-12",
            tabContent:
              "group-data-[selected=true]:text-default-foreground text-default-500 font-semibold flex gap-[6px] items-center",
          }}
        >
          <Tab
            key={ROUTES.EDITION_LIST}
            href={ROUTES.EDITION_LIST}
            title={
              <>
                <BookOpen />
                Utgaver
              </>
            }
          />
          <Tab
            key={ROUTES.ARTICLE_LIST}
            href={ROUTES.ARTICLE_LIST}
            title={
              <>
                <FileText />
                Artikler
              </>
            }
          />
          <Tab
            key={ROUTES.SETTINGS}
            href={ROUTES.SETTINGS}
            title={
              <>
                <Gear />
                Instillinger
              </>
            }
          />
        </Tabs>
        {children}
      </div>
    </WithAuthentication>
  );
}
