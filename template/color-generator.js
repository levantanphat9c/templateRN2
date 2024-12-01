const fs = require('fs');

function firstUpper(lower) {
  return (lower && lower[0].toUpperCase() + lower.slice(1)) || lower;
}

function convertName(str, notCamelCase) {
  // Remove prefixes like "01_", "02_", etc.
  str = str.replace(/^\d+_/, '');
  // Remove any remaining underscores and spaces
  str = str.replace(/[_\s]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ''));
  str = str.replaceAll('-', '');
  str = str.replaceAll('&', '');
  str = str.replace('%', 'Percent');

  // Ensure the first character is lowercase
  if (notCamelCase) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  return str.charAt(0).toLowerCase() + str.slice(1);
}

function processColor(color) {
  if (color.startsWith('{')) {
    console.log('new color', refColor(color));
    return processColor(refColor(color));
  }

  if (color.startsWith('#')) {
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);
    const a = color.length === 9 ? parseInt(color.slice(7, 9), 16) / 255 : 1;
    return `rgba(${r}, ${g}, ${b}, ${a.toFixed(2)})`;
  }
  return color;
}

function processGradient(gradient) {
  if (typeof gradient === 'object' && gradient.type === 'linear') {
    const angle = gradient.angle || 0;
    const stops = gradient.stops
      .map(stop => `${processColor(stop.color)} ${stop.position * 100}%`)
      .join(', ');
    return `linear-gradient(${angle}deg, ${stops})`;
  }
  return JSON.stringify(gradient);
}

function refColor(color) {
  const refJson = jsonData['ref'];
  const colorConvert = color.replace('{', '').replace('}', '').split('.');

  if (colorConvert.length === 2) {
    const refColor = refJson[colorConvert[0]][colorConvert[1]];

    if (refColor.$type === 'color') {
      return processColor(refColor.$value);
    } else if (refColor.$type === 'gradient') {
      return processGradient(refColor.$value);
    }
  }

  return color;
}

function processObject(obj, notCamelCase) {
  const result = {};
  for (const [key, value] of Object.entries(obj)) {
    const processedKey = convertName(key.trim(), notCamelCase);
    if (typeof value === 'object') {
      if ('$type' in value) {
        if (value.$type === 'color') {
          result[processedKey] = processColor(value.$value);
        } else if (value.$type === 'gradient') {
          result[processedKey] = processGradient(value.$value);
        }
      } else {
        result[processedKey] = processObject(value);
      }
    }
  }
  return result;
}

function createInterface(interfaces, object, interfaceName) {
  let currentInterface = {
    name: interfaceName,
    properties: {},
  };
  interfaces.push(currentInterface);
  Object.keys(object).forEach(key => {
    const value = object[key];
    if (typeof value === 'string') {
      currentInterface.properties[key] = 'string';
    } else {
      const newInterfaceName = interfaceName + firstUpper(key);
      createInterface(interfaces, value, newInterfaceName);
      currentInterface.properties[key] = newInterfaceName;
    }
  });
}

function generateConstFile(lightModeData, darkModeData, interfaces) {
  try {
    let result = `/**
 * This file is generated automatically when run yarn compile
 * The source is from figmaColor.json file
 */
${interfaces
  .reverse()
  .map(it => {
    return `
export interface ${it.name} {
${Object.keys(it.properties)
  .map(propName => `  ${propName}: ${it.properties[propName]};`)
  .join('\n')}
}
  `;
  })
  .join('\n')}
  
export const DarkMode: IColor = ${JSON.stringify(darkModeData, null, 2)};

export const LightMode: IColor = ${JSON.stringify(lightModeData, null, 2)};
    `;

    fs.writeFileSync(`src/styles/colorsManager.ts`, result);
  } catch (err) {
    console.error(err);
  }
}

// Read the JSON file
const jsonData = JSON.parse(fs.readFileSync('figmaColor.json', 'utf8'));

// Process Light Mode
const lightModeData = processObject(jsonData['Light Mode'], true);
const darkModeData = processObject(jsonData['Dark Mode'], true);

// Create interfaces
const interfaces = [];
createInterface(interfaces, darkModeData, 'IColor');

generateConstFile(lightModeData, darkModeData, interfaces);

console.log('Files colorsManager.ts have been generated.');
