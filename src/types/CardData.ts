import { IconProps } from 'phosphor-react';

export interface CardData {
  name: string;
  total: number | string;
  Icon: React.ForwardRefExoticComponent<
    IconProps & React.RefAttributes<SVGSVGElement>
  >;
}
