module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/semen-platformer-prod/' : '/',
	css: {
		loaderOptions: {
			sass: {
				prependData: `@import "@/styles/_variables.scss"; `
			}
		}
	}
}