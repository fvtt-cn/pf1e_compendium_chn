/**
 * @typedef TranslationsObject
 * @type {object}
 * @prop {string} label The name of the compendium.
 * @prop {Object.<string, Object.<string, string>>} mapping Functions associated to translations.
 * @prop {Object.<string, {name: string, description: string}>} entries The list of entries to translate.
 */

const fs = require("fs");
const path = require("path");
const prettier = require("prettier");

/**
 * Read the given translation file and returns the object.
 *
 * @param {string} fileURL The URL from where to read.
 * @returns {TranslationsObject} The translations as JSON.
 */
const readFile = (fileURL) => {
  const textContent = fs.readFileSync(fileURL);
  /** @type {TranslationsObject} */
  const fullContent = JSON.parse(textContent.toString());
  return fullContent;
};

/**
 * Writes the given data into the translation file.
 *
 * @param {string} fileURL The URL from where to read.
 * @param {TranslationsObject} data The translationObject to write.
 */
const writeFile = (fileURL, data) => {
  prettier
    .resolveConfig(".prettierrc")
    .then((prettierConfig) => {
      // For this project there's no need of .prettierrc
      // if (!prettierConfig) {
      //   const errMsg = "Could not resolve .prettierrc";
      //   console.error(errMsg);
      //   throw new Error(errMsg);
      // }

      const dataAsString = JSON.stringify(data);
      prettier
        .format(dataAsString, {
          ...prettierConfig | {},
          // To force multi-line
          bracketSpacing: false,
          parser: "json",
          printWidth: 10,
          singleQuote: false,
          singleAttributePerLine: true,
          useTabs: false,
          tabWidth: 2,
        })
        .then((formattedData) => {
          fs.writeFileSync(fileURL, formattedData);
        })
        .then(() => {
          console.info(`Completed ${fileURL}!`);
        });
    })
    .catch((error) => {
      throw error;
    });
};

/**
 * Reads the translations folder and returns the JSON files.
 *
 * @returns {Array.<string>} JSON files in translations folder.
 */
const readTranslationsFolder = () => {
  return fs
    .readdirSync("./translations/", { recursive: false })
    .filter(
      (file) =>
        path.extname(file) === ".json" &&
        !path.basename(file).includes("_packs-folders")
    )
    .map((value) => `./translations/${value}`);
};

module.exports = { readFile, writeFile, readTranslationsFolder };
