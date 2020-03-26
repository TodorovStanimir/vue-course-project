<template>
  <div class="container">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css" />
    <div class="row">
      <div class="col-lg-4"></div>
      <div class="col-lg-4">
        <form @submit.prevent="hadleLogin" ref="loginForm">
          <div class="form-group input-group">
            <div class="input-group-prepend">
              <span class="input-group-text">
                <i class="fa fa-user"></i>
              </span>
            </div>
            <input
              type="text"
              class="form-control"
              placeholder="Name and Surname"
              v-model="username"
              @blur="$v.username.$touch()"
              :class="{ 'invalid-touched': $v.username.$anyError, valid: !$v.username.invalid && $v.username.$dirty}"
            />
          </div>
          <div v-if="$v.username.$error">
            <div class="req-field" v-if="!$v.username.required">This field is required</div>
            <div
              class="info-field"
              v-else-if="!$v.username.$params.usernameValidator.alpha"
            >Shoud be in format Xxxxx Xxxxx</div>
          </div>
          <div class="form-group input-group">
            <div class="input-group-prepend">
              <span class="input-group-text">
                <i class="fa fa-lock"></i>
              </span>
            </div>
            <input
              type="password"
              class="form-control"
              placeholder="Password"
              v-model="password"
              @blur="$v.password.$touch()"
              :class="{ 'invalid-touched': $v.password.$anyError, valid: !$v.password.invalid && $v.password.$dirty}"
            />
          </div>
          <div v-if="$v.password.$error">
            <div class="req-field" v-if="!$v.password.required">This field is required</div>
            <div
              class="info-field"
              v-else-if="!$v.password.minLength"
            >Password must have at least {{$v.password.$params.minLength.min}} signs</div>
          </div>
          <div class="form-group">
            <button class="btn btn-success btn-block" :disabled="$v.$invalid">Login in Your account</button>
          </div>
          <p class="text-center">
            <b>Have not an account?</b>
            <router-link :to="{ path: '/profile/register' }">
              <b>&nbsp; Register here</b>
            </router-link>
          </p>
        </form>
      </div>
      <div class="col-lg-4"></div>
    </div>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, minLength } from "vuelidate/lib/validators";
import { helpers } from "vuelidate/lib/validators";
// import { http } from "../../shared/services/httpClient";
// import { toastedSuccess } from "../../shared/services/toasted";
import mixins from '../../../mixins.js'

const usernameValidator = helpers.regex("alpha", /^[A-Z][a-z]+\s[A-Z][a-z]+$/);

export default {
  name: "UserLogin",
  mixins: [validationMixin, mixins],
  data: function() {
    return {
      username: "",
      password: ""
    };
  },
  validations: {
    username: {
      required,
      usernameValidator
    },
    password: {
      required,
      minLength: minLength(3)
    }
  },
  methods: {
    // saveUserInfo(data) {
    //   localStorage.setItem("username", data.username);
    //   localStorage.setItem("token", data._kmd.authtoken);
    //   localStorage.setItem("userId", data._id);
    // },
    // async hadleLogin() {
    //   try {
    //     const { data } = await http.post("login", {
    //       username: this.username,
    //       password: this.password
    //     });
    //     this.saveUserInfo(data);
    //     toastedSuccess("Successfully logged in!");
    //     this.$bus.$emit("logged");
    //     this.$router.push("/books/all");
    //   } catch (error) {
    //     this.$refs.loginForm.reset();
    //   }
    // }
  }
};
</script>

<style scoped>
input.valid {
  border-left: 2px solid #42a948; /* green */
}

input.invalid-touched {
  border-left: 2px solid #a94442; /* red */
}
.req-field {
  background-color: #a94442;
  height: auto;
  margin-top: -10px;
  margin-bottom: 10px;
  border-radius: 5px;
  text-align: center;
  width: auto;
}
.info-field {
  background-color: #a94442;
  height: auto;
  margin-top: -10px;
  margin-bottom: 10px;
  border-radius: 5px;
  text-align: center;
  width: auto;
}
i {
  color: #42a948;
}
span {
  border-left: 2px solid grey;
  border-top: 2px solid grey;
  border-bottom: 2px solid grey;
}
input {
  border-right: 2px solid grey;
  border-top: 2px solid grey;
  border-bottom: 2px solid grey;
  border-radius: 5px;
}
.container {
  margin-top: 150px;
  margin-bottom: -443px;
}
.text-center {
  font-style: italic;
}
button {
  border: 2px solid grey;
  background-color: #42a948;
}
</style>