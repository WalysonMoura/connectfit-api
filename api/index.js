const fs = require("fs");

const buildPath = "./build";
const indexJsPath = `${buildPath}/index.js`;
const appJsPath = `${buildPath}/app.js`;

fs.readFile(indexJsPath, "utf-8", (err, indexJsContent) => {
  if (err) {
    console.error(`Erro ao ler o arquivo index.js: ${err.message}`);
    return;
  }

  fs.readFile(appJsPath, "utf-8", (err, appJsContent) => {
    if (err) {
      console.error(`Erro ao ler o arquivo app.js: ${err.message}`);
      return;
    }

    // Combine o conteúdo dos arquivos index.js e app.js
    const combinedJsContent = `${indexJsContent}\n${appJsContent}`;

    // Escreva o conteúdo combinado em um novo arquivo
    const outputFilePath = "./combined.js";
    fs.writeFile(outputFilePath, combinedJsContent, (err) => {
      if (err) {
        console.error(`Erro ao escrever o arquivo combined.js: ${err.message}`);
        return;
      }

      console.log(`Arquivo combined.js criado com sucesso!`);
    });
  });
});
