const https = require('https'); // or 'https' for https:// URLs
const fs = require('fs');

const grammarConfigs = {
  vscode: '1.70.0',
};

const externalJSONGrammars = {
  'source.css': `https://raw.githubusercontent.com/microsoft/vscode/${grammarConfigs.vscode}/extensions/css/syntaxes/css.tmLanguage.json`,
  'source.sassdoc': `https://raw.githubusercontent.com/microsoft/vscode/${grammarConfigs.vscode}/extensions/scss/syntaxes/sassdoc.tmLanguage.json`,
};

const externalPLISTGrammars = {};

const downloadFn = (key, url, extension) => {
  const file = fs.createWriteStream(`./test/externalGrammars/${key}.tmLanguage.${extension}`);
  https.get(url, function (response) {
    response.pipe(file);

    // after download completed close filestream
    file.on('finish', () => {
      file.close();
      console.log(`${key} grammar download completed`);
    });
  });
};

console.log(`Using VSCode ${grammarConfigs.vscode} grammars`);

Object.keys(externalJSONGrammars).forEach(key => downloadFn(key, externalJSONGrammars[key], 'json'));
Object.keys(externalPLISTGrammars).forEach(key => downloadFn(key, externalPLISTGrammars[key], 'plist'));
