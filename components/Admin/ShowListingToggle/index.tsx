import { FC } from "react";
import { useSettings } from "../../../lib/Firebase/hooks";
import { addToast, Spinner, Switch, Tooltip } from "@heroui/react";

export const ShowListingToggle: FC = () => {
  const [settings, loading, _, updateSettings] = useSettings();

  function toggleShowListing() {
    updateSettings({ ...settings, showListing: !settings?.showListing }).then(
      () =>
        addToast({
          title: "Instilling er oppdatert",
          description:
            "Det kan ta 5-10 minutter før endringer blir synlig på forsiden.",
          color: "success",
          timeout: 5000,
        })
    );
  }
  return (
    settings && (
      <div className="flex items-center gap-[10px]">
        <Tooltip
          content={
            "Brukes for å vise/skjule Listingsløp utgaver på arkivets forside."
          }
        >
          <span>Vis listingutgaver:</span>
        </Tooltip>
        <Switch
          onChange={toggleShowListing}
          isSelected={settings.showListing}
          disabled={loading}
        />
        {loading && <Spinner size="sm" />}
      </div>
    )
  );
};
