import {
  addToast,
  Button,
  ButtonGroup,
  Chip,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
} from "@heroui/react";
import { FC, Key, useState } from "react";
import { ROUTES } from "../../../utils/routes";
import {
  deleteArticle,
  getPageNumber,
} from "../../../lib/Firebase/firebaseClientAPIs";
import { IArticle } from "../../../lib/types";
import React from "react";
import { useArticleList } from "../../../lib/Firebase/hooks";

export const ArticleOverview: FC = () => {
  const [data, loading, error, pageNum, nextPage, prevPage] = useArticleList();

  const [deleteModalActiveArticle, setDeleteModalActiveArticle] = useState<
    IArticle | undefined
  >();
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);

  const handleDeleteActiveArticle = () => {
    setIsDeleteLoading(true);
    deleteModalActiveArticle &&
      deleteArticle(deleteModalActiveArticle.id).then(() => {
        addToast({
          title: (
            <p>
              Artikkelen{" "}
              <span className="italic">{deleteModalActiveArticle.title}</span>{" "}
              er slettet!
            </p>
          ),
          color: "success",
        });
        setIsDeleteLoading(false);
        setDeleteModalActiveArticle(undefined);
      });
  };

  const renderCell = React.useCallback((article: IArticle, columnKey: Key) => {
    switch (columnKey) {
      case "edition":
        return (
          <Chip color="primary" size="sm" variant="flat">
            {article.edition}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-[2px]">
            <Tooltip content="Åpne artikkel i utgave">
              <Button
                isIconOnly
                radius="full"
                variant="light"
                size="sm"
                as={Link}
                href={
                  ROUTES.EDITION.replace(":id", article.edition) +
                  `#page=${getPageNumber(article)}`
                }
                className="text-foreground-500"
                startContent={
                  <span className="material-symbols-rounded md">
                    open_in_new
                  </span>
                }
              ></Button>
            </Tooltip>
            <Tooltip content="Rediger artikkel">
              <Button
                isIconOnly
                radius="full"
                variant="light"
                size="sm"
                as={Link}
                href={ROUTES.EDIT_ARTICLE.replace(":id", article.id)}
                className="text-foreground-500"
                startContent={
                  <span className="material-symbols-rounded md">edit</span>
                }
              ></Button>
            </Tooltip>
            <Tooltip color="danger" content="Slett artikkel">
              <Button
                isIconOnly
                radius="full"
                variant="light"
                size="sm"
                color="danger"
                onPress={() => setDeleteModalActiveArticle(article)}
                startContent={
                  <span className="material-symbols-rounded md">delete</span>
                }
              ></Button>
            </Tooltip>
          </div>
        );
      default:
        return article[columnKey as keyof IArticle];
    }
  }, []);

  return (
    <>
      <Table
        aria-label="Artikkel tabell"
        isStriped
        classNames={{
          wrapper: "shadow-none p-0 rounded-sm",
        }}
      >
        <TableHeader>
          <TableColumn key={"title"}>Tittel</TableColumn>
          <TableColumn key={"edition"} width={90}>
            Utgave
          </TableColumn>
          <TableColumn key={"author"} className="hidden sm:table-cell">
            Forfatter
          </TableColumn>
          <TableColumn key={"layout"} className="hidden sm:table-cell">
            Layout
          </TableColumn>
          <TableColumn key={"actions"} width={50} align="center">
            Handlinger
          </TableColumn>
        </TableHeader>
        <TableBody
          items={data ?? []}
          isLoading={loading}
          loadingContent={<Spinner color="primary"></Spinner>}
        >
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell
                  className={
                    columnKey == "author" || columnKey == "layout"
                      ? "hidden sm:table-cell"
                      : ""
                  }
                >
                  {renderCell(item, columnKey)}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <ButtonGroup size="sm" color="primary" radius="full">
        <Button
          onPress={prevPage}
          isDisabled={pageNum === 0}
          startContent={
            <span className="material-symbols-rounded md">arrow_back</span>
          }
        >
          Forrige
        </Button>
        <Button
          onPress={nextPage}
          endContent={
            <span className="material-symbols-rounded md">arrow_forward</span>
          }
        >
          Neste
        </Button>
      </ButtonGroup>
      <Modal
        isOpen={!!deleteModalActiveArticle}
        onClose={() => setDeleteModalActiveArticle(undefined)}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Slett artikkel</ModalHeader>
              <ModalBody>
                <span>
                  Er du sikker på at du vil slette artikkelen{" "}
                  <span className="italic">
                    {deleteModalActiveArticle?.title}
                  </span>
                  ?
                </span>
              </ModalBody>
              <ModalFooter>
                <Button color="default" onPress={onClose}>
                  Avbryt
                </Button>
                <Button
                  color="danger"
                  onPress={handleDeleteActiveArticle}
                  isLoading={isDeleteLoading}
                >
                  Slett
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
