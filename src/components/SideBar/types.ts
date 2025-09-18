export type MenuItem =
  | {
      label: string;
      to: string;
      children?: undefined;
    }
  | {
      label: string;
      children: {
        label: string;
        to: string;
      }[];
      to?: undefined;
    };
