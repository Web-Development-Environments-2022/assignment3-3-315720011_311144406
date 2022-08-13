<template>
  <div class="container">
    <b-form>
        <b-form-group
            id="input-group-title"
            label-cols-sm="3"
            label="Title:"
            label-for="title"
        >
            <b-form-input
                id="title"
                v-model="$v.form.title.$model"
                type="text"
                :state="validateState('title')"
                style="max-width: 300px"
            ></b-form-input>
            <b-form-invalid-feedback v-if="!$v.form.title.required">
                Title is required
            </b-form-invalid-feedback>
            <b-form-invalid-feedback v-if="!$v.form.title.maxLength">
                Too Long
            </b-form-invalid-feedback>
        </b-form-group>

        <b-form-group
            id="input-group-time"
            label-cols-sm="3"
            label="Cooking Time (in minutes):"
            label-for="readyInMinutes"
        >
            <b-form-spinbutton 
                min="5" 
                max="600" 
                step="5"
                id="readyInMinutes"
                v-model="$v.form.readyInMinutes.$model"
                style="max-width: 300px"
            ></b-form-spinbutton>
        </b-form-group>

        <b-form-group
            id="input-group-servings"
            label-cols-sm="3"
            label="Servings:"
            label-for="servings"
        >
            <b-form-spinbutton 
                min="1" 
                max="30" 
                step="1"
                id="servings"
                v-model="$v.form.servings.$model"
                style="max-width: 300px"
            ></b-form-spinbutton>
        </b-form-group>

        <b-form-group
            id="input-group-instructions"
            label-cols-sm="3"
            label="Instructions:"
            label-for="instructions"
        >
            <b-form-textarea 
                class="form-control" 
                id="instructions" 
                rows="3"
                v-model="$v.form.instructions.$model"
                :state="validateState('instructions')"
            ></b-form-textarea>
            <b-form-invalid-feedback v-if="!$v.form.instructions.required">
                Instructions are required
            </b-form-invalid-feedback>
            <b-form-invalid-feedback v-if="!$v.form.instructions.maxLength">
                Too Long
            </b-form-invalid-feedback>
        </b-form-group>

        <b-form-group
            id="input-group-ingredientsNameAmount"
            label-cols-sm="3"
            label="Ingredients:"
            label-for="ingredientsNameAmount"
        >

            <div v-for="(ingredientAmount, index) in $v.form.ingredientsNameAmount.$each.$iter"
                :key="index"
                class="input-group"
                style="max-width: 500px"
                >

                <b-form-input 
                    v-model="ingredientAmount.name.$model"
                    type="text"
                    placeholder="name"
                    :state="validateNameAmountState(index, 'name')"  
                ></b-form-input>
                <b-form-input
                    v-model="ingredientAmount.amount.$model"
                    type="text"
                    placeholder="amount"
                    :state="validateNameAmountState(index, 'amount')"  
                ></b-form-input>
                <b-form-invalid-feedback v-if="!ingredientAmount.name.required | !ingredientAmount.amount.required">
                    Blank input
                </b-form-invalid-feedback>
                <b-form-invalid-feedback v-if="!ingredientAmount.name.maxLength | !ingredientAmount.amount.maxLength">
                    Too Long
                </b-form-invalid-feedback>
            </div>
            <b-button @click="addIngradiant" >Add Ingradiant</b-button>
        </b-form-group>

        <b-form-group
            id="input-group-image"
            label-cols-sm="3"
            label="Upload Image:"
            label-for="image"
        >
            <ImageUploadPreview ref="imageUploadPreview" id='image'></ImageUploadPreview>
        </b-form-group>

        <b-form-group
            id="input-vegan"
            label-cols-sm="3"
            label="Labels:"
            label-for="labels"
        >
            <div class="input-group">
                <b-form-checkbox style="margin-right: 50px" id="vegan" v-model="$v.form.vegan.$model"> Vegan </b-form-checkbox>
                <b-form-checkbox style="margin-right: 50px" id="vegetarian" v-model="$v.form.vegetarian.$model"> Vegetarian </b-form-checkbox>
                <b-form-checkbox style="margin-right: 50px" id="gluten_free" v-model="$v.form.gluten_free.$model"> Gluten Free </b-form-checkbox>
            </div>
        </b-form-group>
        <b-alert
            class="mt-2"
            v-if="form.submitError"
            variant="warning"
            dismissible
            show
            >
            Creation failed: {{ form.submitError }}
        </b-alert>
    </b-form>
  </div>
</template>

<script>
import ImageUploadPreview from './ImageUploadPreview.vue';
import {
  required,
  maxLength,
  integer
} from "vuelidate/lib/validators";

export default {
  name: "CreateRecipeComponent",
    components: {
        ImageUploadPreview
  },
  data() {
    return {
      form: {
        title: "",
        readyInMinutes: 5,
        image: undefined,
        vegan: false,
        vegetarian: false,
        gluten_free: false,
        instructions: "",
        servings: 1,
        ingredientsNameAmount: [
            {
            name: "",
            amount: ""
            }
        ],
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
        maxLength: maxLength(50)
      },
      readyInMinutes: {
        integer,
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
        maxLength: maxLength(600)
      },
      servings: {
        integer
      },
      ingredientsNameAmount: {
        required,
        $each: {
            name: {
                required,
                maxLength: maxLength(30)
            },
            amount: {
                required,
                maxLength: maxLength(30)
            }
        }
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
    validateNameAmountState(index, param) {
        let ind = parseInt(index);
        const { $dirty, $error } = this.$v.form.ingredientsNameAmount.$each.$iter[ind][param];
        return $dirty ? !$error : null;

    },
    async Create() {
      try {
        const response = await this.axios.post(
            this.$root.store.server_domain + "/users/createrecipe",
            {
                title: this.form.title,
                readyInMinutes: this.form.readyInMinutes,
                image: this.form.image,
                vegan: this.form.vegan,
                vegetarian: this.form.vegetarian,
                gluten_free: this.form.gluten_free,
                instructions: this.form.instructions,
                servings: this.form.servings,
                ingredientsNameAmount: this.form.ingredientsNameAmount,
            },
            {withCredentials: true},
        );
        this.$emit('Created');

      } catch (err) {
        console.log(err.response);
        this.form.submitError = err.response.data.message;
      }
    },
    onCreate() {
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }
      this.Create();
    },
    Reset() {
            this.form = {
            title: "",
            readyInMinutes: 5,
            image: undefined,
            vegan: false,
            vegetarian: false,
            gluten_free: false,
            instructions: "",
            servings: 1,
            ingredientsNameAmount: [
                {
                name: "",
                amount: ""
                }
            ],
            submitError: undefined,
        };
        console.log(this.$refs);
        this.$refs.imageUploadPreview.reset();
        this.$nextTick(() => {
            this.$v.$reset();
        });
    },
    addIngradiant(){
        this.form.ingredientsNameAmount.push({name: "", amount: ""});
    },
  }
};
</script>
<style lang="scss" scoped>
    .container {
        max-width: 750;
    }   
</style>
