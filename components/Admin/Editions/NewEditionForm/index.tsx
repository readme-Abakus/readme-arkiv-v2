import { NextPage } from "next";
import * as Yup from "yup";
import {
  Alert,
  Button,
  Col,
  Fade,
  Form,
  ProgressBar,
  Row,
} from "react-bootstrap";
import styles from "./NewEdition.module.css";
import { INewEditionData, ISubmitEditionFunction } from "../../../../lib/types";
import { Formik } from "formik";
import { SubmitButton } from "../../Common/SubmitButton";
import { addEdition } from "../../../../lib/Firebase/firebaseClientAPIs";
import { PDFDocument } from "pdf-lib";

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

    // Make sure we set the correc title metadata
    // As this is what chrome uses as the title for
    // When it displays the pdf in the browser
    const pdfFile = await PDFDocument.load(await fileToUpload.arrayBuffer());
    pdfFile.setTitle(editionTitle);
    fileToUpload = new File([await pdfFile.save()], `${editionTitle}.pdf`, {
      type: (editionFile as File).type,
    });

    setSubmitting(true);
    addEdition(
      { ...values, editionFile: fileToUpload },
      () => {
        setSubmitting(false);
        setStatus({ success: true, progress: 100 });
      },
      () => setStatus({ error: true }),
      (progress) => setStatus({ progress: progress })
    );
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
        return (
          <Fade appear in>
            <Form className={styles.editionForm} onSubmit={handleSubmit}>
              <Row className={styles.formRow}>
                <Form.Group as={Col}>
                  <Form.Label>Utgaveår</Form.Label>
                  <Form.Control
                    placeholder='Utgaveår'
                    type='number'
                    name='editionYear'
                    value={values.editionYear}
                    onChange={handleChange}
                    isValid={touched.editionYear && !errors.editionYear}
                    isInvalid={!!errors.editionYear}
                  />
                  <Form.Control.Feedback type='invalid'>
                    {errors.editionYear}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>Utgavenummer</Form.Label>
                  <Form.Control
                    placeholder='Utgavenummer'
                    type='number'
                    name='editionNumber'
                    value={values.editionNumber}
                    onChange={handleChange}
                    isValid={touched.editionNumber && !errors.editionNumber}
                    isInvalid={!!errors.editionNumber}
                  />
                  <Form.Control.Feedback type='invalid'>
                    {errors.editionNumber}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>
              <Row className={styles.formRow}>
                <Form.Group>
                  <Form.Control
                    name='editionFile'
                    type='file'
                    onChange={(event) => {
                      const newValues = { ...values }; // copy the original object
                      newValues.editionFile = (
                        event.currentTarget as any
                      ).files[0];
                      setFieldValue("editionFile", newValues.editionFile);
                    }}
                  ></Form.Control>
                  <Form.Control.Feedback type='invalid'>
                    {errors.editionFile}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>
              <Form.Group>
                <Form.Check
                  className={styles.checkbox}
                  type='switch'
                  name='listingslop'
                  label='Listingsløputgave'
                  onChange={handleChange}
                  id='validationFormik0'
                />
              </Form.Group>
              <SubmitButton
                buttonText='Last opp utgave'
                isSubmitting={isSubmitting}
                isValid={isValid}
              />

              {isSubmitting || status?.success ? (
                <ProgressBar
                  className={styles.progressBar}
                  striped
                  animated={isSubmitting}
                  now={status.progress}
                  label={`${status.progress.toFixed(0)}%`}
                />
              ) : null}
              {status.error ? (
                <Alert className={styles.alertInfo} variant='error'>
                  Noe gikk galt!
                  <br />
                  Vent litt, og prøv igjen. Dersom problemet vedvarer, kontakt
                  ansvarlig utvikler.
                  <hr />
                  <div className='d-flex justify-content-end'>
                    <Button
                      variant='secondary'
                      onClick={() => {
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
                  </div>
                </Alert>
              ) : null}
              {status.success ? (
                <Alert className={styles.alertInfo} variant='primary'>
                  Opplasting fullført!
                  <br />
                  Merk at det kan ta litt tid før utgaven dukker opp på
                  forsiden.
                </Alert>
              ) : null}
            </Form>
          </Fade>
        );
      }}
    </Formik>
  );
};
export default NewEditionForm;
