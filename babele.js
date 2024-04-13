class SpellActionsConverters {
	static actions(value, translations) {
		if (!translations) {
			return value;
		}

		value.forEach((type, index) => {
			const data = translations[index];

			value[index].effectNotes = data.effectNotes;
			value[index].name = data.name;
			value[index].spellArea = data.area;
			value[index].spellEffect = data.effect;

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

Hooks.on('init', () => {
	if (typeof Babele !== 'undefined') {
		Babele.get().register({
			module: 'pf1e_compendium_chn',
			lang: 'cn',
			dir: 'compendium'
		});

		Babele.get().registerConverters({
			'actions': (value, translations) => SpellActionsConverters.actions(value, translations)
		});
	}
});
