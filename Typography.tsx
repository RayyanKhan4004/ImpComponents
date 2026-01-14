import { type TypographyProps } from "@/types";
import { TypographyEnums, TypographyVariants } from "@/components/enums/index";

export default function Typography({ variant, children }: TypographyProps) {
  function getSize(v?: string) {
    const defaultSize = 16;
    if (!v) return defaultSize;
    const variants = TypographyVariants as Record<string, number>;
    if (typeof variants[v] === "number") return variants[v];
    const enums = TypographyEnums as Record<string, string>;
    const mapped = enums[v];
    if (mapped && typeof variants[mapped] === "number") return variants[mapped];
    return defaultSize;
  }

  return <p className={`text-[${getSize(variant)}px]`}>{children}</p>;
}



export const TypographyVariants = {
Heading1:36,
Heading2:24,
TableText:16,
TableTextSize:14,
PopUpHeading:24,
PopUpText:16,
PageHeading:30,
PageSecondText:16,
};

export const TypographyEnums = {
  HEADING1:"Heading1",
  HEADING2:"Heading2",
  TABLETEXT:"TableText",
  TABLETEXTSIZE:"TableTextSize",
  POPUPHEADING:"PopUpHeading",
  POPUPTEXT:"PopUpText",
  PAGEHEADING:"PageHeading",
  PAGESECONDTEXT:"PageSecondText",
};
