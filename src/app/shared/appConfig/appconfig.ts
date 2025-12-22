import type { BrandKey } from "../../ui/themes/theme";

export interface AppConfig {
  brand: BrandKey;
}

export const appConfig: AppConfig = {
  brand: "dominos",
};
