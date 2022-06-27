<template>
  <div class="container">
    <h1 class="title">Create Your Own Recipe</h1>
    <b-form @submit.prevent="onCreate" @reset.prevent="onReset">
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
            <b-form-spinbutton 
                min="5" 
                max="600" 
                step="5"
                id="readyInMinutes"
                v-model="$v.form.readyInMinutes.$model"
                :state="validateState('readyInMinutes')"
            ></b-form-spinbutton>
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
            <b-form-spinbutton 
                min="1" 
                max="30" 
                step="1"
                id="servings"
                v-model="$v.form.servings.$model"
                :state="validateState('servings')"
            ></b-form-spinbutton>
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
                >

                <b-form-input 
                    v-model="ingredientAmount.ingredient.$model"
                    type="text"
                    placeholder="ingredient"
                    :state="validateNameAmountState(index, 'ingredient')"  
                ></b-form-input>
                <b-form-input
                    v-model="ingredientAmount.amount.$model"
                    type="number"
                    placeholder="amount"
                    :state="validateNameAmountState(index, 'amount')"  
                ></b-form-input>
                <b-form-invalid-feedback v-if="!ingredientAmount.amount.maxValue">
                    Amount too High
                </b-form-invalid-feedback>
                <b-form-invalid-feedback v-if="!ingredientAmount.ingredient.required">
                    Blank Ingredient
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
            <b-form-checkbox id="vegan" v-model="$v.form.vegan.$model">Vegan</b-form-checkbox>
            <b-form-checkbox id="vegetarian" v-model="$v.form.vegetarian.$model">Vegetarian</b-form-checkbox>
            <b-form-checkbox id="gluten_free" v-model="$v.form.gluten_free.$model">Gluten Free</b-form-checkbox>
        </b-form-group>

        <b-button type="reset" variant="danger" class="ml-5 w-25" >Reset</b-button>
        <b-button type="submit" variant="primary"  class="ml-5 w-50" >Create</b-button>
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
import ImageUploadPreview from '../components/ImageUploadPreview.vue';
import {
  required,
  minLength,
  maxValue,
  minValue,
  alpha,
  integer
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
        readyInMinutes: 5,
        image: undefined,
        vegan: false,
        vegetarian: false,
        gluten_free: false,
        instructions: "",
        servings: 1,
        ingredientsNameAmount: [
            {
            ingredient: "",
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
        alpha
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
      },
      servings: {
        integer
      },
      ingredientsNameAmount: {
        required,
        minLength: minLength(1),
        $each: {
            ingredient: {
                required,
            },
            amount: {
                required,
                integer,
                minValue: minValue(1),
                maxValue: maxValue(30)
            }
        }
    }
    }
  },
  mounted() {
    // this.form.ingredientsNameAmount.push({ingredient: "", amount: ""});
  },
  methods: {
    validateState(param) {
      const { $dirty, $error } = this.$v.form[param];
      return $dirty ? !$error : null;
    },
    validateNameAmountState(index, param) {
        let ind = parseInt(index);
        if(param === 'amount'){
            console.log(this.$v.form.ingredientsNameAmount.$each.$iter)
            const { $dirty, $error } = this.$v.form.ingredientsNameAmount.$each.$iter[ind][param];
            return $dirty ? !$error : null;
        }
        else{
            console.log(this.$v.form.ingredientsNameAmount.$each.$iter[ind])
            const { $dirty, $error } = this.$v.form.ingredientsNameAmount.$each.$iter[ind][param];
            return $dirty ? !$error : null;
        }

    },
    async Create() {
      try {
        const response = await this.axios.post(
          "http://localhost:3000" + "/user/createrecipe",

          {

          }
        );
        this.$router.push("/login");
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
    onReset() {
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
                ingredient: "",
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
        this.form.ingredientsNameAmount.push({ingredient: "", amount: ""});
    },
  }
};
</script>
<style lang="scss" scoped>
    .container {
        max-width: 500px;
    }   
</style>
