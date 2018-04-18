export default {
    data() {
		return {
			showAlert: false,
			alertContent: null,
			alertSuccess: false,
			showModal: false,
			modalContent: null
		}
	},
	methods: {
		openModal(response, success, error) {
			if (response) {
				this.modalContent = success;
			} else {
				this.modalContent = error;
			}
			this.showModal = true;
		},
		openAlert(message, isSuccess) {
			this.alertContent = message;
			if (isSuccess) {
				this.alertSuccess = isSuccess;
			} else {
				this.alertSuccess = false;
			}
			this.showAlert = true;
		}
	}
}