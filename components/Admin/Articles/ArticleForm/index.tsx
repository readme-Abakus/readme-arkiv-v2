import { FC, ClipboardEvent } from "react";

import { Formik } from "formik";
import * as Yup from "yup";
import { ISubmitArticleFunction, IEditArticle } from "../../../../lib/types";
import {
  Alert,
  Autocomplete,
  AutocompleteItem,
  Button,
  Form,
  Input,
  NumberInput,
  Textarea,
} from "@heroui/react";
import { TooltipLabel } from "../../Common/TooltipLabel";

interface ArticleFormProps {
  doHandleSubmit: ISubmitArticleFunction;
  article?: IEditArticle;
}

export const ArticleForm: FC<ArticleFormProps> = ({
  doHandleSubmit,
  article,
}) => {
  const {
    title,
    type,
    author,
    layout,
    photo,
    editionYear,
    editionNumber,
    content,
    pages,
    tags,
  } = article || {};
  const schema = Yup.object({
    title: Yup.string().required("Artikkelen må ha en tittel"),
    type: Yup.string(),
    author: Yup.string().required("Noen har vel skrevet dette?"),
    layout: Yup.string().required("Hvem skal ha æren?"),
    photo: Yup.string(),
    editionYear: Yup.number()
      .lessThan(3000, "Vi er ikke blitt så gamle ennå. Året må være før 3000.")
      .moreThan(1998, "readme ble grunnlagt i 1999, så dette er for tidlig.")
      .required("Utgaveår må fylles ut."),
    editionNumber: Yup.number()
      .lessThan(7, "Dette tallet kan ikke være høyere enn 6.")
      .moreThan(0, "Dette tallet må være høyere enn null.")
      .required("Utgavenummer må fylles ut."),
    content: Yup.string().required("Artikkelen må ha noe innhold."),
    pages: Yup.string()
      .matches(
        new RegExp("^[0-9]+(,\\s{1}[0-9]+)*$"),
        'Skriv inn som en liste med tall, separert med komma og mellomrom: "10, 12, 13".'
      )
      .required("Artikkelen må ha sidetall, og de må oppgis på rett form."),
    tags: Yup.string().matches(
      new RegExp("^[\\S]+(,\\s{1}[\\S]+)*$"),
      'Skriv inn som en liste med ord som beskriver artikkelens innhold, separert med komma og mellomrom: "hei, på, deg".'
    ),
  });

  const now = new Date();
  const year = now.getFullYear();

  const initialFormValues = {
    title: title || "",
    type: type || "",
    author: author || "",
    layout: layout || "",
    photo: photo || "",
    editionYear: editionYear || year,
    editionNumber: editionNumber || 1,
    content: content || "",
    pages: pages || "",
    tags: tags || "",
  };

  const columnSuggestions = [
    "Leder",
    "Side 3",
    "Gløsløken",
    "Utgavens master",
    "Siving",
    "Ikke-Siving",
    "Redaksjonen Anbefaler",
    "Konkurranse",
    "Smått & Nett",
  ];

  const columnSuggestionItems = columnSuggestions.map((item) => ({
    key: item,
    value: item,
  }));

  return (
    <Formik
      enableReinitialize
      validationSchema={schema}
      onSubmit={(values, actions) =>
        doHandleSubmit(values as IEditArticle, actions)
      }
      initialStatus={{ success: false, error: false }}
      initialValues={initialFormValues}
    >
      {({
        handleSubmit,
        handleChange,
        handleBlur,
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
        const disabled = isSubmitting || status.error || status.success;

        function onPaste(event: ClipboardEvent<HTMLTextAreaElement>) {
          event.preventDefault();
          const cursorPosition = event.currentTarget.selectionStart ?? 0;
          const text = event.clipboardData.getData("text");
          const trimmedText = text
            .replace(/\s+/g, " ")
            .replace(/\.^(?!\.\s)/g, ". ")
            .replace(/,^(?!\.\s)/g, ", ")
            .replace(/!^(?!!\s)/g, ", ")
            .replace(/\?^(?!\?\s)/g, ", ")
            .trim();
          const currentText = values.content;
          let textToSet: string;
          if (currentText) {
            textToSet = [
              currentText.slice(0, cursorPosition),
              trimmedText,
              currentText.slice(cursorPosition),
            ].join("");
          } else {
            textToSet = trimmedText;
          }
          setFieldValue("content", textToSet);
        }

        return (
          <Form
            onSubmit={handleSubmit}
            className="flex flex-col gap-[15px] w-[600px] items-center"
          >
            <div className="flex gap-[25px] w-full">
              <Input
                label="Tittel"
                labelPlacement="outside"
                placeholder="Tittel"
                name="title"
                value={values.title}
                onChange={handleChange}
                onBlur={handleBlur}
                isDisabled={disabled}
                isInvalid={touched.title && !!errors.title}
                errorMessage={errors.title}
                isRequired
              />
              <Autocomplete
                label={
                  <TooltipLabel
                    labelName="Spalte"
                    tooltipText="Spalten kan være et av forslagene fra listen eller egendefinert ved å skrive inn i feltet."
                  />
                }
                labelPlacement="outside"
                placeholder="Spalte"
                name="type"
                inputValue={values.type}
                onInputChange={(value) => {
                  setFieldValue("type", value);
                }}
                onBlur={handleBlur}
                isDisabled={disabled}
                isInvalid={touched.type && !!errors.type}
                errorMessage={errors.type}
                allowsCustomValue
                defaultItems={columnSuggestionItems}
              >
                {(item) => (
                  <AutocompleteItem key={item.key}>
                    {item.value}
                  </AutocompleteItem>
                )}
              </Autocomplete>
            </div>
            <div className="flex gap-[25px] w-full">
              <NumberInput
                label="Utgaveår"
                labelPlacement="outside"
                placeholder="Utgaveår"
                name="editionYear"
                value={values.editionYear}
                onChange={(e) =>
                  setFieldValue(
                    "editionYear",
                    typeof e === "number" ? e : Number(e.target?.value)
                  )
                }
                onBlur={handleBlur}
                isDisabled={disabled}
                isInvalid={touched.editionYear && !!errors.editionYear}
                errorMessage={errors.editionYear}
                formatOptions={{ useGrouping: false }}
                isRequired
              />
              <NumberInput
                label="Utgavenummer"
                labelPlacement="outside"
                placeholder="Utgavenummer"
                name="editionNumber"
                value={values.editionNumber}
                onChange={(e) =>
                  setFieldValue(
                    "editionNumber",
                    typeof e === "number" ? e : Number(e.target?.value)
                  )
                }
                onBlur={handleBlur}
                isDisabled={disabled}
                isInvalid={touched.editionNumber && !!errors.editionNumber}
                errorMessage={errors.editionNumber}
                formatOptions={{ useGrouping: false }}
                isRequired
              />
            </div>
            <Input
              label="Skribent"
              labelPlacement="outside"
              placeholder="Skribent"
              name="author"
              value={values.author}
              onChange={handleChange}
              onBlur={handleBlur}
              isDisabled={disabled}
              isInvalid={touched.author && !!errors.author}
              errorMessage={errors.author}
              isRequired
            />
            <Input
              label="Layout"
              labelPlacement="outside"
              placeholder="Layout"
              name="layout"
              value={values.layout}
              onChange={handleChange}
              onBlur={handleBlur}
              isDisabled={disabled}
              isInvalid={touched.layout && !!errors.layout}
              errorMessage={errors.layout}
              isRequired
            />
            <Input
              label="Foto"
              labelPlacement="outside"
              placeholder="Foto"
              name="photo"
              value={values.photo}
              onChange={handleChange}
              onBlur={handleBlur}
              isDisabled={disabled}
              isInvalid={touched.photo && !!errors.photo}
              errorMessage={errors.photo}
            />
            <Textarea
              label="Tekst"
              labelPlacement="outside"
              placeholder="Tekst"
              name="content"
              value={values.content}
              onChange={handleChange}
              onBlur={handleBlur}
              isDisabled={disabled}
              isInvalid={touched.content && !!errors.content}
              errorMessage={errors.content}
              isRequired
            />
            <div className="flex gap-[25px] w-full">
              <Input
                label={
                  <TooltipLabel
                    labelName="Sidetall"
                    tooltipText='Skriv inn som en liste med tall, separert med komma og mellomrom: "10, 12, 13".'
                  />
                }
                labelPlacement="outside"
                placeholder="Sidetall"
                name="pages"
                value={values.pages}
                onChange={handleChange}
                onBlur={handleBlur}
                isDisabled={disabled}
                isInvalid={touched.pages && !!errors.pages}
                errorMessage={errors.pages}
                isRequired
              />
              <Input
                label={
                  <TooltipLabel
                    labelName="Tags"
                    tooltipText='Skriv inn som en liste med ord som beskriver artikkelens
                  innhold, separert med komma og mellomrom: "hei, på, deg".'
                  />
                }
                labelPlacement="outside"
                placeholder="Tags"
                name="tags"
                value={values.tags}
                onChange={handleChange}
                onBlur={handleBlur}
                isDisabled={disabled}
                isInvalid={touched.tags && !!errors.tags}
                errorMessage={errors.tags}
              />
            </div>
            <Button
              type="submit"
              variant="solid"
              color="primary"
              className="w-[200px] mt-[20px]"
              radius="full"
              isDisabled={!isValid || disabled}
              isLoading={isSubmitting}
            >
              {isSubmitting
                ? "Laster"
                : !article
                  ? "Legg til artikkel"
                  : "Oppdater artikkel"}
            </Button>
            {status.error && (
              <Alert
                color="danger"
                title="Oups!"
                description="Noe gikk galt. Husket du å laste opp PDF-en først? Man kan ikke opprette en artikkel uten tilhørende utgave i databasen."
                endContent={
                  <Button
                    variant="flat"
                    color="danger"
                    className="min-w-[110px]"
                    onPress={() => {
                      resetForm();
                      setStatus({ success: false, error: false });
                    }}
                  >
                    Tøm skjema
                  </Button>
                }
              />
            )}
            {status.success && (
              <Alert
                color="success"
                title="Artikkel er lagt til!"
                description="Tøm skjemaet dersom du ønsker å legge til enda en artikkel."
                endContent={
                  <Button
                    variant="flat"
                    color="success"
                    className="min-w-[110px]"
                    onPress={() => {
                      resetForm();
                      setStatus({ success: false });
                    }}
                  >
                    Tøm skjema
                  </Button>
                }
              />
            )}
          </Form>
        );
      }}
    </Formik>
  );
};
