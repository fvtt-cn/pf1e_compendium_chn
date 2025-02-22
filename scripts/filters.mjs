export class OriginalNameFilter extends pf1.applications.compendiumBrowser.filters.TextFilter {
  static label = "Original name";

  /** @inheritdoc */
  static inputs = [
    {
      key: "originalName",
      placeholder: "Search by original entry name (english)",
    },
  ];

  /** @inheritdoc */
  static indexField = "flags.babele.originalName";

  /** @inheritDoc */
  applyFilter(entry) {
    /** @type {string | undefined} */
    const value =
      foundry.utils.getProperty(entry, this.constructor.indexField) ||
      foundry.utils.getProperty(entry, "name");
    const originalName = this.choices.get("originalName").value ?? "";
    return value?.toLowerCase().includes(originalName.toLowerCase());
  }
}
