import { FC, useState } from "react";
import { Spinner } from "react-bootstrap";

import styles from "./DeleteButton.module.css";

interface DeleteButtonProps {
  onClick: () => Promise<void> | (() => void);
}

export const DeleteButton: FC<DeleteButtonProps> = ({ onClick }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  async function deleteItem() {
    setIsDeleting(true);
    if (onClick !== undefined) {
      await onClick();
    }

    setIsDeleting(false);
  }

  return (
    <div className={styles.deleteButton}>
      {isDeleting ? (
        <Spinner animation="border" />
      ) : (
        <i className={"material-icons md-36"} onClick={() => deleteItem()}>
          delete_outline
        </i>
      )}
    </div>
  );
};
