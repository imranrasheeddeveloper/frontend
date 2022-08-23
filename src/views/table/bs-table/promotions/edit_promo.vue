<template>
  <b-form @submit.prevent>
    <b-row>

      <b-col md="6">
        <b-form-group
          label="Code"
          label-for="v-code"
        >
          <b-form-input
            id="v-code'"
            v-model="formValues.promo_code"
          />
        </b-form-group>
      </b-col>

      <b-col md="6">
        <b-form-group
          label="Discount"
          label-for="v-discount"
        >
          <b-form-input
            id="v-discount'"
            v-model="formValues.promo_discount"
          />
        </b-form-group>
      </b-col>

      <b-col md="6">
        <label for="v-promo_start_date">Start Date</label>
        <b-input-group>
          <cleave
            id="v-promo_start_date"
            v-model="formValues.promo_start_date"
            class="form-control"
            :raw="false"
            :options="options.date"
            placeholder="YYYY-MM-DD"
          />

          <b-input-group-append>
            <b-form-datepicker
              v-model="formValues.promo_start_date"
              show-decade-nav
              button-only
              right
              locale="en-US"
              aria-controls="v-promo_start_date"
            />
          </b-input-group-append>
        </b-input-group>
      </b-col>
      <b-col md="6">
        <label for="v-promo_end_date">End Date</label>
        <b-input-group>
          <cleave
            id="v-promo_end_date"
            v-model="formValues.promo_end_date"
            class="form-control"
            :raw="false"
            :options="options.date"
            placeholder="YYYY-MM-DD"
          />

          <b-input-group-append>
            <b-form-datepicker
              v-model="formValues.promo_end_date"
              show-decade-nav
              button-only
              right
              locale="en-US"
              aria-controls="v-promo_end_date"
            />
          </b-input-group-append>
        </b-input-group>
      </b-col>

      <b-col md="6">
        <b-form-group
          label="Promo Status"
          label-for="v-promo_status"
        >
          <v-select
            id="v-promo_status"
            v-model="formValues.promo_status"
            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
            :options="activeOptions"
            label="text"
            :reduce="(text) => text.value"
          />
        </b-form-group>
      </b-col>

      <b-col md="6">
        <b-form-group
          label="Number of Vouchers"
          label-for="v-max_uses_user"
        >
          <b-form-input
            id="v-max_uses_user'"
            v-model="formValues.max_uses_user"
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

      activeOptions: [{
        text: 'Yes',
        value: 'Yes',
      },
      {
        text: 'No',
        value: 'No',
      }],

      isSubmitting: false,

      formValues: {
        promo_code: '',
        promo_discount: '',
        promo_start_date: '',
        promo_end_date: '',
        promo_status: '',
        max_uses_user: '',
      },

    }
  },
  mounted() {
    this.initTrHeight()
    this.getPromotionDetails()
  },
  created() {
    window.addEventListener('resize', this.initTrHeight)
  },
  destroyed() {
    window.removeEventListener('resize', this.initTrHeight)
  },
  methods: {
    Submit() {
      if (this.formValues.promo_code === '') {
        this.isSubmitting = false
        this.$toast({
          component: ToastificationContent,
          position: 'top-right',
          props: {
            title: 'Please Enter Promo Code',
            icon: 'AlertCircleIcon',
            variant: 'danger',
          },
        })
        return
      }
      if (this.formValues.promo_code === '') {
        this.isSubmitting = false
        this.$toast({
          component: ToastificationContent,
          position: 'top-right',
          props: {
            title: 'Please Enter Promo Code',
            icon: 'AlertCircleIcon',
            variant: 'danger',
          },
        })
        return
      }
      if (this.formValues.promo_discount === '') {
        this.isSubmitting = false
        this.$toast({
          component: ToastificationContent,
          position: 'top-right',
          props: {
            title: 'Please Enter Discount',
            icon: 'AlertCircleIcon',
            variant: 'danger',
          },
        })
        return
      }
      if (this.formValues.promo_start_date === '') {
        this.isSubmitting = false
        this.$toast({
          component: ToastificationContent,
          position: 'top-right',
          props: {
            title: 'Please Enter Start Date',
            icon: 'AlertCircleIcon',
            variant: 'danger',
          },
        })
        return
      }
      if (this.formValues.promo_end_date === '') {
        this.isSubmitting = false
        this.$toast({
          component: ToastificationContent,
          position: 'top-right',
          props: {
            title: 'Please Enter End Date',
            icon: 'AlertCircleIcon',
            variant: 'danger',
          },
        })
        return
      }
      if (this.formValues.max_uses_user === '') {
        this.isSubmitting = false
        this.$toast({
          component: ToastificationContent,
          position: 'top-right',
          props: {
            title: 'Please Enter Number of Vouchers',
            icon: 'AlertCircleIcon',
            variant: 'danger',
          },
        })
        return
      }
      this.isSubmitting = true
      console.log('submit', this.formValues)
      if (this.formValues.promo_status === 'Yes') {
        this.formValues.promo_status = true
      } else {
        this.formValues.promo_status = false
      }
      const appendWithurl = `/promotions/update_promotion/${this.$route.params.id}`
      axios
        .post(appendWithurl, this.formValues)
        .then(response => {
          if (response.data.hasOwnProperty('success')) {
            if (response.data.success === true) {
              console.log(response.data.data)

              this.$router.replace('/promotions').then(() => {
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
    getPromotionDetails() {
      console.log(this.$route.params.id)
      const appendWithurl = `/promotions/get_promo_code_details/${this.$route.params.id}`
      axios.get(appendWithurl).then(response => {
        console.log(response.data)
        this.formValues = response.data.data
        if (this.formValues.promo_status === true) {
          this.formValues.promo_status = 'Yes'
        } else {
          this.formValues.promo_status = 'No'
        }
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
