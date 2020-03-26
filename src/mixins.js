import { http } from './app/shared/services/httpClient.js';
import { toastedSuccess } from './app/shared/services/toasted.js'
const mixins = {
    methods: {
        async handleRegister() {
            try {
                await http.post("", {
                    username: this.username,
                    email: this.email,
                    phoneNumber: this.phoneNumber,
                    occupation: this.occupation,
                    password: this.password,
                    imageUrl: this.imageUrl
                });
                toastedSuccess("Successfully registration!");
                this.$router.push({ name: "userLogin" });
            } catch (error) {
                Object.keys(this.$data).map(key => this.$data[key] = "");
                this.$v.$reset();
            }
        },
        async hadleLogin() {
            try {
                const { data } = await http.post("login", {
                    username: this.username,
                    password: this.password
                });
                this.saveUserInfo(data);
                toastedSuccess("Successfully logged in!");
                this.$bus.$emit("logged");
                this.$router.push("/books/all");
            } catch (error) {
                Object.keys(this.$data).map(key => this.$data[key] = "");
                this.$v.$reset();
            }
        },
        saveUserInfo(data) {
            localStorage.setItem("username", data.username);
            localStorage.setItem("token", data._kmd.authtoken);
            localStorage.setItem("userId", data._id);
        }
    }
}
export default mixins;