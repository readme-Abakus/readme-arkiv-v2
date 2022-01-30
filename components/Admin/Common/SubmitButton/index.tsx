import { FC } from "react";
import { Button, Spinner } from "react-bootstrap";
import styles from "./SubmitButton.module.css";

interface SubmitButtonProps {
  isValid: boolean;
  isSubmitting: boolean;
  buttonText: string;
}

export const SubmitButton: FC<SubmitButtonProps> = ({
  isValid,
  isSubmitting,
  buttonText,
}) => {
  return (
    <Button
      variant="primary"
      type="submit"
      disabled={!isValid || isSubmitting}
      className={styles.submitButton}
    >
      {isSubmitting ? (
        <Spinner
          className={styles.submitSpinner}
          as="span"
          animation="border"
          size="sm"
          role="status"
          aria-hidden="true"
        />
      ) : null}
      {buttonText}
    </Button>
  );
};
