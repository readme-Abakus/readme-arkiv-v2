import { useRouter } from "next/router";
import { ReactNode } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../lib/Firebase/firebase";
import { ROUTES } from "../../utils/routes";

export const WithAuthentication = ({ children }: { children: ReactNode }) => {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  if (loading) {
    return <h1>Loading...</h1>;
  } else if (!user) {
    router.push(ROUTES.SIGN_IN);
    return <h2>Redirecting to sign in</h2>;
  } else {
    return <>{children}</>;
  }
};
