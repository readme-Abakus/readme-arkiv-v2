"use client";

import { FormEventHandler, useState } from "react";
import { useSendPasswordResetEmail } from "react-firebase-hooks/auth";
import { auth } from "../../../lib/Firebase/firebase";
import { Alert, Button, Form, Input } from "@heroui/react";

export const PasswordForgetForm = () => {
  const [sendPasswordResetEmail, sending, error] =
    useSendPasswordResetEmail(auth);
  const [success, setSuccess] = useState(false);

  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    let data = Object.fromEntries(new FormData(e.currentTarget));
    setSuccess(await sendPasswordResetEmail(data.email as string));
  };

  return (
    <Form onSubmit={onSubmit} className="w-full gap-3">
      <Input
        isRequired
        name="email"
        placeholder="E-post"
        type="email"
        radius="full"
        errorMessage={({ validationDetails, validationErrors }) => {
          if (validationDetails.typeMismatch)
            return "Skriv in en gyldid mail adresse.";
          if (validationDetails.valueMissing) return "Obligatorisk felt.";
          return validationErrors;
        }}
        startContent={
          <span className="material-symbols-rounded sm">email</span>
        }
      />
      <Button
        type="submit"
        variant="solid"
        color="primary"
        className="w-full"
        radius="full"
        isLoading={sending}
        isDisabled={success}
      >
        Tilbakestill passord
      </Button>
      {error && <Alert color="danger">{error.message}</Alert>}
      {success && (
        <Alert color="success">
          E-post sendt! Sjekk innboksen din og følg lenken for å tilbakestille
          passordet.
        </Alert>
      )}
    </Form>
  );
};
