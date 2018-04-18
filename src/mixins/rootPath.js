export default {
	computed: {
		globalRootPath() {
			return window._View__RootPath ? window._View__RootPath : '';
		}
	}
}