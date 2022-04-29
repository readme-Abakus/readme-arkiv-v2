import Head from "next/head";
import Link from "next/link";
import { Fade } from "react-bootstrap";

import { SignInForm } from "../components/Admin/SignInForm";

import styles from "../styles/SignIn.module.css";
import { ROUTES } from "../utils/routes";

const SignInPage = () => (
  <Fade appear in>
    <div className={styles.signIn}>
      <Head>
        <title>readme - logg inn</title>
      </Head>
      <h1>Logg inn</h1>
      <SignInForm />
      <Link href={ROUTES.PASSWORD_FORGET}>Glemt passord?</Link>
    </div>
  </Fade>
);

export default SignInPage;
