import Storage from "./storage";

class AuthStorage extends Storage {
	get loggedIn() {
		return !!this.value && !!this.value.token;
	}

	get token() {
		return this.value && this.value.token;
	}

	get userId() {
		return this.value && this.value.userId;
	}

	get userType() {
		return this.value && this.value.userType;
	}
}

export default new AuthStorage("AUTH");
