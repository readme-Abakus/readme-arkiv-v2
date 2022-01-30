import { sendPasswordResetEmail } from "firebase/auth";
import { FormEventHandler, useState } from "react";
import { Form, Alert } from "react-bootstrap";
import { SubmitButton } from "../components/Admin/Common/SubmitButton";
import { auth } from "../lib/Firebase/firebase";

import styles from "../styles/PasswordForget.module.css";

const PasswordForgetPage = () => (
  <div className={styles.container}>
    <h1>Tapt passord</h1>
    <PasswordForgetForm />
  </div>
);

export default PasswordForgetPage;

const PasswordForgetForm = () => {
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<any>(null);

  const onSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    setSuccess(false);
    setSending(true);
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setSending(false);
        setSuccess(true);
      })
      .catch((error) => {
        setSending(false);
        setError(error);
      });
  };

  const isValid = email !== "";
  return (
    <Form onSubmit={onSubmit}>
      <Form.Group controlId="email">
        <Form.Label>E-post</Form.Label>
        <Form.Control
          name="email"
          value={email}
          onChange={(event) => setEmail(event.currentTarget.value)}
          type="text"
          placeholder="E-post"
        />
      </Form.Group>
      <SubmitButton
        buttonText="Tilbakestill passord"
        isSubmitting={sending}
        isValid={isValid}
      />
      {error && <Alert variant="danger">{error.message}</Alert>}
      {success && (
        <Alert variant="success">
          E-post sendt! Sjekk innboksen din og følg lenken for å tilbakestille
          passordet.
        </Alert>
      )}
    </Form>
  );
};
