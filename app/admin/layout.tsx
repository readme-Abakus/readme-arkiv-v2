"use client";

import { WithAuthentication } from "@/components/WithAuthentication";
import { Tab, Tabs } from "@heroui/react";
import { usePathname } from "next/navigation";
import { useEffect, useMemo } from "react";
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
              "group-data-[selected=true]:text-default-foreground text-default-500 font-semibold text-md flex",
          }}
        >
          <Tab
            key={ROUTES.EDITION_LIST}
            href={ROUTES.EDITION_LIST}
            title={
              <>
                <span className="material-symbols-rounded md mr-1">book_5</span>
                Utgaver
              </>
            }
          />
          <Tab
            key={ROUTES.ARTICLE_LIST}
            href={ROUTES.ARTICLE_LIST}
            title={
              <>
                <span className="material-symbols-rounded md mr-1">
                  text_snippet
                </span>
                Artikler
              </>
            }
          />
          <Tab
            key={ROUTES.SETTINGS}
            href={ROUTES.SETTINGS}
            title={
              <>
                <span className="material-symbols-rounded md mr-1">
                  settings
                </span>
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
