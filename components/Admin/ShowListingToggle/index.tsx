import { FC } from "react";
import { Spinner } from "react-bootstrap";
import Switch from "react-switch";
import { useSettings } from "../../../lib/Firebase/hooks";

import style from "./ShowListingToggle.module.css";

export const ShowListingToggle: FC = () => {
  const [settings, loading, _, updateSettings] = useSettings();

  function toggleShowListing() {
    updateSettings({ ...settings, showListing: !settings?.showListing });
  }

  return (
    <div className={style.toggleContainer}>
      <p>Vis listingsutgaver:</p>
      <Switch
        onChange={toggleShowListing}
        checked={settings?.showListing ?? false}
        disabled={loading}
      />
      <div>
        {loading ? (
          <Spinner animation="border" size="sm" variant="secondary" />
        ) : null}
      </div>
    </div>
  );
};