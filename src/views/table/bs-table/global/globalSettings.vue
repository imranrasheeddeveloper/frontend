<template>
  <b-form @submit.prevent>
    <b-row>

      <b-col md="6">
        <b-form-group
          label="Commission Percentage"
          label-for="v-commission_percentage"
        >
          <b-form-input
            id="v-commission_percentage'"
            v-model="formValues.commission_percentage"
          />
        </b-form-group>
      </b-col>
      <b-col md="6">
        <b-form-group
          label="Privay URL"
          label-for="v-privay_url"
        >
          <b-form-input
            id="v-privay_url'"
            v-model="formValues.privay_url"
          />
        </b-form-group>
      </b-col>
      <b-col md="6">
        <b-form-group
          label="Terms & Conditions URL"
          label-for="v-terms_and_conditions_url"
        >
          <b-form-input
            id="v-terms_and_conditions_url'"
            v-model="formValues.terms_and_conditions_url"
          />
        </b-form-group>
      </b-col>
      <b-col md="6">
        <b-form-group
          label="Base URL"
          label-for="v-base_url"
        >
          <b-form-input
            id="v-title'"
            v-model="formValues.base_url"
          />
        </b-form-group>
      </b-col>
      <b-col md="6">
        <b-form-group
          label="Chatwoot Account Id"
          label-for="v-chat_woot_account_id"
        >
          <b-form-input
            id="v-chat_woot_account_id'"
            v-model="formValues.chat_woot_account_id"
          />
        </b-form-group>
      </b-col>
      <b-col md="6">
        <b-form-group
          label="Chatwoot Inbox Id"
          label-for="v-inbox_id"
        >
          <b-form-input
            id="v-inbox_id'"
            v-model="formValues.inbox_id"
          />
        </b-form-group>
      </b-col>
      <b-col md="6">
        <b-form-group
          label="Chatwoot Api key"
          label-for="v-chat_api_key"
        >
          <b-form-input
            id="v-chat_api_key'"
            v-model="formValues.chat_api_key"
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
  BFormTimepicker,
  BCard,
  BSpinner,
  BFormFile,
  BFormTextarea,
  BInputGroupAppend,
  BInputGroup,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import vSelect from 'vue-select'
import axios from '@axios'
import { heightTransition } from '@core/mixins/ui/transition'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import { VueAutosuggest } from 'vue-autosuggest'

import Cleave from 'vue-cleave-component'
import 'cleave.js/dist/addons/cleave-phone.us'
import axiosIns from '@/libs/axios'

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
    Cleave,
    BInputGroup,
    BFormTimepicker,

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
        id: null,
        commission_percentage: '',
        privay_url: '',
        terms_and_conditions_url: '',
        base_url: '',
        chat_woot_account_id: '',
        inbox_id: '',
        chat_api_key: '',
      },
    }
  },
  mounted() {
    this.initTrHeight()
    this.getCategory()
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

      axios
        .post('groups/update_urls', this.formValues)
        .then(response => {
          if (response.data.hasOwnProperty('success')) {
            if (response.data.success === true) {
              console.log(response.data.data)

              this.$router.replace('/dashboard/ecommerce').then(() => {
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
    getCategory() {
      console.log(this.$route.params.id)
      axios.get('groups/get_urls/').then(response => {
        console.log(response.data)
        this.formValues = response.data.data
        this.initTrHeight()
        console.log('Category Fetched')
      }).catch(error => {
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
