// knip.config.ts
import { type KnipConfiguration } from "knip"

const config: KnipConfiguration = {
  $schema: "https://unpkg.com/knip@6/schema.json",
  ignoreIssues: {
    "src/shared/design/elements/Card/Card.tsx": ["types"],
    "src/shared/design/elements/Typography/Typography.tsx": ["types"],
    "src/shared/design/foundations/colors.ts": ["exports"],
    "src/shared/design/foundations/typography.ts": ["exports"],
    "src/shared/weather/toWeather.ts": ["types"],
  },
  ignoreFiles: ["coverage/**", "dist/**", "web-build/**"],
  ignoreDependencies: ["expo-updates", "expo-system-ui"],
}

export default config
