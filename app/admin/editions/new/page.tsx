import { ROUTES } from "../../../../utils/routes";
import NewEditionForm from "app/admin/editions/new/NewEditionForm";
import { WithAuthentication } from "@/components/WithAuthentication";
import PageHeader from "@/components/PageHeader";

export default function Page() {
  return (
    <WithAuthentication>
      <div className="flex flex-col items-left gap-5 max-w-[350px] w-full">
        <PageHeader title="Ny utgave" backButtonRoute={ROUTES.EDITION_LIST} />
        <NewEditionForm />
      </div>
    </WithAuthentication>
  );
}
