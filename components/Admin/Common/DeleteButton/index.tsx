import { DocumentReference, deleteDoc } from "firebase/firestore";
import { StorageReference, deleteObject } from "firebase/storage";
import { isArray } from "lodash";
import { FC, useState } from "react";
import { Spinner } from "react-bootstrap";

import styles from "./DeleteButton.module.css";

interface DeleteButtonProps {
  docRef?: DocumentReference[] | DocumentReference;
  storageRef?: StorageReference[] | StorageReference;
  removeSelf: () => void;
}

export const DeleteButton: FC<DeleteButtonProps> = ({
  docRef,
  storageRef,
  removeSelf,
}) => {
  const [isDeleting, setIsDeleting] = useState(false);

  async function deleteItem() {
    setIsDeleting(true);

    if (docRef !== undefined) {
      if (isArray(docRef)) {
        for (let ref of docRef) {
          await deleteDoc(ref);
        }
      } else {
        await deleteDoc(docRef);
      }
    }

    if (storageRef !== undefined) {
      if (isArray(storageRef)) {
        for (let ref of storageRef) {
          await deleteObject(ref);
        }
      } else {
        await deleteObject(storageRef);
      }
    }
    setIsDeleting(false);
    removeSelf();
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
