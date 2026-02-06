import { redirect } from "next/navigation";
import { ROUTES } from "utils/routes";

export default function Page() {
  redirect(ROUTES.EDITION_LIST);
}
