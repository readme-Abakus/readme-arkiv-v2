"use client";

import { ArrowLeft } from "@gravity-ui/icons";
import { Button, Link } from "@heroui/react";

interface IProps {
  title: string;
  backButtonRoute?: string;
  endContent?: React.ReactNode;
}

export default function PageHeader(props: IProps) {
  return (
    <div className="flex place-content-between items-center w-full">
      <div className="flex items-center gap-2">
        {props.backButtonRoute && (
          <Button
            isIconOnly
            variant="light"
            as={Link}
            href={props.backButtonRoute}
          >
            <ArrowLeft className="h-[28px] w-[28px]" />
          </Button>
        )}
        <h1 className="text-3xl font-bold text-default-foreground ">
          {props.title}
        </h1>
      </div>
      {props.endContent}
    </div>
  );
}
