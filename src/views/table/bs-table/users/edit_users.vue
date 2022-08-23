<template>
  <b-form @submit.prevent>
    <b-row>

      <b-col md="6">
        <b-form-group
          label="Phone"
          label-for="v-phone"
        >
          <b-form-input
            id="v-phone'"
            v-model="formValues.phone"
          />
        </b-form-group>
      </b-col>
      <b-col md="6">
        <b-form-group
          label="otpHash"
          label-for="v-otpHash"
        >
          <b-form-input
            id="v-otpHash'"
            v-model="formValues.otpHash"
          />
        </b-form-group>
      </b-col>
      <b-col md="6">
        <b-form-group
          label="name"
          label-for="v-name"
        >
          <b-form-input
            id="v-name'"
            v-model="formValues.name"
          />
        </b-form-group>
      </b-col>
      <b-col md="6">
        <b-form-group
          label="online_ofline_status"
          label-for="v-online_ofline_status"
        >
          <b-form-input
            id="v-online_ofline_status'"
            v-model="formValues.online_ofline_status"
          />
        </b-form-group>
      </b-col>
      <b-col md="6">
        <b-form-group
          label="splitur_score"
          label-for="v-splitur_score"
        >
          <b-form-input
            id="v-splitur_score'"
            v-model="formValues.splitur_score"
          />
        </b-form-group>
      </b-col>
      <b-col md="6">
        <b-form-group
          label="coins"
          label-for="v-coins"
        >
          <b-form-input
            id="v-coins'"
            v-model="formValues.coins"
          />
        </b-form-group>
      </b-col>
      <b-col md="6">
        <b-form-group
          label="wallet_balance"
          label-for="v-wallet_balance"
        >
          <b-form-input
            id="v-wallet_balance'"
            v-model="formValues.wallet_balance"
          />
        </b-form-group>
      </b-col>
      <b-col md="6">
        <b-form-group
          label="source_id"
          label-for="v-source_id"
        >
          <b-form-input
            id="v-source_id'"
            v-model="formValues.source_id"
          />
        </b-form-group>
      </b-col>

      <b-col md="6">
        <b-form-group
          label="email"
          label-for="v-email"
        >
          <b-form-input
            id="v-email'"
            v-model="formValues.email"
          />
        </b-form-group>
      </b-col>

      <b-col md="6">
        <b-form-group
          label="contact_id"
          label-for="v-contact_id"
        >
          <b-form-input
            id="v-contact_id'"
            v-model="formValues.contact_id"
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
        phone: '',
        otpHash: '',
        name: '',
        avatar: '',
        userId: '',
        online_ofline_status: '',
        splitur_score: '',
        coins: null,
        wallet_balance: '',
        email: '',
        source_id: '',
        contact_id: '',
      },
    }
  },
  mounted() {
    this.initTrHeight()
    this.formValues.id = this.$route.params.id
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
      const body = this.formValues
      console.log('submit', this.formValues)

      axios
        .post('/groups/updateUser', {
          body,
        })
        .then(response => {
          if (response.data.hasOwnProperty('success')) {
            if (response.data.success === true) {
              console.log(response.data.data)

              this.$router.replace('/categories').then(() => {
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
      const appendWithurl = `groups/get_user_by_id/${this.$route.params.id}`

      axios.get(appendWithurl).then(response => {
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
