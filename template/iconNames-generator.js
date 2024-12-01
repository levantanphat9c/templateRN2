const fs = require('fs');
const iconJson = JSON.parse(
  fs.readFileSync('src/Components/Core/DataDisplay/Icon/selection.json', 'utf8'),
);

const content = `
/**
 * This file is generated automatically when run yarn compile
 * The source is from selection.json file
 */

export enum IconNames  {
${iconJson.icons.map(icon => `  '${icon.properties.name}'= '${icon.properties.name}',`).join('\n')}
}

export type IconNamesLiteral = keyof typeof IconNames;
`;

fs.writeFileSync('src/Constants/IconNames.ts', content);
