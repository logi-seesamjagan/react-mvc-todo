import { useEffect } from "react";
import { useState } from "react";
import { Form, FormFooter, FormItem } from "../../components";
import { ProductStoreStatus, Tiers, TierType, User } from "../../types";
import { useAuthService, useProductService } from "../../services";
import "./Settings.css";

function SettingsView(props: { user: User; tiers: Tiers }) {
  const { user, tiers } = props;

  const [tierType, setTierType] = useState<TierType>(user.tier || "free");

  const info = tiers[tierType].info;

  return (
    <div className="Page Settings">
      <header className="PageHeader">
        <h1 className="PageTitle">Settings</h1>
      </header>
      <section className="Settings-Body">
        <p>
          Current Tier: <strong>{tiers[user.tier].name}</strong>
        </p>
        <Form title="Tier Settings">
          <FormItem title="Switch Tier" info={info}>
            <select
              value={tierType}
              onChange={(e) => setTierType(e.target.value as TierType)}
            >
              {tiers &&
                Object.keys(tiers).map((tierType) => (
                  <option key={tierType} value={tierType}>
                    {tiers[tierType].name}
                  </option>
                ))}
            </select>
          </FormItem>
          <FormFooter>
            <button disabled={tierType === user.tier}>Switch</button>
          </FormFooter>
        </Form>
      </section>
    </div>
  );
}

export default function SettingsContainer() {
  const {
    productStore: { tiers, status: tierStatus, message: tierStatusMessage },
    getTiers,
  } = useProductService();

  const {
    auth: { user },
  } = useAuthService();

  useEffect(() => {
    if (!tiers) {
      getTiers();
    }
  }, [tiers, getTiers]);

  if (ProductStoreStatus.LOADING_TIERS_FAILED === tierStatus) {
    return <div className="Page">{tierStatusMessage}</div>;
  } else if (ProductStoreStatus.LOADING_TIERS === tierStatus) {
    return <div className="Page">Initilizing...</div>;
  } else if (!tiers) {
    return null;
  }

  if (!user) {
    return null;
  }

  return <SettingsView tiers={tiers} user={user} />;
}
