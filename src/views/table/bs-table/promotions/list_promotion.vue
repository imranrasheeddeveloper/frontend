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
                @click="page=1, getUsers()"
              >
                <feather-icon icon="SearchIcon" />
              </b-button>
            </b-input-group-prepend>
            <b-form-input
              v-model="searchTerm"
              placeholder="Search"
              type="text"
              class=" d-inline-block"
              @keyup="searchTimeOut()"
            />

            <b-input-group-append>
              <b-button
                v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                v-b-modal.modal-advancesearch
                variant="outline-primary"
              >
                Advance search
              </b-button>
            </b-input-group-append>
          </b-input-group>
        </div>
      </b-form-group>
      <b-form-group>
        <div class="d-flex align-items-center">
          <b-input-group>
            <b-input-group-prepend>
              <b-button
                v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                variant="primary"
                :to="{ name: 'add_promotions' }"
                title="Create Promotions"
              >
                ADD+
              </b-button>
            </b-input-group-prepend>
          </b-input-group>
        </div>
      </b-form-group>
    </div>

    <!-- Advance Search Model -->

    <b-table
      :items="items"
      :fields="fields"
      striped
      responsive
      class="mb-0"
      :busy="isBusy"
    >
      <template #cell(Options)="row">

        <div>
          <!-- As `row.showDetails` is one-way, we call the toggleDetails function on @change -->
          <b-form-group>
            <div class="d-flex align-items-center w-fit-content">
              <b-input-group>
                <b-input-group-prepend>
                  <b-button
                    v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                    size="sm"
                    variant="outline-primary"
                    :class="row.detailsShowing ? 'active' : ''"
                    @click="row.toggleDetails"
                  >
                    <feather-icon
                      v-if="row.detailsShowing"
                      icon="ChevronUpIcon"
                    />

                    <feather-icon
                      v-else
                      icon="ChevronDownIcon"
                    />
                  </b-button>
                </b-input-group-prepend>

                <b-input-group-append>
                  <b-button
                    v-ripple.400="'rgba(40, 199, 111, 0.15)'"
                    size="sm"
                    :to="{name: 'update_promo', params: { id: row.item.promo_code } }"
                    variant="outline-primary text-success"
                  >
                    <feather-icon icon="EditIcon" />
                  </b-button>
                </b-input-group-append>
                <b-input-group-append>
                  <b-button
                    v-ripple.400="'rgba(40, 199, 111, 0.15)'"
                    size="sm"
                    variant="outline-primary text-danger"
                    @click="deletePayment(row.item.id)"
                  >
                    <feather-icon icon="Trash2Icon" />
                  </b-button>
                </b-input-group-append>
              </b-input-group>
            </div>
          </b-form-group>
        </div>
      </template>

      <template #cell(status)="data">
        <b-badge
          pill
          :variant="statusVariant(data.value)"
        >
          {{ data.value }}
        </b-badge>
      </template>

      <!-- full detail on click -->

      <template #row-details="row">
        <b-card no-body>
          <b-row>
            <b-col
              cols="12"
              class="m-0 p-2"
            >
              <b-card-text>
                <b-row class="border-bottom">
                  <b-col cols="2">
                    <strong>max uses user</strong>
                  </b-col>
                  <b-col cols="10">
                    {{ row.item.max_uses_user }}
                  </b-col>
                </b-row>

                <b-row class="border-bottom">
                  <b-col cols="2">
                    <strong>max uses total</strong>
                  </b-col>
                  <b-col cols="10">
                    {{ row.item.max_uses_total }}
                  </b-col>
                </b-row>
                <b-row class="border-bottom">
                  <b-col cols="2">
                    <strong>start date</strong>
                  </b-col>
                  <b-col cols="10">
                    {{ row.item.promo_start_date }}
                  </b-col>
                </b-row>
                <b-row class="border-bottom">
                  <b-col cols="2">
                    <strong>end date</strong>
                  </b-col>
                  <b-col cols="10">
                    {{ row.item.promo_end_date }}
                  </b-col>
                </b-row>
              </b-card-text>
            </b-col>
          </b-row>
        </b-card>
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
import {
  BTable, BFormCheckbox, BButton, BCard, BRow, BCol, BAvatar, BBadge, BImg, BTabs, BTab, BCardText, BPagination, BFormGroup, BFormInput, BFormSelect, BDropdown, BDropdownItem, BInputGroup, BInputGroupAppend, BInputGroupPrepend, BFormDatepicker, BFormFile, BFormTextarea, BFormRadio, BForm, BFormCheckboxGroup, BFormRating, BListGroupItem, BListGroup, BPopover, BSpinner,
} from 'bootstrap-vue'

import Ripple from 'vue-ripple-directive'
import EnlargeableImage from '@diracleo/vue-enlargeable-image'
import Cleave from 'vue-cleave-component'
import { VueAutosuggest } from 'vue-autosuggest'

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
    VueAutosuggest,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      base_url: '',

      options: {
        penColor: '#000',
        backgroundColor: '#fff',
      },

      popoverShow: false,
      exportLimit: '',
      isBusy: true,
      fields: [{ key: 'Options', thClass: 'customHead' }, {
        key: 'id', label: 'Id', sortable: true, thClass: 'customHead',
      }, {
        key: 'promo_code', label: 'code', sortable: true, thClass: 'customHead',
      }, {
        key: 'promo_discount', label: 'Discount%', sortable: true, thClass: 'customHead',
      }, {
        key: 'promo_status', labe: 'promo status', sortable: true, thClass: 'customHead',
      },
      ],

      searchTerm: '',
      pageSize: 10,
      page: 1,
      count: 0,

      formValues: {
        request_type: '',
        request_owner: '',
        request_owner_id: '',
        payment_type: '',
        status: '',
      },
    }
  },

  mounted() {
    this.getPromotions()
  },
  methods: {

    closeSearch() {
      this.$refs.searchModel.hide()
    },

    onClose() {
      this.popoverShow = false
    },

    deletePayment(id) {
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
          axios.get(`/promotions/delete_promotion/${id}`).then(response => {
            if (response.data.hasOwnProperty('success')) {
              if (response.data.success === true) {
                this.getPromotions()

                this.$toast({
                  component: ToastificationContent,
                  position: 'top-right',
                  props: {
                    title: 'Payment Deleted Successfully',
                    icon: 'EditIcon',
                    variant: 'success',
                  },
                })
                console.log('Payment Deleted Successfully')
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
          }).catch(error => {
            console.error(error)
          })
        }
      })
    },
    getPromotions() {
      this.isBusy = true

      axios.get('/promotions/get_promos')
        .then(response => {
          console.log('response', response.data.data)
          this.items = response.data.data
          this.base_url = response.data.base_url
          this.count = response.data.totalRows
          this.isBusy = false

          // TODO
        }).catch(error => {
          console.error(error)
        })
    },

    handlePageChange(value) {
      this.page = value
      this.isBusy = true
      this.getPymentRequests()
    },

    searchTimeOut() {
      let timeout = null
      clearTimeout(timeout)
      // Make a new timeout set to go off in 800ms
      timeout = setTimeout(() => {
        this.page = 1
        this.getPymentRequests()
      }, 800)
    },
    statusVariant(ownerType) {
      if (ownerType === true) {
        return 'primary'
      }
      return 'warning'
    },
    Type_Change(item) {
      this.clearResourceOwner(item)
    },
    clearResourceOwner(item) {
      console.log('clear item ', item)
      this.formValues.request_owner = ''
      this.formValues.request_owner_id = ''

      this.filteredOptions = []
      console.log('clear item new', item)
    },
  },
}
</script>

<style lang="css" >

.enlargeable-image .full  {
  z-index:9999 !important;

  background-color: rgba(0,0,0,0.5) !important;
}

.customHead{

  background-color: #246BFD !important;
  color:#fff;
}

.tabs_margin_calss{
  margin-top: 5px !important;
  margin-bottom: 5px !important;

}

</style>
<style lang="scss">
@import '@core/scss/vue/libs/vue-autosuggest.scss';
</style>
