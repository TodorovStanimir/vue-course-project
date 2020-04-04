<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-4"></div>
      <div class="col-lg-4">
        <form @submit.prevent="loginUser({username, password})">
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
            <router-link :to="{ name: 'userRegister' }">
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
import { required, minLength, helpers } from "vuelidate/lib/validators";
import { mapActions } from "vuex";

const usernameValidator = helpers.regex("alpha", /^[A-Z][a-z]+\s[A-Z][a-z]+$/);

export default {
  name: "UserLogin",
  mixins: [validationMixin],
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
    ...mapActions(["loginUser"]),
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
  margin-bottom: -451px;
}
.text-center {
  font-style: italic;
}
button {
  border: 2px solid grey;
  background-color: #42a948;
}
</style>