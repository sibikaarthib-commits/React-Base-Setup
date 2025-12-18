// AppRadio.tsx
import { Radio, RadioGroup, FormControlLabel } from "@mui/material";

const allowedRadioColors = [
  "primary",
  "secondary",
  "success",
  "info",
  "warning",
  "error",
  "default",
] as const;

type RadioColor = (typeof allowedRadioColors)[number];

// Define AppColor type to match allowedRadioColors plus "inherit"
type AppColor = RadioColor | "inherit";

function mapAppColorToRadio(color?: AppColor): RadioColor | undefined {
  if (!color || color === "inherit") return undefined; // use default
  if (allowedRadioColors.includes(color as RadioColor)) {
    return color as RadioColor;
  }
  return undefined;
}

interface AppRadioOption {
  value: string;
  label: string;
}

interface AppRadioGroupProps {
  options: AppRadioOption[];
  color?: AppColor;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>, value: string) => void;
  name?: string;
  // Add other props as needed
}

export const AppRadioGroup: React.FC<AppRadioGroupProps> = ({
  options,
  color = "primary",
  value,
  onChange,
  name,
  // ...otherProps
}) => {
  const radioColor = mapAppColorToRadio(color);

  return (
    <RadioGroup
      value={value}
      onChange={onChange}
      name={name}
      // {...otherProps}
    >
      {options.map((opt) => (
        <FormControlLabel
          key={opt.value}
          value={opt.value}
          control={<Radio color={radioColor} />}
          label={opt.label}
        />
      ))}
    </RadioGroup>
  );
};
