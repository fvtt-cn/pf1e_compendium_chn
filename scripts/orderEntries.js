const {
  readFile,
  readTranslationsFolder,
  writeFile,
} = require("./files.js");

/**
 * Orders given translations
 *
 * @param {import("../utils/files.js").TranslationsObject} translationObj Translations to order.
 * @returns {import("../utils/files.js").TranslationsObject} Ordered translations.
 * */
const order = (translationObj) => {
  let unsortedTranslations = translationObj.entries;

  const sortedTranslations = Object.fromEntries(
    Object.entries(unsortedTranslations).sort((a, b) => {
      return a[0].toLowerCase().localeCompare(b[0].toLocaleLowerCase(), "en", {
        ignorePunctuation: true,
      });
    })
  );

  translationObj.entries = sortedTranslations;
  return translationObj;
};

if (require.main === module) {
  /** @type {Array.<string>} */
  let files = process.argv
    .splice(2)
    .filter((arg) => !arg.startsWith("--"))
    .map((f) => {
      f = f.includes("translations/") ? f : `./translations/${f}`;
      f = f.endsWith(".json") ? f : `${f}.json`;
      return f;
    });
  let _args = process.argv.filter((arg) => arg.startsWith("--"));

  // If no files are given we just read the entire folder
  if (files.length === 0) {
    files = readTranslationsFolder();
  }

  files.forEach((fileURL) => {
    console.info(`Ordering ${fileURL}...`);
    let translationObj = readFile(fileURL);
    translationObj = order(translationObj);
    writeFile(fileURL, translationObj);
  });
}

module.exports = { order };
