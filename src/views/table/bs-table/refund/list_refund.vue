<template>
  <div>
    <!-- search input -->
    <div class="custom-search d-flex justify-content-between">
      <b-form-group>
        <div class="d-flex align-items-center">
          <!-- <label class="mr-1">Search</label> -->

          <b-input-group>
            <b-input-group-prepend>
              <b-button
                variant="outline-primary"
                @click="
                  page = 1;
                  Day = '';
                  getDocuments();
                "
              >
                <feather-icon icon="SearchIcon" />
              </b-button>
            </b-input-group-prepend>
            <b-form-input
              v-model="searchTerm"
              placeholder="Search"
              type="text"
              class="d-inline-block"
              @keyup="searchTimeOut()"
            />
          </b-input-group>
        </div>
      </b-form-group>
    </div>

    <div class="container">
      <b-row class="">
        <b-col
          md="3"
          class="border border-primary text-white p-1 m-1 rounded"
          style="
            background: linear-gradient(118deg, #06608f, rgba(6, 96, 143, 0.7));
          "
        >
          <strong>Pending Amount: </strong>
          {{ formValues.total_refunded_amount }}
        </b-col>

        <b-col
          md="3"
          class="border border-primary text-white p-1 m-1 rounded"
          style="
            background: linear-gradient(118deg, #06608f, rgba(6, 96, 143, 0.7));
          "
        >
          <strong>Due Amount : </strong>
          {{ formValues.total_refund_amount }}
        </b-col>
        <b-col
          md="3"
          class="border border-primary text-white p-1 m-1 rounded"
          style="
            background: linear-gradient(118deg, #06608f, rgba(6, 96, 143, 0.7));
          "
        >
          <strong>Pending Requests : </strong>
          {{ formValues.pending_requests }}
        </b-col>
      </b-row>
    </div>

    <b-table
      :items="items"
      :fields="fields"
      responsive
      class="mb-0 bg-white"
      :busy="isBusy"
    >

      <template #cell(status)="data">
        <b-form-checkbox
          v-model="data.item.status"
          type="checkbox"
          class="m-0"
          @change="accept_status(data.item)"
        >
          <b-badge
            pill
            :variant="accept_statusVariant(data.value)"
          >
            <span
              v-if="data.value == true"
              class="text-white"
            >Accept</span>
            <span
              v-if="data.value == false"
              class="text-white"
            >Not Accept</span>
          </b-badge>
        </b-form-checkbox>
      </template>

      <template #table-busy>
        <div class="text-center text-primary my-2">
          <b-spinner class="align-middle" />
          <strong>Loading...</strong>
        </div>
      </template>
    </b-table>

    <div class="d-flex justify-content-end">
      <b-pagination
        v-model="page"
        :total-rows="count"
        :per-page="pageSize"
        pills
        @change="handlePageChange"
      />
    </div>
  </div>
</template>

<script>
import BCardCode from '@core/components/b-card-code/BCardCode.vue'
import axios from '@axios'
import vSelect from 'vue-select'
import { VueAutosuggest } from 'vue-autosuggest'

import {
  BTable,
  BFormCheckbox,
  BButton,
  BCard,
  BRow,
  BCol,
  BAvatar,
  BBadge,
  BImg,
  BTabs,
  BTab,
  BCardText,
  BPagination,
  BFormGroup,
  BFormInput,
  BFormSelect,
  BDropdown,
  BDropdownItem,
  BInputGroup,
  BInputGroupAppend,
  BInputGroupPrepend,
  BFormDatepicker,
  BFormFile,
  BFormTextarea,
  BFormRadio,
  BForm,
  BFormCheckboxGroup,
  BFormRating,
  BListGroupItem,
  BListGroup,
  BPopover,
  BSpinner,
} from 'bootstrap-vue'
import Cleave from 'vue-cleave-component'
import 'cleave.js/dist/addons/cleave-phone.us'

import Ripple from 'vue-ripple-directive'
import EnlargeableImage from '@diracleo/vue-enlargeable-image'

import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default {
  components: {
    BCardCode,
    BTable,
    BButton,
    BFormCheckbox,
    BCard,
    BRow,
    BCol,
    BBadge,
    BAvatar,
    BImg,
    EnlargeableImage,
    BTabs,
    BTab,
    BCardText,
    BPagination,
    BFormGroup,
    BFormInput,
    VueAutosuggest,
    BFormSelect,
    BDropdown,
    BDropdownItem,
    BInputGroup,
    BInputGroupAppend,
    BInputGroupPrepend,
    BFormDatepicker,
    BFormFile,
    BFormTextarea,
    BFormRadio,
    BForm,
    vSelect,
    BFormCheckboxGroup,
    BFormRating,
    BListGroup,
    BListGroupItem,
    BPopover,
    BSpinner,
    Cleave,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      Day: '',
      walletId: null,
      popoverShow: false,
      base_url: '',
      isSubmitting: false,

      exportLimit: '',
      isBusy: true,

      formValues: {
        total_refund_amount: '',
        total_refunded_amount: '',
        pending_requests: '',
      },
      fields: [
        {
          key: 'id',
          label: 'ID',
          sortable: true,
          thClass: 'customHead',
        },
        {
          key: 'amount',
          label: 'amount',
          sortable: true,
          thClass: 'customHead',
        },

        {
          key: 'refund_request.userId',
          label: 'userId',
          sortable: true,
          thClass: 'customHead',
        },
        {
          key: 'upi_id',
          label: 'UPI',
          sortable: true,
          thClass: 'customHead',
        },
        {
          key: 'createdAt',
          label: 'createdAt',
          sortable: true,
          thClass: 'customHead',
        },
        {
          key: 'status',
          label: 'status',
          thClass: 'customHead',
        },
      ],

      /* eslint-disable global-require */

      searchTerm: '',
      pageSize: 10,
      page: 1,
      count: 0,

      tableData: [0],
      wallet__data_values: {},
    }
  },

  mounted() {
    this.walletId = this.$route.params.id
    this.getWallet()
    this.getDocuments()
  },
  methods: {
    onClose() {
      this.popoverShow = false
    },

    accept_status(item) {
      axios
        .get(`/refund/update_request/${item.id}/${item.status}`)
        .then(response => {
          if (response.data.hasOwnProperty('success')) {
            if (response.data.success === true) {
              this.getWallet()
              this.$toast({
                component: ToastificationContent,
                position: 'top-right',
                props: {
                  title: 'Transaction updated Successfully',
                  icon: 'EditIcon',
                  variant: 'success',
                },
              })
              console.log('Transaction Updated Successfully')
              this.isSubmitting = false
            } else {
              this.$toast({
                component: ToastificationContent,
                position: 'top-right',
                props: {
                  title: 'Error',
                  icon: 'AlertCircleIcon',
                  variant: 'danger',
                  text:
                  'Something went wrong, try again later',
                },
              })
              this.isSubmitting = false
            }
          } else {
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
    getWallet() {
      console.log(this.$route.params.id)

      axios
        .get('/refund/circulation_amount', {
          params: {
            id: this.$route.params.id,
          },
        })
        .then(response => {
          if (response.data.hasOwnProperty('success')) {
            if (response.data.success === true) {
              console.log(response.data.data)
              console.log('tableData', this.wallet__data_values)

              this.formValues.total_refund_amount = response.data.total_refund_amount.total_amount
              this.formValues.total_refunded_amount = response.data.total_refunded_amount.total_amount
              this.formValues.pending_requests = response.data.pending_requests

              if (response.data.total_refund_amount.total_amount == null) {
               this.formValues.total_refund_amount = 0
              }
              if (response.data.total_refunded_amount.total_amount == null) {
              this.formValues.total_refunded_amount = 0
              }

              // this.initTrHeight();

              console.log(this.formValues.pending_requests, response.data.pending_requests)
            } else {
              this.$toast({
                component: ToastificationContent,
                position: 'top-right',
                props: {
                  title: 'Error',
                  icon: 'AlertCircleIcon',
                  variant: 'danger',
                  text:
                  'Something went wrong, try again later',
                },
              })
            }
          } else {
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

    deleteDocument(id) {
      console.log(id)
      this.$swal({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        customClass: {
          confirmButton: 'btn btn-danger',
          cancelButton: 'btn btn-outline-danger ml-1',
        },
        buttonsStyling: false,
      }).then(result => {
        if (result.value) {
          axios
            .post(`/refund/delete_request/${id}`, {
              id,
            })
            .then(response => {
              if (response.data.hasOwnProperty('success')) {
                if (response.data.success === true) {
                  this.getDocuments()
                  this.$toast({
                    component: ToastificationContent,
                    position: 'top-right',
                    props: {
                      title:
                      'Transaction Deleted Successfully',
                      icon: 'EditIcon',
                      variant: 'success',
                    },
                  })
                  console.log(
                    'Transaction Deleted Successfully',
                  )
                } else {
                  this.$toast({
                    component: ToastificationContent,
                    position: 'top-right',
                    props: {
                      title: 'Error',
                      icon: 'AlertCircleIcon',
                      variant: 'danger',
                      text:
                      'Something went wrong, try again later',
                    },
                  })
                }
              } else {
                this.$toast({
                  component: ToastificationContent,
                  position: 'top-right',
                  props: {
                    title: 'Error',
                    icon: 'AlertCircleIcon',
                    variant: 'danger',
                    text:
                    'Something went wrong, try again later',
                  },
                })
              }
            })
            .catch(error => {
              console.error(error)
            })
        }
      })
    },

    getDocuments() {
      this.isBusy = true

      axios
        .get(`/refund/refund_reqests/${this.page}`)

        .then(response => {
          console.log('response', response.data.data)
          this.items = response.data.data
          this.base_url = response.data.base_url
          this.count = response.data.totalRows
          this.isBusy = false

          // TODO
        })
        .catch(error => {
          console.error(error)
        })
      this.getWallet()
    },

    accept_statusVariant(status) {
      if (status === true) {
        return 'success'
      } if (status === false) {
        return 'danger'
      }
    },

    handlePageChange(value) {
      this.page = value
      this.isBusy = true
      this.getDocuments()
    },

    searchTimeOut() {
      let timeout = null
      clearTimeout(timeout)
      // Make a new timeout set to go off in 1000ms
      timeout = setTimeout(() => {
        this.page = 1
        this.getDocuments()
      }, 1000)
    },

    closeSearch() {
      this.$refs.searchModel.hide()
    },
    resetSearch() {
      console.log(this.formValues)

      Object.entries(this.formValues).forEach(([key, value]) => {
        {
          this.formValues[key] = ''
        }
      })

      console.log(this.formValues)
    },
  },
}
</script>

<style lang="css">
.enlargeable-image .full {
    z-index: 9999 !important;

    background-color: rgba(0, 0, 0, 0.5) !important;
}

.customHead {
    background-color: #06608f !important;
    color: #fff;
}</style
><style>
textarea {
    resize: none;
}

input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

.hr_divider {
    border-bottom: 2px solid #82868b;
}</style
><style lang="scss">
@import "@core/scss/vue/libs/vue-autosuggest.scss";
</style>
