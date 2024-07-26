const { readFile, writeFile } = require("./files.js");

/**
 * This functions will join into a single file the value of `f1` and `f2`. In case of
 * conflict the values of `f2` will remain over `f1`. This is intended to be used
 * for bringing new items from latest release to current translation file.
 *
 * @param {string} f1 First file to merge.
 * @param {string} f2 Second file to merge.
 * @returns {import("./files.js").TranslationsObject} New translations file
 */
const mergeTranslations = (f1, f2) => {
  const newEntries = readFile(f1);
  const currentTranslationFile = readFile(f2);
  const mergedEntries = {
    ...newEntries.entries,
    ...currentTranslationFile.entries,
  };

  // Remove entries that are no longer part of system
  // Storing deleted entries for debugging purposes
  /** @type {Array.<string>} Deleted entries on process */
  const deletedEntries = [];
  for (const key in mergedEntries) {
    if (!Object.prototype.hasOwnProperty.call(newEntries.entries, key)) {
      let deletedEntryStr = `"${key}"`;
      const translated = Boolean(
        currentTranslationFile.entries[key].name !== key
      );
      if (translated) {
        deletedEntryStr += ` -> \x1b[1m${currentTranslationFile.entries[key].name}\x1b[0m`;
      }
      deletedEntries.push(`${deletedEntryStr}`);
      delete mergedEntries[key];
    }
  }
  // Storing new entries for debugging purposes
  /** @type {Array.<string>} New entries added */
  const newEntriesAdded = [];
  for (const key in newEntries.entries) {
    if (!Object.hasOwnProperty.call(currentTranslationFile.entries, key)) {
      newEntriesAdded.push(`"${key}"`);
    }
  }

  currentTranslationFile.entries = mergedEntries;
  if (newEntriesAdded.length > 0) {
    console.debug(
      `\x1b[36mNew entries:\x1b[0m ${newEntriesAdded.join(", ")}\n`
    );
  }
  if (deletedEntries.length > 0) {
    console.debug(
      `\x1b[31mDeleted entries (bold = Entries previously translated):\x1b[0m ${deletedEntries.join(
        ", "
      )}`
    );
  }

  writeFile(f2, currentTranslationFile);
};

if (require.main === module) {
  if (process.argv.length < 4) {
    console.error("You need to declare the two files to merge.");
    process.exit(1);
  }
  // eslint-disable-next-line array-element-newline
  const [f1, f2] = process.argv.slice(2, 4);
  mergeTranslations(f1, f2);
}
