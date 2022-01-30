import { NextPage } from "next";
import Link from "next/link";
import { Button } from "react-bootstrap";

import styles from "../../styles/Admin.module.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../lib/Firebase/firebase";
import { useRouter } from "next/router";
import { ROUTES } from "../../utils/routes";

const Admin: NextPage = () => {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  if (loading) {
    return <h1>Loading...</h1>;
  } else if (!user) {
    router.push(ROUTES.SIGN_IN);
    return <h1>Redirecting to sign in</h1>;
  } else {
    return (
      <div>
        <h1>Admin</h1>
        <div className={`${styles.container} d-grid gap-2`}>
          <Link href={ROUTES.NEW_EDITION} passHref>
            <Button variant="primary">Legg til ny utgave</Button>
          </Link>
          <Link href={ROUTES.EDITION_LIST} passHref>
            <Button variant="primary">Vis utgavelisten</Button>
          </Link>
          <Link href={ROUTES.NEW_ARTICLE} passHref>
            <Button variant="primary">Legg til ny artikkel</Button>
          </Link>
          <Link href={ROUTES.ARTICLE_LIST} passHref>
            <Button variant="primary">Vis artikkellisten</Button>
          </Link>

          {
            //<ShowListingToggle />
          }
        </div>
      </div>
    );
  }
};

export default Admin;
