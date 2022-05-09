import { NextPage } from "next";
import Link from "next/link";
import Head from "next/head";
import { Button } from "react-bootstrap";
import { ROUTES } from "../../utils/routes";

import { ShowListingToggle } from "../../components/Admin/ShowListingToggle";
import { WithAuthentication } from "../../components/WithAuthentication";

import styles from "../../styles/Admin.module.css";

const Admin: NextPage = () => {
  return (
    <>
      <Head>
        <title>readme - admin</title>
      </Head>
      <WithAuthentication>
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

          <ShowListingToggle />
        </div>
      </WithAuthentication>
    </>
  );
};

export default Admin;
