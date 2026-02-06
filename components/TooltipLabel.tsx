import { CircleQuestion } from "@gravity-ui/icons";
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
      <span className="inline align-middle mr-[2px]">{labelName}</span>
      <Tooltip content={tooltipText} className="max-w-[300px]">
        <CircleQuestion className="inline align-middle h-[14px] w-[14px] opacity-40" />
      </Tooltip>
    </>
  );
}
