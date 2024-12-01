type IconSetItem = {
  properties: {
    name: string;
  };
  icon: {
    paths: string[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    attrs?: any[];
    width?: number | string;
  };
};

type IconSet = {
  icons: IconSetItem[];
};

export const generateIconData = (iconSet: IconSet) => {
  const iconData = {} as { [key: string]: IconSetItem };

  iconSet.icons.forEach(item => {
    iconData[item.properties.name] = item;
  });

  return iconData;
};
