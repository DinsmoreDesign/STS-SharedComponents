export default {
    created() {
		// Create simplified variables
		var navLinks = this.navbar.links;

		// Loop through all links, find their URL and toggle active class, if necessary
		for (var link in navLinks) {
			if (window.location.pathname === navLinks[link].url) {
				navLinks[link].isActive = true;
			}
		}
	}
}