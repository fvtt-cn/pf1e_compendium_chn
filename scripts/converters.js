
import { logger } from "./utils.js"
export const tContainerItems = (items) => {
  Object.values(items).forEach((item) => {
    /**
     * The original UUID of the item from flags.
     * @type {string | undefined}
     */
    const originalUUID = item.flags?.core?.sourceId;
    if (!originalUUID) return;

    // Retrieve the original item from the compendium
    const compendiumItem = fromUuidSync(originalUUID);
    if (!compendiumItem) return;

    if (compendiumItem && compendiumItem.flags?.babele?.translated) {
      item.name = compendiumItem.name;
      if (compendiumItem.system?.description?.value) {
        item.system.description.value = compendiumItem.system.description.value;
      }
    }
  });
  return items;
};


class Converters {
  actions(value, translations) {
    if (!translations) {
      return value;
    }

    value.forEach((type, index) => {
      if(index > 0){
        return;
      }
      const data = translations[index];

      value[index].name = data.name;

      if (value[index].range?.value) {
        value[index].range.value = data.range;
      }
      if (value[index].save?.description) {
        value[index].save.description = data.savingThrow;
      }
      if (value[index].duration?.value) {
        value[index].duration.value = data.duration;
      }
      if (value[index].target?.value) {
        value[index].target.value = data.target;
      }
      if (data.spellArea) {
        value[index].spellArea = data.spellArea;
      }
      if (data.spellEffect) {
        value[index].spellEffect = data.spellEffect;
      }
      if (data.effectNotes) {
        value[index].effectNotes = data.effectNotes;
      }
    });
    return value;
  }

  translateSubSchool(subschool) {
    const subSchoolMap = new Map([
      ["calling", "呼唤"],
      ["charm", "魅惑"],
      ["compulsion", "胁迫"],
      ["creation", "创造"],
      ["figment", "虚假幻觉"],
      ["glamer", "五官幻觉"],
      ["haunted", "作祟"],
      ["healing", "医疗"],
      ["pattern", "心灵幻觉"],
      ["phantasm", "魅影幻觉"],
      ["polymorph", "变形"],
      ["scrying", "探知"],
      ["shadow", "幽影幻觉"],
      ["summoning", "召唤"],
      ["teleportation", "传送"],
    ]);

    subSchoolMap.forEach((translation, original) => {
      subschool = subschool.replace(original, translation);
    });

    return subschool;
  }

  translateDescriptors(descriptors) {
    const descriptorMap = new Map([
      ["acid", "酸"],
      ["air", "气"],
      ["chaotic", "混乱"],
      ["cold", "寒冷"],
      ["curse", "诅咒"],
      ["darkness", "黑暗"],
      ["death", "死亡"],
      ["disease", "疾病"],
      ["draconic", "龙类"],
      ["earth", "土"],
      ["emotion", "情绪"],
      ["electricity", "电"],
      ["evil", "邪恶"],
      ["fear", "恐惧"],
      ["fire", "火"],
      ["force", "力场"],
      ["good", "善良"],
      ["language-dependent", "基于语言"],
      ["lawful", "秩序"],
      ["light", "光"],
      ["meditative", "冥想"],
      ["mind-affecting", "影响心灵"],
      ["mindAffecting", "影响心灵"],
      ["pain", "痛苦"],
      ["poison", "毒素"],
      ["ruse", "诡计"],
      ["see text", "见正文"],
      ["shadow", "阴影"],
      ["sonic", "音波"],
      ["water", "水"],
      ['see text', '见正文'],
    ]);
    descriptorMap.forEach((translation, original) => {
      // descriptors.total = new Set(Array.from(descriptors.total).map(d => 
      //   d.replace(original, translation)
      // ));
      // if(descriptors.hasOwnProperty("value")){
      //   descriptors.value = descriptors.value.map(d => 
      //     d.replace(original, translation)
      //   );
      // }
    });
    return descriptors;
  }

  contextNotes(originalContextNotes, translatedContextNotes) {
    if (originalContextNotes.length > 0) {
      const ctxNotesWithText = originalContextNotes.filter((ctxNote) =>
        Object.prototype.hasOwnProperty.call(ctxNote, "text")
      );
      if (translatedContextNotes?.length !== ctxNotesWithText.length) {
        logger(
          `There are missing context notes translations -> ${translatedContextNotes?.length || 0}/${ctxNotesWithText.length}`
        );
        return originalContextNotes;
      }
    }

    originalContextNotes.forEach((_obj, index, _contextNotes) => {
      const data = translatedContextNotes[index];
      originalContextNotes[index].text = data.text;
    });

    return originalContextNotes;
  };

}

export default new Converters();
