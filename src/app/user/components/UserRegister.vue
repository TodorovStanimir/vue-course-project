<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-4"></div>
      <div class="col-lg-4 form-container">
        <form @submit.prevent="handleRegister">
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
            <div class="req-field" v-if="!$v.username.required">This field is required!</div>
            <div
              class="info-field"
              v-else-if="!$v.username.$params.usernameValidator.alpha"
            >Shoud be in format Xxxxx Xxxxx</div>
          </div>
          <div class="form-group input-group">
            <div class="input-group-prepend">
              <span class="input-group-text">
                <i class="fa fa-envelope"></i>
              </span>
            </div>
            <input
              type="email"
              class="form-control"
              placeholder="Email Address"
              v-model="email"
              @blur="$v.email.$touch()"
              :class="{ 'invalid-touched': $v.email.$anyError, valid: !$v.email.invalid && $v.email.$dirty}"
            />
          </div>
          <div v-if="$v.email.$error">
            <div class="req-field" v-if="!$v.email.required">This field is required!</div>
            <div
              class="info-field"
              v-else-if="!$v.email.email"
            >Email shoud be a valid email address, like example@example.extension!</div>
          </div>
          <div class="form-group input-group">
            <div class="input-group-prepend">
              <span class="input-group-text">
                <i class="fa fa-phone"></i>
              </span>
            </div>
            <input
              type="text"
              class="form-control"
              placeholder="Phone number"
              v-model="phoneNumber"
              @blur="$v.phoneNumber.$touch()"
              :class="{ 'invalid-touched': $v.phoneNumber.$anyError, valid: !$v.phoneNumber.invalid && $v.phoneNumber.$dirty}"
            />
          </div>
          <div
            class="info-field"
            v-if="!$v.phoneNumber.phoneNumberValidator"
          >Phone number should consists country code and at least 7 digits!</div>
          <div v-else-if="$v.phoneNumber.$error">
            <div class="req-field" v-if="!$v.phoneNumber.$required">This field is required!</div>
          </div>
          <div class="form-group input-group">
            <div class="input-group-prepend">
              <span class="input-group-text">
                <i class="fa fa-building"></i>
              </span>
            </div>
            <input
              type="text"
              class="form-control"
              placeholder="Occupation"
              v-model="occupation"
              @blur="$v.occupation.$touch()"
              :class="{ 'invalid-touched': $v.occupation.$anyError, valid: !$v.occupation.invalid && $v.occupation.$dirty }"
            />
          </div>
          <div v-if="$v.occupation.$error">
            <div class="req-field" v-if="!$v.occupation.required">This field is required!</div>
            <div
              class="info-field"
              v-else-if="!$v.occupation.occupation"
            >Occupation field should consists only letters!</div>
          </div>
          <div>
            <div class="form-group input-group">
              <div class="input-group-prepend">
                <span class="input-group-text">
                  <i class="fa fa-lock"></i>
                </span>
              </div>
              <input
                type="password"
                class="form-control"
                placeholder="Create password"
                v-model="password"
                @blur="$v.password.$touch()"
                :class="{ 'invalid-touched': $v.password.$anyError, valid: !$v.password.invalid && $v.password.$dirty}"
              />
            </div>
            <div
              class="info-field"
              v-if="!$v.password.passwordValidator"
            >Password shoud consists between 3 and 16 symbols: letters and digits!</div>
            <div class="req-field" v-else-if="$v.password.$error">This field is required!</div>

            <div class="form-group input-group">
              <div class="input-group-prepend">
                <span class="input-group-text">
                  <i class="fa fa-lock"></i>
                </span>
              </div>
              <input
                type="password"
                class="form-control"
                placeholder="Repeat password"
                v-model="repeatPassword"
                @blur="$v.repeatPassword.$touch()"
                :class="{ 'invalid-touched': $v.repeatPassword.$anyError, valid: !$v.repeatPassword.invalid && $v.repeatPassword.$dirty}"
              />
            </div>
            <div v-if="$v.repeatPassword.$error">
              <div class="req-field" v-if="!$v.repeatPassword.required">This field is required!</div>
              <div class="info-field" v-else>Passwords do not match!</div>
            </div>
          </div>
          <div class="form-group input-group">
            <div class="input-group-prepend">
              <span class="input-group-text">
                <i class="fa fa-image"></i>
              </span>
            </div>
            <input
              type="url"
              class="form-control"
              placeholder="image url"
              v-model="imageUrl"
              @blur="$v.imageUrl.$touch()"
              :class="{ 'invalid-touched': $v.imageUrl.$anyError, valid: !$v.imageUrl.invalid && $v.imageUrl.$dirty }"
            />
          </div>
          <div v-if="$v.imageUrl.$error">
            <div class="req-field" v-if="!$v.imageUrl.required">This field is required!</div>
            <div
              class="info-field"
              v-else-if="!$v.imageUrl.url"
            >Image URL must start with http or https!</div>
          </div>
          <div class="form-group">
            <button
              type="submit"
              class="btn btn-success btn-block"
              :disabled="$v.$invalid"
            >Create Account</button>
          </div>
          <p class="text-center">
            Have an account?&nbsp;&nbsp;
            <router-link :to="{ name: 'userLogin' }">
              <b class="login">Log In</b>
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
import {
  required,
  email,
  alpha,
  url,
  sameAs,
  helpers
} from "vuelidate/lib/validators";
import { mapActions } from "vuex";

const usernameValidator = helpers.regex("alpha", /^[A-Z][a-z]+\s[A-Z][a-z]+$/);
const phoneNumberValidator = helpers.regex("alpha", /^[+]{1}\d{10,}$/);
const passwordValidator = helpers.regex(
  "alpha",
  /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{3,16}$/
);

export default {
  name: "UserRegister",
  mixins: [validationMixin],
  data: function() {
    return {
      username: "",
      email: "",
      phoneNumber: "",
      occupation: "",
      password: "",
      repeatPassword: "",
      imageUrl: ""
    };
  },
  validations: {
    username: {
      required,
      usernameValidator
    },
    email: {
      required,
      email
    },
    phoneNumber: {
      required,
      phoneNumberValidator
    },
    occupation: {
      required,
      alpha
    },
    password: {
      required,
      passwordValidator
    },
    repeatPassword: {
      required,
      sameAsPassword: sameAs("password")
    },
    imageUrl: {
      required,
      url
    }
  },
  methods: {
    ...mapActions(["registerUser"]),
    async handleRegister() {
      await this.registerUser({
        username: this.username,
        email: this.email,
        phoneNumber: this.phoneNumber,
        occupation: this.occupation,
        password: this.password,
        imageUrl: this.imageUrl
      });
    }
  }
};
</script>

<style scoped>
.container {
  padding-top: 10px;
  margin-bottom: -603px;
}
.form-container {
  background-color: rgb(0, 0, 0, 0.1);
  padding: 20px;
  padding-bottom: 0px;
  border-radius: 4px;
  border: 1px solid white;
}
input.valid {
  border: 2px solid #42a948; /* green */
}

input.invalid-touched {
  border: 2px solid #a94442; /* red */
}

.req-field {
  background-color: #ffffff;
  color: #a94442;
  height: auto;
  margin-top: -10px;
  margin-bottom: 10px;
  border-radius: 5px;
  text-align: center;
  width: auto;
}
.info-field {
  background-color: #ffffff;
  color: #a94442;
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
  border-left: 2px solid #42a948;
  border-top: 2px solid #42a948;
  border-bottom: 2px solid #42a948;
}
input {
  border-right: 2px solid #42a948;
  border-top: 2px solid #42a948;
  border-bottom: 2px solid #42a948;
}
.text-center {
  font-style: italic;
  color: beige;
}
button {
  border: 2px solid grey;
  background-color: #42a948;
}
.login {
  color: #000080;
}
@media only screen and (max-width: 768px) {
  .container {
    padding: 5px;
    margin-bottom: -687px;
    width: 84%;
  }
}
</style>