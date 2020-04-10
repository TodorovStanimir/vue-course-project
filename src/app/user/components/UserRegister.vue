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
                <i class="fa fa-envelope"></i>
              </span>
            </div>
            <input
              type="email"
              class="form-control"
              :placeholder="$ml.get('userEmail')"
              v-model="email"
              @blur="$v.email.$touch()"
              :class="{ 'invalid-touched': $v.email.$anyError, valid: !$v.email.invalid && $v.email.$dirty}"
            />
          </div>
          <div v-if="$v.email.$error">
            <div class="req-field" v-if="!$v.email.required" v-text="$ml.get('userRequiredField')"></div>
            <div class="info-field" v-else-if="!$v.email.email" v-text="$ml.get('userEmailField')"></div>
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
              :placeholder="$ml.get('userPhone')"
              v-model="phoneNumber"
              @blur="$v.phoneNumber.$touch()"
              :class="{ 'invalid-touched': $v.phoneNumber.$anyError, valid: !$v.phoneNumber.invalid && $v.phoneNumber.$dirty}"
            />
          </div>
          <div
            class="info-field"
            v-if="!$v.phoneNumber.phoneNumberValidator"
            v-text="$ml.get('userPhoneField')"
          ></div>
          <div v-else-if="$v.phoneNumber.$error">
            <div 
              class="req-field" 
              v-if="!$v.phoneNumber.$required"
              v-text="$ml.get('userRequiredField')"
            ></div>
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
              :placeholder="$ml.get('userOccupation')"
              v-model="occupation"
              @blur="$v.occupation.$touch()"
              :class="{ 'invalid-touched': $v.occupation.$anyError, valid: !$v.occupation.invalid && $v.occupation.$dirty }"
            />
          </div>
          <div v-if="$v.occupation.$error">
            <div 
              class="req-field" 
              v-if="!$v.occupation.required"
              v-text="$ml.get('userRequiredField')"
            ></div>
            <div
              class="info-field"
              v-else-if="!$v.occupation.occupation"
              v-text="$ml.get('userOccupationField')"
            ></div>
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
                :placeholder="$ml.get('userCreatePassword')"
                v-model="password"
                @blur="$v.password.$touch()"
                :class="{ 'invalid-touched': $v.password.$anyError, valid: !$v.password.invalid && $v.password.$dirty}"
              />
            </div>
            <div
              class="info-field"
              v-if="!$v.password.passwordValidator"
              v-text="$ml.get('userPasswordField')"
            ></div>
            <div 
              class="req-field" 
              v-else-if="$v.password.$error"
              v-text="$ml.get('userRequiredField')"
            ></div>

            <div class="form-group input-group">
              <div class="input-group-prepend">
                <span class="input-group-text">
                  <i class="fa fa-lock"></i>
                </span>
              </div>
              <input
                type="password"
                class="form-control"
                :placeholder="$ml.get('userRepeatPassword')"
                v-model="repeatPassword"
                @blur="$v.repeatPassword.$touch()"
                :class="{ 'invalid-touched': $v.repeatPassword.$anyError, valid: !$v.repeatPassword.invalid && $v.repeatPassword.$dirty}"
              />
            </div>
            <div v-if="$v.repeatPassword.$error">
              <div 
                class="req-field" 
                v-if="!$v.repeatPassword.required"
                v-text="$ml.get('userRequiredField')"
              ></div>
              <div class="info-field" v-else v-text="$ml.get('userRepeatPasswordField')"></div>
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
              :placeholder="$ml.get('userImageUrl')"
              v-model="imageUrl"
              @blur="$v.imageUrl.$touch()"
              :class="{ 'invalid-touched': $v.imageUrl.$anyError, valid: !$v.imageUrl.invalid && $v.imageUrl.$dirty }"
            />
          </div>
          <div v-if="$v.imageUrl.$error">
            <div 
              class="req-field" 
              v-if="!$v.imageUrl.required"
              v-text="$ml.get('userRequiredField')"
            ></div>
            <div
              class="info-field"
              v-else-if="!$v.imageUrl.url"
              v-text="$ml.get('userImageUrlField')"
            ></div>
          </div>
          <div class="form-group">
            <button
              type="submit"
              class="btn btn-success btn-block"
              :disabled="$v.$invalid"
              v-text="$ml.get('userCreateAccount')"
            ></button>
          </div>
          <router-link :to="{ name: 'userLogin' }">
            <p class="text-center login" v-text="$ml.get('userHaveAccount')">
            </p>
          </router-link>
        </form>
      </div>
      <div class="col-lg-4"></div>
    </div>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, email, url, sameAs, helpers} from "vuelidate/lib/validators";
import { mapActions } from "vuex";
import { userRegisterServices } from "../userServices";

const usernameValidator = helpers.regex("alpha", /(^[А-Я]{1}[а-я]+[ ]{1}[А-Я]{1}[а-я]+$)|(^[A-Z][a-z]+\s[A-Z][a-z]+$)/);
const phoneNumberValidator = helpers.regex("alpha", /^[+]{1}\d{10,}$/);
const occupationValidator = helpers.regex("alphа", /(^[A-Za-z ]+$)|(^[А-Яа-я ]+$)/);
const passwordValidator = helpers.regex("alpha", /(^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{3,16}$)|(^(?=.*[А-Яа-я])(?=.*\d)[А-Яа-я\d]{3,16}$)/);

export default {
  name: "UserRegister",
  mixins: [validationMixin, userRegisterServices],
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
      occupationValidator
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
    ...mapActions(["registerUser"])
  }
};
</script>

<style scoped>
.container {
  padding-top: 10px;
  margin-bottom: -611px;
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
  padding-top: 10px;
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