
Hooks.on('init', () => {

	if(typeof Babele !== 'undefined') {
		Babele.get().register({
			module: 'dnd5e_cn',
			lang: 'cn',
			dir: 'compendium'
		}); 
	}
});