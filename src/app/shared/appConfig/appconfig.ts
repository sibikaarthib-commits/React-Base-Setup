import type { BrandKey } from "../../ui/theme/theme";

export interface AppConfig {
  brand: BrandKey;
}

export const appConfig: AppConfig = {
  brand: "dominos",
};
