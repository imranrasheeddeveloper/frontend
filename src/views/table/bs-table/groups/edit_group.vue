<template>
  <b-form @submit.prevent>
    <b-row>

      <b-col md="6">
        <b-form-group
          label="ID"
          label-for="v-id"
        >
          <b-form-input
            id="v-id'"
            v-model="formValues.id"
          />
        </b-form-group>
      </b-col>

      <b-col md="6">
        <b-form-group
          label="Group Title"
          label-for="v-group_title"
        >
          <b-form-input
            id="v-group_title'"
            v-model="formValues.group_title"
          />
        </b-form-group>
      </b-col>

      <b-col md="6">
        <b-form-group
          label="Slots"
          label-for="v-slots"
        >
          <b-form-input
            id="v-slots'"
            v-model="formValues.slots"
          />
        </b-form-group>
      </b-col>

      <b-col md="6">
        <b-form-group
          label="Slots"
          label-for="v-slots"
        >
          <b-form-input
            id="v-slots'"
            v-model="formValues.slots"
          />
        </b-form-group>
      </b-col>

      <b-col md="6">
        <b-form-group
          label="Slots"
          label-for="v-slots"
        >
          <b-form-input
            id="v-slots'"
            v-model="formValues.slots"
          />
        </b-form-group>
      </b-col>

      <b-col md="6">
        <b-form-group
          label="Slots"
          label-for="v-slots"
        >
          <b-form-input
            id="v-slots'"
            v-model="formValues.slots"
          />
        </b-form-group>
      </b-col>

      <b-col md="6">
        <b-form-group
          label="Slots"
          label-for="v-slots"
        >
          <b-form-input
            id="v-slots'"
            v-model="formValues.slots"
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
          label="password"
          label-for="v-password"
        >
          <b-form-input
            id="v-slots'"
            v-model="formValues.password"
          />
        </b-form-group>
      </b-col>
      <b-col md="6">
        <b-form-group
          label="visibility"
          label-for="v-visibility"
        >
          <b-form-input
            id="v-slots'"
            v-model="formValues.visibility"
          />
        </b-form-group>
      </b-col>
      <b-col md="6">
        <b-form-group
          label="group_id"
          label-for="v-group_id"
        >
          <b-form-input
            id="v-group_id'"
            v-model="formValues.group_id"
          />
        </b-form-group>
      </b-col>
      <b-col md="6">
        <b-form-group
          label="user_id"
          label-for="v-user_id"
        >
          <b-form-input
            id="v-user_id'"
            v-model="formValues.user_id"
          />
        </b-form-group>
      </b-col>
      <b-col md="6">
        <b-form-group
          label="total_members"
          label-for="v-total_members"
        >
          <b-form-input
            id="v-total_members'"
            v-model="formValues.total_members"
          />
        </b-form-group>
      </b-col>
      <b-col md="6">
        <b-form-group
          label="plan_id"
          label-for="v-plan_id"
        >
          <b-form-input
            id="v-plan_id'"
            v-model="formValues.plan_id"
          />
        </b-form-group>
      </b-col>
      <b-col md="6">
        <b-form-group
          label="title"
          label-for="v-title"
        >
          <v-select
            id="v-title"
            v-model="formValues.title"
            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
            :options="categories_list"
            label="text"
            :reduce="(text) => text.value"
          />
        </b-form-group>
      </b-col>
      <b-col md="6">
        <b-form-group
          label="sub_cat_title"
          label-for="v-sub_cat_title"
        >
          <v-select
            id="v-sub_cat_title"
            v-model="formValues.sub_cat_title"
            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
            :options="sub_category_list"
            label="text"
            :reduce="(text) => text.value"
          />
        </b-form-group>
      </b-col>
      <b-col md="6">
        <b-form-group
          label="name"
          label-for="v-name"
        >
          <v-select
            id="v-pouplar"
            v-model="formValues.name"
            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
            :options="plan_list"
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
        id: '',
        group_title: '',
        slots: '',
        cost_per_member: '',
        email: '',
        password: '',
        visibility: '',
        group_id: '',
        user_id: '',
        sub_category_id: '',
        category_id: '',
        total_members: '',
        plan_id: '',
        status: '',
        plans_id: '',
        createdAt: '',
        updatedAt: '',
        sub_cat_title: '',
        title: '',
        name: '',
      },
      categories_list: [],
      sub_category_list: [],
      plan_list: [],
    }
  },
  mounted() {
    this.getGroupDetails(this.$route.params.id)
    this.get_cat_list()
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
      if (this.formValues.question === '') {
        this.isSubmitting = false
        this.$toast({
          component: ToastificationContent,
          position: 'top-right',
          props: {
            title: 'Please Enter question',
            icon: 'AlertCircleIcon',
            variant: 'danger',
          },
        })
        return
      }
      if (this.formValues.answer === '') {
        this.isSubmitting = false
        this.$toast({
          component: ToastificationContent,
          position: 'top-right',
          props: {
            title: 'Please enter answer',
            icon: 'AlertCircleIcon',
            variant: 'danger',
          },
        })
        return
      }

      axios
        .post(`/faqs/updateFAQs/${this.$route.params.id}`, this.formValues)
        .then(response => {
          if (response.data.hasOwnProperty('success')) {
            if (response.data.success === true) {
              console.log(response.data.data)

              this.$router.replace('/faqs').then(() => {
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
    getGroupDetails(id) {
      axios
        .get(`/groups/group_deatils/${id}`)
        .then(response => {
          if (response.data.hasOwnProperty('success')) {
            if (response.data.success === true) {
              this.formValues.id = response.data.data.group.id
              this.formValues.group_title = response.data.data.group.group_title
              this.formValues.slots = response.data.data.group.slots
              this.formValues.cost_per_member = response.data.data.group.cost_per_member
              this.formValues.email = response.data.data.group.email
              this.formValues.password = response.data.data.group.password
              this.formValues.visibility = response.data.data.group.visibility
              this.formValues.group_id = response.data.data.group.group_id
              this.formValues.user_id = response.data.data.group.user_id
              this.formValues.total_members = response.data.data.group.total_members
              this.formValues.plan_id = response.data.data.group.plan_id
              this.formValues.status = response.data.data.group.status
              this.formValues.plans_id = response.data.data.group.plans_id
              this.formValues.sub_cat_title = response.data.data.group.sub_category.sub_cat_title
              this.formValues.title = response.data.data.group.sub_category.category.title
              this.formValues.name = response.data.data.plan.name
              this.formValues.category_id = response.data.data.group.sub_category.category_id
              this.get_sub_cat_list(this.formValues.category_id)
              this.get_plans_list(response.data.data.group.sub_category.id)
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
    get_cat_list() {
      axios
        .get('/groups/categories_list')
        .then(response => {
          if (response.data.hasOwnProperty('success')) {
            if (response.data.success === true) {
              this.categories_list = response.data.data
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
    get_sub_cat_list(id) {
      axios
        .get(`/groups/sub_categories_list/${id}`)
        .then(response => {
          if (response.data.hasOwnProperty('success')) {
            if (response.data.success === true) {
              this.sub_category_list = response.data.data
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
    get_plans_list(id) {
      axios
        .get(`/groups/plans_list/${id}`)
        .then(response => {
          if (response.data.hasOwnProperty('success')) {
            if (response.data.success === true) {
              this.plan_list = response.data.data
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
