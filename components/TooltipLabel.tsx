import { Tooltip } from "@heroui/react";

export default function TooltipLabel({
  labelName,
  tooltipText,
}: {
  labelName: string;
  tooltipText: string;
}) {
  return (
    <>
      {labelName}
      <Tooltip content={tooltipText} className="max-w-[300px]">
        <span className="material-symbols-rounded sm opacity-40 align-bottom ml-1">
          help
        </span>
      </Tooltip>
    </>
  );
}
