<template>
  <b-form @submit.prevent>
    <b-row>

      <b-col md="6">
        <b-form-group
          label="Title"
          label-for="v-title"
        >
          <b-form-input
            id="v-title'"
            v-model="formValues.sub_cat_title"
          />
        </b-form-group>
      </b-col>

      <b-col md="6">
        <b-form-group
          label="Validation Type"
          label-for="v-validation_type"
        >
          <v-select
            id="v-validation_type"
            v-model="formValues.validation_type"
            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
            :options="validation_type_options"
            label="text"
            :reduce="(text) => text.value"
          />
        </b-form-group>
      </b-col>
      <b-col md="6">
        <b-form-group
          label="Pouplar"
          label-for="v-pouplar"
        >
          <v-select
            id="v-pouplar"
            v-model="formValues.is_popular"
            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
            :options="is_popular_options"
            label="text"
            :reduce="(text) => text.value"
          />
        </b-form-group>
      </b-col>
      <!-- submit and reset -->
      <b-col md="12">
        <b-button
          v-ripple.400="'rgba(255, 255, 255, 0.15)'"
          type="submit"
          variant="primary"
          class="mr-1"
          :disabled="isSubmitting"
          @click="Submit"
        >
          <b-spinner
            v-if="isSubmitting"
            small
          />
          <span v-if="isSubmitting">Please Wait</span>

          <span v-if="!isSubmitting">Submit</span>
        </b-button>
      </b-col>
    </b-row>
  </b-form>
</template>

<script>
import {
  BRow,
  BCol,
  BFormGroup,
  BFormInput,
  BFormCheckbox,
  BForm,
  BButton,
  BFormDatepicker,
  BCard,
  BSpinner,
  BFormFile,
  BFormTextarea,
  BInputGroupAppend,
  BInputGroup,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import axios from '@axios'
import { heightTransition } from '@core/mixins/ui/transition'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import vSelect from 'vue-select'

export default {
  components: {
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BFormCheckbox,
    BForm,
    BButton,
    BFormDatepicker,
    BCard,
    BSpinner,
    BFormFile,
    BFormTextarea,
    BInputGroupAppend,
    BInputGroup,
    vSelect,
  },
  directives: {
    Ripple,
  },

  mixins: [heightTransition],

  data() {
    return {
      options: {
        date: {
          date: true,
          delimiter: '-',
          datePattern: ['Y', 'm', 'd'],
        },
      },

      isSubmitting: false,

      formValues: {
        sub_cat_title: '',
        validation_type: '',
        is_popular: '',
        category_id: '',
      },

      validation_type_options: [
        {
          text: 'otp',
          value: 'otp',
        },
        {
          text: 'auth',
          value: 'auth',
        },
        {
          text: 'otp/auth',
          value: 'otp/auth',
        },
      ],
      is_popular_options: [{
        text: 'Yes',
        value: 'Yes',
      },
      {
        text: 'No',
        value: 'No',
      }],
    }
  },
  mounted() {
    this.formValues.category_id = this.$route.params.id
    this.initTrHeight()
  },
  created() {
    window.addEventListener('resize', this.initTrHeight)
  },
  destroyed() {
    window.removeEventListener('resize', this.initTrHeight)
  },
  methods: {
    Submit() {
      this.isSubmitting = true
      console.log('submit', this.formValues)
      if (this.formValues.sub_cat_title === '') {
        this.isSubmitting = false
        this.$toast({
          component: ToastificationContent,
          position: 'top-right',
          props: {
            title: 'Please Enter Title',
            icon: 'AlertCircleIcon',
            variant: 'danger',
          },
        })
        return
      }
      if (this.formValues.validation_type === '') {
        this.isSubmitting = false
        this.$toast({
          component: ToastificationContent,
          position: 'top-right',
          props: {
            title: 'Please select validation type',
            icon: 'AlertCircleIcon',
            variant: 'danger',
          },
        })
        return
      }
      if (this.formValues.is_popular === '') {
        this.isSubmitting = false
        this.$toast({
          component: ToastificationContent,
          position: 'top-right',
          props: {
            title: 'Please select is Popular',
            icon: 'AlertCircleIcon',
            variant: 'danger',
          },
        })
        return
      }
      if (this.formValues.is_popular === 'Yes') {
        this.formValues.is_popular = true
      } else {
        this.formValues.is_popular = false
      }

      axios
        .post('/groups/create_sub_categories', this.formValues)
        .then(response => {
          if (response.data.hasOwnProperty('success')) {
            if (response.data.success === true) {
              console.log(response.data.data)

              this.$router.replace(`/sub_categories/${this.formValues.category_id}`).then(() => {
                this.$toast({
                  component: ToastificationContent,
                  position: 'top-right',
                  props: {
                    title: response.data.message,
                    icon: 'EditIcon',
                    variant: 'success',
                  },
                })
              })
            } else {
              this.isSubmitting = false

              this.$toast({
                component: ToastificationContent,
                position: 'top-right',
                props: {
                  title: response.data.message,
                  icon: 'AlertCircleIcon',
                  variant: 'danger',
                },
              })
            }
          } else {
            this.isSubmitting = false

            this.$toast({
              component: ToastificationContent,
              position: 'top-right',
              props: {
                title: 'Error',
                icon: 'AlertCircleIcon',
                variant: 'danger',
                text: 'Something went wrong, try again later',
              },
            })
          }
        })
        .catch(error => {
          console.error(error)
        })
    },
    initTrHeight() {
      this.trSetHeight(null)
      this.$nextTick(() => {
        // this.trSetHeight(this.$refs.form.scrollHeight);
      })
    },
  },
}
</script>

<style>
textarea {
  resize: vertical;
}
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.hr_divider {
  border-bottom: 2px solid #82868b;
}
</style>
<style lang="scss">
@import "@core/scss/vue/libs/vue-autosuggest.scss";
</style>
