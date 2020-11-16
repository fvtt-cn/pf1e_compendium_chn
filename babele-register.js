Hooks.on('init', () => {

	if(typeof Babele !== 'undefined') {
		Babele.get().register({
			module: 'pf1e_cn_compendium',
			lang: 'cn',
			dir: 'compendium'
		});
	}
});
