import { FC, ClipboardEvent } from "react";

import { Formik } from "formik";
import * as Yup from "yup";
import { Form, Col, Button, Alert, Fade, Row } from "react-bootstrap";

import { SubmitButton } from "../../Common/SubmitButton";
import { ISubmitArticleFunction, IEditArticle } from "../../../../lib/types";

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
      .matches(new RegExp("^[0-9]+(,\\s{1}[0-9]+)*$"))
      .required("Artikkelen må ha sidetall, og de må oppgis på rett form."),
    tags: Yup.string().matches(new RegExp("^[\\S]+(,\\s{1}[\\S]+)*$")),
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
          <Fade appear in>
            <Form onSubmit={handleSubmit}>
              <Row>
                <Form.Group as={Col}>
                  <Form.Label>Tittel</Form.Label>
                  <Form.Control
                    placeholder="Tittel"
                    type="text"
                    name="title"
                    value={values.title}
                    onChange={handleChange}
                    isValid={touched.title && !errors.title}
                    isInvalid={!!errors.title}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.title}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>
              <Row>
                <Form.Group as={Col}>
                  <Form.Label>Skribent</Form.Label>
                  <Form.Control
                    placeholder="Skribent"
                    type="text"
                    name="author"
                    value={values.author}
                    onChange={handleChange}
                    isValid={touched.author && !errors.author}
                    isInvalid={!!errors.author}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.author}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>Spalte</Form.Label>
                  <Form.Control
                    placeholder="Spalte"
                    type="text"
                    name="type"
                    value={values.type}
                    onChange={handleChange}
                    isValid={touched.type && !errors.type}
                    isInvalid={!!errors.type}
                  />
                </Form.Group>
              </Row>
              <Row>
                <Form.Group as={Col}>
                  <Form.Label>Layout</Form.Label>
                  <Form.Control
                    placeholder="Layout"
                    type="text"
                    name="layout"
                    value={values.layout}
                    onChange={handleChange}
                    isValid={touched.layout && !errors.layout}
                    isInvalid={!!errors.layout}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.layout}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col}>
                  <Form.Label>Foto</Form.Label>
                  <Form.Control
                    placeholder="Foto"
                    type="text"
                    name="photo"
                    value={values.photo}
                    onChange={handleChange}
                    isValid={touched.photo && !errors.photo}
                    isInvalid={!!errors.photo}
                  />
                </Form.Group>
              </Row>
              <Row>
                <Form.Group as={Col}>
                  <Form.Label>Utgaveår</Form.Label>
                  <Form.Control
                    placeholder="Utgaveår"
                    type="number"
                    name="editionYear"
                    value={values.editionYear}
                    onChange={handleChange}
                    isValid={touched.editionYear && !errors.editionYear}
                    isInvalid={!!errors.editionYear}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.editionYear}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>Utgavenummer</Form.Label>
                  <Form.Control
                    placeholder="Utgavenummer"
                    type="number"
                    name="editionNumber"
                    value={values.editionNumber}
                    onChange={handleChange}
                    isValid={touched.editionNumber && !errors.editionNumber}
                    isInvalid={!!errors.editionNumber}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.editionNumber}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>
              <Row>
                <Form.Group as={Col}>
                  <Form.Label>Tekst</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={5}
                    name="content"
                    value={values.content}
                    onChange={handleChange}
                    onPaste={(event: ClipboardEvent<HTMLTextAreaElement>) =>
                      onPaste(event)
                    }
                    isValid={touched.content && !errors.content}
                    isInvalid={!!errors.content}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.content}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>
              <Row>
                <Form.Group as={Col}>
                  <Form.Label>Sidetall</Form.Label>
                  <Form.Control
                    placeholder="Sidetall"
                    type="text"
                    name="pages"
                    value={values.pages}
                    onChange={handleChange}
                    isValid={touched.pages && !errors.pages}
                    isInvalid={!!errors.pages}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.pages}
                  </Form.Control.Feedback>
                  <Form.Text className="text-muted">
                    Skriv inn som en liste med tall, separert med komma og
                    mellomrom: &quot;10, 12, 13&qout;
                    <br />
                    <i>Merk at dette er sidetall iht. utgaveplanen.</i>
                  </Form.Text>
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>Tags</Form.Label>
                  <Form.Control
                    placeholder="Tags"
                    type="text"
                    name="tags"
                    value={values.tags}
                    onChange={handleChange}
                    isValid={touched.tags && !errors.tags}
                    isInvalid={!!errors.tags}
                  />
                  <Form.Text className="text-muted">
                    Skriv inn som en liste med ord som beskriver artikkelens
                    innhold, separert med komma og mellomrom: &qout;hei, på,
                    deg&qout;
                  </Form.Text>
                </Form.Group>
              </Row>
              <SubmitButton
                isValid={isValid}
                isSubmitting={isSubmitting}
                buttonText={
                  !article ? "Legg til artikkel" : "Oppdater artikkel"
                }
              />

              {status.error ? (
                <Alert variant="warning">
                  Oups!
                  <br />
                  Noe gikk galt. Husket du å laste opp PDF-en først? Man kan
                  ikke opprette en artikkel uten tilhørende utgave i databasen.
                  <hr />
                  <div className="d-flex justify-content-end">
                    <Button
                      variant="secondary"
                      onClick={() => {
                        resetForm();
                        setStatus({ success: false, error: false });
                      }}
                    >
                      Tøm skjema
                    </Button>
                  </div>
                </Alert>
              ) : null}
              {status.success ? (
                <Alert variant="primary">
                  Opplasting fullført!
                  <br />
                  Du kan nå legge til en ny artikkel, om du vil det.
                  {!article ? (
                    <>
                      <hr />
                      <div className="d-flex justify-content-end">
                        <Button
                          variant="secondary"
                          onClick={() => {
                            resetForm({
                              values: {
                                ...initialFormValues,
                                editionYear: values.editionYear,
                                editionNumber: values.editionNumber,
                              },
                            });
                            setStatus({ success: false });
                          }}
                        >
                          Tøm skjema
                        </Button>
                      </div>
                    </>
                  ) : null}
                </Alert>
              ) : null}
            </Form>
          </Fade>
        );
      }}
    </Formik>
  );
};
