import { FeatureFlags } from "hjyup-flags";

type Flags = "merch-access";

const FEATURE_FLAGS = new FeatureFlags<Flags>({
  "merch-access": {
    defaultValue: false,
    context: {
      percentage: 35,
    },
  },
});

export default FEATURE_FLAGS;
