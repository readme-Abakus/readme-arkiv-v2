import { NextPage } from "next";
import Head from "next/head";
import { WithAuthentication } from "../../components/WithAuthentication";

import { getEditions } from "../../lib/Firebase/firebaseServersideAPIs";
import { IEditionData, IEdition } from "../../lib/types";

import {
  Button,
  Card,
  CardBody,
  Tooltip,
  Image,
  Link,
  Modal,
  ModalContent,
  ModalFooter,
  ModalBody,
  ModalHeader,
  useDisclosure,
  addToast,
} from "@heroui/react";
import { ROUTES } from "../../utils/routes";
import { useState } from "react";
import { deleteEdition } from "../../lib/Firebase/firebaseClientAPIs";

export async function getStaticProps() {
  return {
    props: {
      editionData: await getEditions(),
    },
  };
}

const Editions: NextPage<{ editionData: IEditionData[] }> = ({
  editionData,
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedEdition, setSelectedEdition] = useState<string | undefined>();

  const handleOpenDeleteModal = (edition: string) => {
    setSelectedEdition(edition);
    onOpen();
  };

  const handleDeleteEdition = (edition: string) => {
    deleteEdition(edition).then(() => {
      addToast({
        title: `Utgave ${edition} er slettet!`,
        description:
          "Merk at det kan ta 5-10 minutter før endringen er synlig på forsiden.",
        color: "success",
      });
    });
  };

  return (
    <>
      <Head>
        <title>readme - utgaver</title>
      </Head>
      <WithAuthentication>
        <div>
          <div className="flex flex-row place-content-between items-center px-1 mb-5">
            <h1 className="text-3xl font-bold text-default-foreground">
              Utgaver
            </h1>
            <Button
              color="primary"
              size="sm"
              radius="full"
              as={Link}
              href={ROUTES.NEW_EDITION}
              startContent={
                <span className="material-symbols-outlined md">add_2</span>
              }
            >
              Ny utgave
            </Button>
          </div>
          {editionData.map((year) => (
            <div className="flex flex-col gap-[10px] items-start mb-10">
              <h2 className="text-xl font-bold px-1">{year.year}</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-[15px]">
                {year.editions.map((edition, i) => (
                  <EditionCard
                    key={i}
                    year={year.year}
                    edition={edition}
                    onDeletePressed={() => {
                      handleOpenDeleteModal(`${year.year}-${edition.edition}`);
                    }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          onClose={() => setSelectedEdition(undefined)}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader>Slett utgave</ModalHeader>
                <ModalBody>
                  <p>Er du sikker på at du vil slette {selectedEdition}?</p>
                </ModalBody>
                <ModalFooter>
                  <Button color="default" onPress={onClose}>
                    Avbryt
                  </Button>
                  <Button
                    color="danger"
                    onPress={() => {
                      selectedEdition && handleDeleteEdition(selectedEdition);
                      onClose();
                    }}
                  >
                    Slett
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </WithAuthentication>
    </>
  );
};

const EditionCard: NextPage<{
  year: number;
  edition: IEdition;
  onDeletePressed: () => void;
}> = ({ year, edition, onDeletePressed }) => (
  <Card isFooterBlurred radius="sm" className="w-[400px]">
    <CardBody className="flex flex-row gap-[20px] items-center p-3">
      <Image src={edition.imageUrl} width={50} className="rounded-none" />
      <span className="font-bold grow">{`Utgave ${edition.edition}`}</span>
      <div className="flex gap-[10px] m-2">
        <Tooltip content="Åpne opp i ny fane" delay={1000}>
          <Button
            color="default"
            variant="bordered"
            isIconOnly
            startContent={
              <span className="material-symbols-outlined md">open_in_new</span>
            }
          />
        </Tooltip>
        <Tooltip content="Slett utgave" color="danger" delay={1000}>
          <Button
            color="danger"
            variant="flat"
            isIconOnly
            startContent={
              <span className="material-symbols-outlined md">delete</span>
            }
            onPress={onDeletePressed}
          />
        </Tooltip>
      </div>
    </CardBody>
  </Card>
);

export default Editions;
