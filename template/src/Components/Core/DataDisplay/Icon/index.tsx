import { isNotNilOrEmpty } from 'ramda-adjunct';
import { createElement, CSSProperties, SVGProps } from 'react';
import { Path as PathComponent, Svg as SvgComponent } from 'react-native-svg';

import { IconNames, IconNamesLiteral } from '@/Constants';
import { withMemo } from '@/HOC';
import { useColor } from '@/Hooks';

import { generateIconData } from './helper';
import iconSet from './selection.json';

export interface IIcoMoonProps extends SVGProps<SVGElement> {
  /**
   * icon name in IconNames
   */
  icon: IconNames | IconNamesLiteral;
  /**
   * size of icon
   */
  size?: string | number;
  disableFill?: boolean;
  removeInlineStyle?: boolean;
  style?: CSSProperties;
}

const ICON_DATA = generateIconData(iconSet);

const IcoMoon = ({ icon, size = 16, disableFill, removeInlineStyle, ...props }: IIcoMoonProps) => {
  if (!iconSet || !icon) return null;
  const { isLight } = useColor();

  const iconName = isLight ? icon : `${icon}Dark`;

  const currentIcon = isNotNilOrEmpty(ICON_DATA[iconName]) ? ICON_DATA[iconName] : ICON_DATA[icon];

  if (!currentIcon) return null;

  const initialStyle: CSSProperties = {
    display: 'flex',
    stroke: 'currentColor',
    fill: 'currentColor',
    flexDirection: 'row',
    flexWrap: 'wrap',
  };

  const computedStyle = {
    ...(removeInlineStyle ? {} : initialStyle),
    ...(size ? { width: size, height: size } : {}),
    ...(props.style || {}),
  };

  const { width = '1024' } = currentIcon.icon;

  const viewBox = `0 0 ${width} 1024`;

  const children = currentIcon.icon.paths.map((path, index) => {
    const attrs = currentIcon.icon.attrs?.[index];

    const pathProps = {
      d: path,
      key: icon + index,
      ...(!disableFill && attrs ? attrs : {}),
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return createElement(PathComponent, pathProps as any);
  });
  //@ts-expect-error //not fix yet
  return createElement(SvgComponent, { ...props, viewBox, style: computedStyle }, children);
};

export const iconList = () => {
  if (!iconSet || !Array.isArray(iconSet.icons)) return null;
  const listName = {} as { [key: string]: string };
  iconSet.icons.map(icon => {
    listName[icon.properties.name] = icon.properties.name;
    return icon.properties.name;
  });

  return listName;
};

export default withMemo(IcoMoon);
