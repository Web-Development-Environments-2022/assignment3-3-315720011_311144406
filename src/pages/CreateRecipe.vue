<template>
  <div class="container">
    <h1 class="title">Create Your Own Recipe</h1>
    <b-form @submit.prevent="onRegister" @reset.prevent="onReset">
        <b-form-group
            id="input-group-username"
            label-cols-sm="3"
            label="Title:"
            label-for="title"
        >
            <b-form-input
                id="title"
                v-model="$v.form.title.$model"
                type="text"
            ></b-form-input>
            <b-form-invalid-feedback v-if="!$v.form.title.required">
                Title is required
            </b-form-invalid-feedback>
            <b-form-invalid-feedback v-if="!$v.form.title.alpha">
                Title has to contain letters only
            </b-form-invalid-feedback>
        </b-form-group>

        <b-form-group
            id="input-group-time"
            label-cols-sm="3"
            label="Cooking Time (in minutes):"
            label-for="readyInMinutes"
        >
            <b-form-timepicker
                id="readyInMinutes"
                v-model="$v.form.readyInMinutes.$model"
                :show-seconds="false"
            ></b-form-timepicker>
            <b-form-invalid-feedback>
            Time is required
            </b-form-invalid-feedback>
        </b-form-group>

        <b-form-group
            id="input-group-servings"
            label-cols-sm="3"
            label="Servings:"
            label-for="servings"
        >
            <b-form-timepicker
                id="servings"
                v-model="$v.form.servings.$model"
                :show-seconds="false"
            ></b-form-timepicker>
            <b-form-invalid-feedback>
            Time is required
            </b-form-invalid-feedback>
        </b-form-group>

        <b-form-group
            id="input-group-instructions"
            label-cols-sm="3"
            label="Instructions:"
            label-for="instructions"
        >
            <textarea class="form-control" id="instructions" rows="3"></textarea>
            <b-form-invalid-feedback v-if="!$v.form.instructions.required">
                Instructions are required
            </b-form-invalid-feedback>
        </b-form-group>

        <b-form-group
            id="input-group-ingredientsNameAmount"
            label-cols-sm="3"
            label="ingredients:"
            label-for="ingredientsNameAmount"
        >
            <textarea class="form-control" id="ingredientsNameAmount" rows="3"></textarea>
            <b-form-invalid-feedback v-if="!$v.form.ingredientsNameAmount.required">
                Ingredients are required
            </b-form-invalid-feedback>
        </b-form-group>

        <b-form-group
            id="input-group-image"
            label-cols-sm="3"
            label="Upload Image:"
            label-for="image"
        >
            <ImageUploadPreview refs="image" id='image'></ImageUploadPreview>
        </b-form-group>

        <b-form-group
            id="input-vegan"
            label-cols-sm="3"
            label="Labels:"
            label-for="labels"
        >
            <b-form-checkbox id="vegan" v-model="$v.form.vegan.$model">Vegan</b-form-checkbox>
            <b-form-checkbox id="vegetarian" v-model="$v.form.vegetarian.$model">Vegetarian</b-form-checkbox>
            <b-form-checkbox id="gluten_free" v-model="$v.form.gluten_free.$model">Gluten Free</b-form-checkbox>
        </b-form-group>

        <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>

  </div>
</template>

<script>
import ImageUploadPreview from '../components/ImageUploadPreview.vue';
import {
  required,
  alpha
} from "vuelidate/lib/validators";

export default {
    
  name: "Register",
    components: {
        ImageUploadPreview
  },
  data() {
    return {
      form: {
        title: "",
        readyInMinutes: "",
        image: undefined,
        vegan: false,
        vegetarian: false,
        gluten_free: false,
        instructions: "",
        servings: "",
        ingredientsNameAmount: [],
        submitError: undefined,
      },
      errors: [],
      validated: false
    };
  },
  validations: {
    form: {
      title: {
        required,
        alpha
      },
      readyInMinutes: {
        required,
      },
      vegan: {
        required,
      },
      vegetarian: {
        required,
      },
      gluten_free: {
        required,
      },
      instructions: {
        required,
      },
      servings: {
        required
      },
      ingredientsNameAmount: {
        required,
      }
    }
  },
  mounted() {

  },
  methods: {
    validateState(param) {
      const { $dirty, $error } = this.$v.form[param];
      return $dirty ? !$error : null;
    },
    async Register() {
      try {
        const response = await this.axios.post(
          "http://localhost:3000" + "/user/createrecipe",

          {
            username: this.form.username,
            password: this.form.password
          }
        );
        this.$router.push("/login");
      } catch (err) {
        console.log(err.response);
        this.form.submitError = err.response.data.message;
      }
    },
    onRegister() {
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }
      this.Register();
    },
    onReset() {
        this.form = {
            title: "",
            readyInMinutes: "",
            servings: "",
            image: undefined,
            vegan: false,
            vegetarian: false,
            gluten_free: false,
            instructions: "",
            servings: "",
            ingredientsNameAmount: [],
            submitError: undefined,
        };
        console.log(this.$refs.image);
        this.$refs.image.ImageUploadPreview.previewImage = null;
        this.$nextTick(() => {
            this.$v.$reset();
        });
    }
  }
};
</script>
<style lang="scss" scoped>
.container {
  max-width: 500px;
}
</style>
