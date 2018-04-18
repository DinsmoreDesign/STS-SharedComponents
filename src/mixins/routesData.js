export default {
    data() {
		return {
			routes: window.appRoutes
		}
	},
	beforeCreate() {
		// Set data before Vue object is created to avoid lifecycle errors
		this.routes = window.appRoutes;
	}
}