<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-4"></div>
      <div class="col-lg-4 form-container">
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
              :placeholder="$ml.get('username')"
              v-model="username"
              @blur="$v.username.$touch()"
              :class="{ 'invalid-touched': $v.username.$anyError, valid: !$v.username.invalid && $v.username.$dirty}"
            />
          </div>
          <div v-if="$v.username.$error">
            <div 
              class="req-field" 
              v-if="!$v.username.required"
              v-text="$ml.get('userRequiredField')"
            ></div>
            <div
              class="info-field"
              v-else-if="!$v.username.$params.usernameValidator.alpha"
              v-text="$ml.get('userNameField')"
            ></div>
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
              :placeholder="$ml.get('userPassword')"
              v-model="password"
              @blur="$v.password.$touch()"
              :class="{ 'invalid-touched': $v.password.$anyError, valid: !$v.password.invalid && $v.password.$dirty}"
            />
          </div>
          <div v-if="$v.password.$error">
            <div 
              class="req-field" 
              v-if="!$v.password.required"
              v-text="$ml.get('userRequiredField')"
            ></div>
            <div
              class="info-field"
              v-else-if="!$v.password.passwordValidator"
              v-text="$ml.get('userPasswordField')"
            ></div>
          </div>
          <div class="form-group">
            <button 
              class="btn btn-success btn-block" 
              :disabled="$v.$invalid"
              v-text="$ml.get('userLoginInAccount')"
            ></button>
          </div>
          <router-link :to="{ name: 'userRegister' }">
            <p class="text-center register" v-text="$ml.get('userHaveNotAnAccount')"></p>
          </router-link>
        </form>
      </div>
      <div class="col-lg-4"></div>
    </div>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, helpers } from "vuelidate/lib/validators";
import { mapActions } from "vuex";

const usernameValidator = helpers.regex("alpha", /(^[А-Я]{1}[а-я]+[ ]{1}[А-Я]{1}[а-я]+$)|(^[A-Z][a-z]+\s[A-Z][a-z]+$)/);
const passwordValidator = helpers.regex("alpha", /(^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{3,16}$)|(^(?=.*[А-Яа-я])(?=.*\d)[А-Яа-я\d]{3,16}$)/);

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
      passwordValidator
    }
  },
  methods: {
    ...mapActions(["loginUser"])
  }
};
</script>

<style scoped>
input.valid {
  border: 2px solid #42a948; /* green */
  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;
}
input.invalid-touched {
  border: 2px solid #a94442; /* red */
  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;
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
  border-radius: 5px;
}
.container {
  margin-top: 113px;
  margin-bottom: -436px;
}
.form-container {
  background-color: rgb(0, 0, 0, 0.1);
  padding: 20px;
  padding-bottom: 0px;
  border-radius: 4px;
  border: 1px solid white;
}
.text-center {
  font-style: italic;
  color: beige;
}
button {
  border: 2px solid grey;
  background-color: #42a948;
}
.register {
  color: #1034a6;
}
@media only screen and (max-width: 768px) {
  .container {
    margin-bottom: -550px;
    width: 90%;
  }
}
</style>