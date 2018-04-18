export default {
    data() {
		return {
			brandingData: Store.state,
			isBranded: false
		}
	},
	created() {
        this.getData();
    },
	methods: {
	    getData() {
            var self = this;
			// Get data from local server
	        var endpoint = window.location.protocol + "//" + window.location.hostname + '/branding'; // We need to use protocol / host vs origin for IE compatibility... IE doesn't support origin.
			if (window.location.hostname !== "localhost") {
				axios.get(
					endpoint
				// If successful
				).then(function (response) {
					// Set Store data equal to response data, then run setStyle to insert stylesheet
					Store.setState(response.data.BrandingConfigurations);
					self.setStyle();
				// If error:
				}).catch(function (error) {
					// Console log the error and redirect to 500 error page
					console.log(error);
					window.location.href = '/Error/HttpError';
				});
			} else {
				this.isBranded = true;
			}
	    },
		setStyle() {
			// Create link and set its attributes
		    var	link = document.createElement('link');
				link.rel = 'stylesheet';
				link.type = 'text/css';
				link.href = this.brandingData.data.CssFilePath;
			// Append link to head of page
			document.head.appendChild(link);
			// Set isBranded to true and render page
			this.isBranded = true;
		}
	}
}