import { FeatureFlags } from "hjyup-flags";

type Flags = "merch-access";

const FEATURE_FLAGS = new FeatureFlags<Flags>({
  "merch-access": {
    defaultValue: false,
    rollout: {
      percentage: 35,
    },
    customEvaluator: (flag, context) => {
      if (context.environment !== "production") {
        return true;
      }

      if (flag.rollout && context.userId) {
        const bucket: number = FEATURE_FLAGS.assignUserToBucket(
          context.userId,
          "merch-access",
        );
        return bucket < flag.rollout.percentage;
      }
      return flag.defaultValue;
    },
  },
});

FEATURE_FLAGS.setGlobalContext({
  environment: process.env.NODE_ENV,
});

export default FEATURE_FLAGS;
