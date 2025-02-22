import converters, { tContainerItems } from "./converters.js";

Hooks.on("init", () => {
  game.settings.register("pf1e_compendium_chn", "autoRegisterBabel", {
    name: "自动以Babele启动翻译",
    hint: "自动设置Babele中的翻译，而无需引用带有翻译的目录。",
    scope: "world",
    config: true,
    default: true,
    type: Boolean,
    onChange: (value) => {
      if (value) {
        autoRegisterBabel();
      }

      window.location.reload();
    },
  });

  game.settings.register("pf1e_compendium_chn", "enableDebug", {
    name: "Activates debug mode",
    hint: "It will display, in addition to a console error, any errors encountered during translation as a notification.",
    scope: "world",
    config: true,
    default: false,
    type: Boolean,
  });

  Babele.get().registerConverters({
    actions: (value, translations) => converters.actions(value, translations),
    contextNotes: (originalContextNotes, translatedContextNotes) =>
      converters.contextNotes(originalContextNotes, translatedContextNotes),
    subSchool: converters.translateSubSchool,
    types: converters.translateTypes,
    subSchool: converters.translateSubSchool,
    containerItems: tContainerItems, // Translate Items in Containers
    learnedAt: (learnedAt) => {
      const domainsMap = new Map([
        ["Air", "气领域"],
        ["Animal", "动物领域"],
        ["Artifice", "手艺领域"],
        ["Chaos", "混乱领域"],
        ["Charm", "魅惑领域"],
        ["Community", "团队领域"],
        ["Darkness", "黑暗领域"],
        ["Death", "死亡领域"],
        ["Destruction", "毁灭领域"],
        ["Earth", "土领域"],
        ["Evil", "邪恶领域"],
        ["Fire", "火领域"],
        ["Glory", "荣耀领域"],
        ["Good", "善良领域"],
        ["Healing", "医疗领域"],
        ["Knowledge", "知识领域"],
        ["Law", "秩序领域"],
        ["Liberation", "解放领域"],
        ["Luck", "机运领域"],
        ["Madness", "狂乱领域"],
        ["Magic", "魔法领域"],
        ["Nobility", "高贵领域"],
        ["Plant", "植物领域"],
        ["Protection", "保护领域"],
        ["Repose", "安眠领域"],
        ["Rune", "符文领域"],
        ["Scalykind", "鳞类领域"],
        ["Strength", "力量领域"],
        ["Sun", "太阳领域"],
        ["Travel", "旅行领域"],
        ["Trickery", "诡术领域"],
        ["Void", "虚空领域"],
        ["War", "战争领域"],
        ["Water", "水领域"],
        ["Weather", "天气领域"],
      ]);
      domainsMap.forEach((translation, original) => {
        if (learnedAt.domain?.hasOwnProperty(original)) {
          learnedAt.domain[translation] = learnedAt.domain[original];
          delete learnedAt.domain[original];
        }
      });

      const subDomainsMap = new Map([
        ["Aeon", "御衡者子域"],
        ["Agathion", "盖森子域"],
        ["Alchemy", "炼金子域"],
        ["Ambush", "伏击子领"],
        ["Ancestors", "先祖子域"],
        ["Arcane", "奥秘子域"],
        ["Archon", "亚空子域"],
        ["Aristocracy", "贵族子域"],
        ["Arson", "纵火子域"],
        ["Ash", "灰烬子域"],
        ["Azata", "爱塔子域"],
        ["Blood", "鲜血子域"],
        ["Cannibalism", "食族子域"],
        ["Captivation", "迷惑子域"],
        ["Catastrophe", "天灾子域"],
        ["Caves", "窟子域"],
        ["Chivalry", "骑士子域"],
        ["Cloud", "云子域"],
        ["Competition", "竞赛子域"],
        ["Construct", "构装子域"],
        ["Cooperation", "协作子域"],
        ["Corruption", "腐化子域"],
        ["Curse", "诅咒子域"],
        ["Daemon", "邪魔子域"],
        ["Dark Tapestry", "异幕子域"],
        ["Day", "白昼子域"],
        ["Decay", "腐朽子域"],
        ["Deception", "欺骗子域"],
        ["Defense", "防御子域"],
        ["Demodand", "魔孽子域"],
        ["Demon", "恶魔子域"],
        ["Devil", "决斗子域"],
        ["Divine", "神力子域"],
        ["Dragon", "龙子域"],
        ["Duels", "决斗子域"],
        ["Education", "教育子域"],
        ["Entropy", "熵子域"],
        ["Espionage", "间谍子域"],
        ["Exploration", "探索子域"],
        ["Family", "家族子域"],
        ["Fate", "天命子域"],
        ["Fear", "恐惧子域"],
        ["Feather", "飞羽子域"],
        ["Ferocity", "凶猛子域"],
        ["Fist", "拳头子域"],
        ["Flotsam", "漂浮子域"],
        ["Flowing", "流动子域"],
        ["Fortifications", "碉堡子域"],
        ["Freedom", "自由子域"],
        ["Friendship", "友谊子域"],
        ["Fur", "毛兽子域"],
        ["Greed", "贪婪子域"],
        ["Growth", "滋长子域"],
        ["Hatred", "仇恨子域"],
        ["Heroism", "英勇子域"],
        ["Home", "家园子域"],
        ["Honor", "诚实子域"],
        ["Hubris", "傲慢子域"],
        ["Ice", "冰子域"],
        ["Imagination", "想像子域"],
        ["Industry", "工厂子域"],
        ["Inevitable", "制裁子域"],
        ["Innuendo", "影射子域"],
        ["Insanity", "疯狂子域"],
        ["Insect", "昆虫子域"],
        ["Isolation", "孤寂子域"],
        ["Judgment", "审判子域"],
        ["Kyton", "链魔子域"],
        ["Language", "语言子域"],
        ["Leadership", "领导子域"],
        ["Legend", "传奇子域"],
        ["Legislation", "律法子域"],
        ["Leshy", "莱西子域"],
        ["Light", "光明子域"],
        ["Lightning", "闪电子域"],
        ["Loss", "失却子域"],
        ["Love", "爱慕子域"],
        ["Loyalty", "忠诚领域"],
        ["Lust", "情欲子域"],
        ["Martyr", "殉难子域"],
        ["Medicine", "医药子域"],
        ["Memory", "记忆子域"],
        ["Metal", "铁子域"],
        ["Monsoon", "雨季子域"],
        ["Moon", "月子域"],
        ["Murder", "杀戮子域"],
        ["Night", "暗夜子域"],
        ["Nightmare", "梦魇子域"],
        ["Oceans", "海子域"],
        ["Petrification", "化石子域"],
        ["Plague", "瘟疫子域"],
        ["Portal", "门户子域"],
        ["Protean", "星灵子域"],
        ["Psychopomp (Death)", "招魂者子域 (死亡)"],
        ["Psychopomp (Repose)", "招魂者子域 (安眠)"],
        ["Purity", "纯净子域"],
        ["Radiation", "辐射子域"],
        ["Rage", "狂暴子域"],
        ["Redemption", "救赎子域"],
        ["Resolve", "决意子域"],
        ["Restoration", "复原子域"],
        ["Resurrection", "回生子域"],
        ["Revelation", "启示子域"],
        ["Revelry", "狂欢子域"],
        ["Revolution", "革命子域"],
        ["Riot", "暴动子域"],
        ["Rites", "仪式子域"],
        ["Rivers", "河流子域"],
        ["Sahkil", "恐亡魔子域"],
        ["Saurian", "蜥类子域"],
        ["Seasons", "季节子域"],
        ["Self-Realization", "自我完善子域"],
        ["Shadow", "阴影子域"],
        ["Slavery", "奴役子域"],
        ["Smoke", "烟幕子域"],
        ["Solitude", "孤独子域"],
        ["Souls", "灵魂子域"],
        ["Sovereignty", "王国子域"],
        ["Stars", "星辰子域"],
        ["Storms", "风暴子域"],
        ["Tactics", "战术子域"],
        ["Thievery", "盗窃子域"],
        ["Thirst", "干涸子域"],
        ["Thorns", "荆棘子域"],
        ["Thought", "思想子域"],
        ["Toil", "疲累子域"],
        ["Torture", "折磨子域"],
        ["Trade", "交易子域"],
        ["Trap", "陷阱子域"],
        ["Truth", "真理子域"],
        ["Tyranny", "暴政子域"],
        ["Undead", "亡灵子域"],
        ["Venom", "毒液子域"],
        ["Wards", "守护子域"],
        ["Whimsy", "滑稽子域"],
        ["Wind", "风子域"],
      ]);
      subDomainsMap.forEach((translation, original) => {
        if (learnedAt.subDomain?.hasOwnProperty(original)) {
          learnedAt.subDomain[translation] = learnedAt.subDomain[original];
          delete learnedAt.subDomain[original];
        }
      });

      const bloodLinesMap = new Map([
        ["Aberrant", "异怪血脉"],
        ["Abyssal", "深渊血脉"],
        ["Accursed", "咒怨血统"],
        ["Aquatic", "深洋血统"],
        ["Arcane", "奥秘血脉"],
        ["Astral", "星界血脉"],
        ["Boreal", "极寒血统"],
        ["Celestial", "天界血脉"],
        ["Daemon", "邪魔血统"],
        ["Deep Earth", "后土血统"],
        ["Destined", "命运血脉"],
        ["Div", "妖灵血统"],
        ["Djinni", "风灵血统"],
        ["Draconic", "龙脉血统"],
        ["Dreamspun", "梦见血统"],
        ["Ectoplasm", "灵质血统"],
        ["Efreeti", "火灵血统"],
        ["Elemental", "元素血统"],
        ["Fey", "精类血统"],
        ["Ghoul", "尸鬼血统"],
        ["Harrow", "哈罗血统"],
        ["Imperious", "帝王血统"],
        ["Impossible", "源数血统"],
        ["Infernal", "地狱血统"],
        ["Kobold Sorcerer", "狗头人术士血统"],
        ["Maestro", "谐律血统"],
        ["Marid", "水灵血统"],
        ["Martyred", "殉难血统"],
        ["Naga", "娜迦血脉"],
        ["Nanite", "纳米血脉"],
        ["Oni", "恶鬼血统"],
        ["Orc", "兽人血脉"],
        ["Pestilence", "疫病血脉"],
        ["Phoenix", "不死鸟血统"],
        ["Possessed", "操灵血统"],
        ["Protean", "星灵血统"],
        ["Psychic", "心灵血统"],
        ["Rakshasa", "罗刹血统"],
        ["Salamander", "火蜥血脉"],
        ["Scorpion", "蝎血脉"],
        ["Serpentine", "古蛇血统"],
        ["Shadow", "暗影血统"],
        ["Shaitan", "土灵血统"],
        ["Shapechanger", "变形者血脉"],
        ["Solar", "太阳血统"],
        ["Starsoul", "星魄血统"],
        ["Stormborn", "暴风血统"],
        ["Undead", "亡灵血统"],
        ["Unicorn", "独角兽血统"],
        ["Verdant", "苍翠血脉"],
        ["Vestige", "遗迹血脉"],
      ]);
      bloodLinesMap.forEach((translation, original) => {
        if (learnedAt.bloodline?.hasOwnProperty(original)) {
          learnedAt.bloodline[translation] = learnedAt.bloodline[original];
          delete learnedAt.bloodline[original];
        }
      });

      const classMap = new Map([
        ["adept", "导师"],
        ["alchemist", "炼金术士"],
        ["antipaladin", "反圣骑士"],
        ["arcanist", "奥能师"],
        ["barbarian", "野蛮人"],
        ["bard", "吟游诗人"],
        ["bloodrager", "血脉狂怒者"],
        ["brawler", "拳师"],
        ["cavalier", "骑将"],
        ["cleric", "牧师"],
        ["druid", "德鲁伊"],
        ["hunter", "猎人"],
        ["inquisitor", "审判者"],
        ["investigator", "调查员"],
        ["kineticist", "操念使"],
        ["magus", "魔战士"],
        ["medium", "通灵者"],
        ["mesmerist", "催眠师"],
        ["monk", "武僧"],
        ["ninja", "忍者"],
        ["oracle", "先知"],
        ["occultist", "秘学士"],
        ["paladin", "圣骑士"],
        ["psychic", "异能者"],
        ["ranger", "游侠"],
        ["rogue", "游荡者"],
        ["samurai", "武士"],
        ["shaman", "萨满"],
        ["skald", "歌者"],
        ["slayer", "杀手"],
        ["sorcerer", "术士"],
        ["spiritualist", "唤魂师"],
        ["summoner", "召唤师"],
        ["summonerUnchained", "掉链召唤师"],
        ["swashbuckler", "游荡剑客"],
        ["vigilante", "侠客"],
        ["warpriest", "战斗祭司"],
        ["witch", "女巫"],
        ["wizard", "法师"],
      ]);
      classMap.forEach((translation, original) => {
        if (learnedAt.class?.hasOwnProperty(original)) {
          learnedAt.class[translation] = learnedAt.class[original];
          delete learnedAt.class[original];
        }
      });

      return learnedAt;
    },
  });

  if (game.settings.get("pf1e_compendium_chn", "autoRegisterBabel")) {
    autoRegisterBabel();
  }
});

function autoRegisterBabel() {
  if (typeof Babele !== "undefined") {
    Babele.get().register({
      module: "pf1e_compendium_chn",
      lang: "cn",
      dir: "translations",
    });
  }
}
Hooks.once("ready", async () => {
  if (game.settings.get("core", "language") !== "cn") return;

  // Add new filters
  const browsers = [
    pf1.applications.compendiumBrowser.ClassBrowser,
    pf1.applications.compendiumBrowser.ItemBrowser,
    pf1.applications.compendiumBrowser.SpellBrowser,
    pf1.applications.compendiumBrowser.FeatBrowser,
    pf1.applications.compendiumBrowser.RaceBrowser,
    pf1.applications.compendiumBrowser.CreatureBrowser,
    pf1.applications.compendiumBrowser.BuffBrowser,
  ];
  browsers.forEach((browser) => {
    browser.filterClasses.splice(0, 0, OriginalNameFilter);
  });
});
