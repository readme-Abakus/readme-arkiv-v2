import { FC, FormEventHandler, useEffect, useState } from "react";
import { Form, Alert } from "react-bootstrap";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";

import { auth } from "../../../lib/Firebase/firebase";

import { SubmitButton } from "../Common/SubmitButton";
import { ROUTES } from "../../../utils/routes";

export const SignInForm: FC = () => {
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    signInWithEmailAndPassword(email, password);
    event.preventDefault();
  };

  useEffect(() => {
    if (user) {
      router.push(ROUTES.ADMIN);
    }
  }, [user, router]);

  const isValid = password !== "" && email !== "";
  return (
    <Form onSubmit={onSubmit}>
      {error && <Alert variant="danger">{error.message}</Alert>}
      <Form.Group controlId="email">
        <Form.Label>E-post</Form.Label>
        <Form.Control
          name="email"
          value={email}
          onChange={(value) => setEmail(value.currentTarget.value)}
          type="text"
          placeholder="E-post"
        />
      </Form.Group>
      <Form.Group controlId="password">
        <Form.Label>Passord</Form.Label>
        <Form.Control
          name="password"
          value={password}
          onChange={(value) => setPassword(value.currentTarget.value)}
          type="password"
          placeholder="Passord"
        />
      </Form.Group>
      <SubmitButton
        buttonText="Logg inn"
        isSubmitting={loading}
        isValid={isValid}
      />
    </Form>
  );
};
