import { NextPage } from "next";
import { Button, NumberInput } from "@heroui/react";
import { FC } from "react";
import { Xmark, File, ArrowUpFromSquare } from "@gravity-ui/icons";

interface FileInputProps {
  value: File | undefined;
  onChange: (file: File | undefined) => void;
  label?: string;
  isRequired: boolean;
  error?: boolean;
  errorMessage?: string | string[];
  isDisabled?: boolean;
  acceptFormat?: string;
}

export const FileInput: FC<FileInputProps> = ({
  value,
  onChange,
  label,
  isRequired,
  error,
  errorMessage,
  isDisabled,
  acceptFormat,
}) => {
  return (
    <div className={`flex flex-col w-full gap-[5px] ${error && "text-danger"}`}>
      {label && (
        <label
          className={`text-small font-medium ${
            isRequired && "after:content-['*'] after:text-danger"
          } ${isDisabled && "opacity-disabled"}`}
        >
          {label}
        </label>
      )}
      <div
        className={`w-full h-[150px]  ${
          error ? "bg-danger-50" : "bg-default-100"
        } rounded-medium ${isDisabled && "opacity-disabled"}`}
      >
        {!value ? (
          <>
            <label
              htmlFor="dropzone-file"
              className={`w-full h-full flex flex-col items-center justify-center cursor-pointer rounded-medium ${
                error ? "hover:bg-danger-100" : "hover:bg-default-200"
              }`}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                const file = e.dataTransfer.files[0];
                if (file) {
                  onChange(file);
                }
              }}
            >
              <ArrowUpFromSquare height={20} width={20} className="mb-2" />
              <span className="font-semibold">Trykk for å laste opp</span>
              <span>eller dra og slipp</span>
            </label>
            <input
              name="editionFile"
              id="dropzone-file"
              type="file"
              className="hidden"
              onChange={(event) =>
                onChange((event.currentTarget as any).files[0])
              }
              accept={acceptFormat}
              disabled={isDisabled}
            />
          </>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center">
            <File height={20} width={20} className="mb-2" />
            <span className="flex items-center gap-[5px]">
              <span className="truncate max-w-[220px] text-default-foreground">
                {value.name}
              </span>
              <Button
                isIconOnly
                variant="light"
                radius="full"
                onPress={() => onChange(undefined)}
                isDisabled={isDisabled}
                size="sm"
              >
                <Xmark />
              </Button>
            </span>
          </div>
        )}
      </div>
      {error && (
        <span className="text-tiny flex flex-col">
          {Array.isArray(errorMessage)
            ? errorMessage.map((error, i) => <span key={i}>{error}</span>)
            : errorMessage}
        </span>
      )}
    </div>
  );
};
