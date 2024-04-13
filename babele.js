class SpellActionsConverters {
	actions(value, translations) {
		if (!translations) {
			return value;
		}
		let data;
		value.forEach((type, index) => {
			data = translations[index];
			if (index !== 0) { data = translations[0] }
			if (value[index]?.name) {
				value[index].name = data.name;
			}
			if (value[index]?.effectNotes) {
				value[index].effectNotes = data.effectNotes;
			}
			if (value[index]?.spellArea) {
				value[index].spellArea = data.area;
			}
			if (value[index]?.spellEffect) {
				value[index].spellEffect = data.effect;
			}
			if (value[index].duration?.value) {
				value[index].duration.value = data.duration;
			}
			if (value[index].save?.description) {
				value[index].save.description = data.savingThrow;
			}
			if (value[index].target?.value) {
				value[index].target.value = data.target;
			}
		});

		return value;
	}
}
const spellActionsConverters = new SpellActionsConverters();

Hooks.on('init', () => {
	if (typeof Babele !== 'undefined') {
		Babele.get().register({
			module: 'pf1e_compendium_chn',
			lang: 'cn',
			dir: 'compendium'
		});

		Babele.get().registerConverters({
			'actions': (value, translations) => spellActionsConverters.actions(value, translations)
		});
	}
});
