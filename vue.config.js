module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/pfdo-platformer-prod/' : '/',
	css: {
		loaderOptions: {
			sass: {
				prependData: `@import "@/styles/_variables.scss"; `
			}
		}
	}
}