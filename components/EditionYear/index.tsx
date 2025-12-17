import Image from "next/image";
import { FC } from "react";
import { IEditionData } from "../../lib/types";
import { ROUTES } from "../../utils/routes";
import { Divider } from "@heroui/react";

export const EditionYear: FC<{ data: IEditionData }> = ({ data }) => {
  return (
    <div className="my-[20px] max-w-[calc(3*230px)] w-full">
      <h2 className="text-3xl font-bold text-center">{data.year}</h2>
      <Divider className="mb-[20px] mt-[10px] h-[5px] rounded-[5px]" />
      <div className="flex flex-wrap gap-[30px] justify-center">
        {data.editions.map((edition) => (
          <a
            key={`${data.year}-${edition.edition}`}
            href={ROUTES.EDITION.replace(
              ":id",
              `${data.year}-${edition.edition}`
            )}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="hover:scale-110 transition-all duration-200 ease-in-out shadow-[5px_5px_12px_#888] dark:shadow-none"
              src={edition.imageUrl}
              height={setImageHeight(data.year, parseInt(edition.edition))}
              width={200}
              alt={`Forside på utgave ${data.year}-${edition.edition}`}
            />
          </a>
        ))}
      </div>
      <Divider className="my-[20px] h-[5px] rounded-[5px]" />
    </div>
  );
};

function setImageHeight(year: number, edition: number) {
  if (year >= 2018) {
    return 255.5;
  } else if (year > 2014 || (year === 2014 && edition > 1)) {
    return 253.5;
  } else {
    return 291.5;
  }
}
