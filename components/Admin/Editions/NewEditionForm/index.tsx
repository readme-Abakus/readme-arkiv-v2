import { NextPage } from "next";
import * as Yup from "yup";
import { INewEditionData, ISubmitEditionFunction } from "../../../../lib/types";
import { Formik } from "formik";
import { addEdition } from "../../../../lib/Firebase/firebaseClientAPIs";
import { PDFDocument } from "pdf-lib";
import {
  Alert,
  Button,
  Checkbox,
  Form,
  Link,
  NumberInput,
  Progress,
  Tooltip,
} from "@heroui/react";
import { FileInput } from "../FileInput";
import { ROUTES } from "../../../../utils/routes";
import { useEffect, useMemo } from "react";

const schema = Yup.object().shape({
  editionYear: Yup.number()
    .lessThan(3000, "Vi er ikke blitt så gamle ennå. Året må være før 3000.")
    .moreThan(1998, "readme ble grunnlagt i 1999, så dette er for tidlig.")
    .required("Utgaveår må fylles ut."),
  editionNumber: Yup.number()
    .lessThan(7, "Dette tallet kan ikke være høyere enn 6.")
    .moreThan(0, "Dette tallet må være høyere enn null.")
    .required("Utgavenummer må fylles ut."),
  editionFile: Yup.mixed()
    .required("Du må ha en utgave å laste opp!")
    .test(
      "file type",
      "Dette må være en PDF-fil",
      (value) =>
        value && value.name.endsWith(".pdf") && value.type === "application/pdf"
    ),
  listingslop: Yup.bool(),
});

const NewEditionForm: NextPage = () => {
  const handleSubmit: ISubmitEditionFunction = async (
    values,
    { setSubmitting, setStatus }
  ) => {
    const { editionYear, editionNumber, editionFile, listingslop } = values;
    const editionTitle = `${editionYear}-0${editionNumber}`;
    let fileToUpload = new File([editionFile as File], `${editionTitle}.pdf`, {
      type: (editionFile as File).type,
    });

    // Make sure we set the correct title metadata
    // As this is what chrome uses as the title for
    // When it displays the pdf in the browser
    const pdfFile = await PDFDocument.load(await fileToUpload.arrayBuffer());
    pdfFile.setTitle(editionTitle);
    fileToUpload = new File([await pdfFile.save()], `${editionTitle}.pdf`, {
      type: (editionFile as File).type,
    });

    await addEdition({ ...values, editionFile: fileToUpload }, (progress) =>
      setStatus({ progress: progress })
    )
      .then(() => setStatus({ success: true, progress: 100 }))
      .catch(() => setStatus({ error: true }));
  };

  const now = new Date();
  const year = now.getFullYear();

  let initialFormValues: INewEditionData = {
    editionYear: year,
    editionNumber: 1,
    editionFile: undefined,
    listingslop: false,
  };
  return (
    <Formik
      enableReinitialize
      validationSchema={schema}
      onSubmit={(values, actions) => handleSubmit(values, actions)}
      initialValues={initialFormValues}
      initialStatus={{
        success: false,
        error: false,
        progress: 0,
      }}
    >
      {({
        handleSubmit,
        handleChange,
        values,
        touched,
        isValid,
        errors,
        status,
        setStatus,
        isSubmitting,
        resetForm,
        setFieldValue,
      }) => {
        const disableForm = useMemo(
          () => isSubmitting || status.error || status.success,
          [isSubmitting, status.error, status.success]
        );

        return (
          <Form
            className="flex flex-col gap-[10px] w-[350px]"
            onSubmit={handleSubmit}
          >
            <div className="flex items-start gap-[20px] w-full">
              <NumberInput
                label="Utgaveår"
                labelPlacement="outside"
                name="editionYear"
                value={values.editionYear}
                onChange={(e) =>
                  setFieldValue(
                    "editionYear",
                    typeof e === "number" ? e : Number(e.target?.value)
                  )
                }
                errorMessage={errors.editionYear}
                isInvalid={!!errors.editionYear}
                formatOptions={{ useGrouping: false }}
                isDisabled={disableForm}
                className="flex-1"
                isRequired
              />
              <NumberInput
                label="Utgavenummer"
                labelPlacement="outside"
                name="editionNumber"
                value={values.editionNumber}
                onChange={(e) =>
                  setFieldValue(
                    "editionNumber",
                    typeof e === "number" ? e : Number(e.target?.value)
                  )
                }
                errorMessage={errors.editionNumber}
                isInvalid={!!errors.editionNumber}
                formatOptions={{ useGrouping: false }}
                isDisabled={disableForm}
                className="flex-1"
                isRequired
              />
            </div>
            <FileInput
              value={values.editionFile}
              onChange={(file) => setFieldValue("editionFile", file)}
              label="Utgave"
              error={!!errors.editionFile}
              errorMessage={
                typeof errors.editionFile === "string"
                  ? errors.editionFile
                  : undefined
              }
              isDisabled={disableForm}
              acceptFormat=".pdf"
              isRequired
            />
            <div className="flex items-center gap-[10px]">
              <Tooltip
                className="max-w-[400px]"
                content="Marker om en utgave inneholder en eller flere artikler om Listingløpet. Hvis ønsket kan disse skjules midlertidig fra forsiden via instillingen på '/admin' siden. "
              >
                <span className="text-small font-medium">
                  Listingløp utgave:
                </span>
              </Tooltip>
              <Checkbox
                name="listingslop"
                onChange={handleChange}
                checked={values.listingslop}
                isDisabled={disableForm}
              />
            </div>
            {disableForm ? (
              <Progress
                className="max-w-md"
                showValueLabel={true}
                size="md"
                value={status.progress}
              />
            ) : (
              <Button
                type="submit"
                variant="solid"
                color="primary"
                className="w-full mt-[20px]"
                radius="full"
                isDisabled={!isValid}
              >
                Last opp utgave
              </Button>
            )}
            {status.error ? (
              <Alert
                color="danger"
                title="Noe gikk galt!"
                description="Vent litt, og prøv igjen. Dersom problemet vedvarer, kontakt ansvarlig utvikler."
              >
                <Button
                  variant="flat"
                  color="danger"
                  className="mt-[10px]"
                  onPress={() => {
                    resetForm();
                    setStatus({
                      success: false,
                      error: false,
                      progress: 0,
                    });
                  }}
                >
                  Prøv igjen
                </Button>
              </Alert>
            ) : null}
            {status.success ? (
              <Alert
                color="success"
                title="Opplasting fullført!"
                description="Merk: det kan ta 5-10 minutter før utgaven dukker opp på forsiden! I mellomtiden kan du gjøre følgende:"
              >
                <div className="flex gap-[10px] mt-[10px]">
                  <Button
                    color="success"
                    variant="flat"
                    as={Link}
                    href={ROUTES.EDITION.replace(
                      ":id",
                      `${values.editionYear}-0${values.editionNumber}`
                    )}
                  >
                    Åpne utgave
                  </Button>
                  <Button
                    color="success"
                    variant="flat"
                    as={Link}
                    href={ROUTES.NEW_ARTICLE}
                  >
                    Legg til artikler
                  </Button>
                </div>
              </Alert>
            ) : null}
          </Form>
        );
      }}
    </Formik>
  );
};
export default NewEditionForm;
