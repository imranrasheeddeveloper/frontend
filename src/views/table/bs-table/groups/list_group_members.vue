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
                @click="page=1, getGroups()"
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
          </b-input-group>

        </div>
      </b-form-group>

    </div>

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
                    variant="outline-primary text-danger"
                    @click="deleteDocument(row.item.user_id , row.item.group_id)"
                  >
                    <feather-icon icon="Trash2Icon" />
                  </b-button>
                </b-input-group-append>

              </b-input-group>
            </div>
          </b-form-group>
        </div>
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
                    <strong>enrollment_active</strong>
                  </b-col>
                  <b-col cols="10">
                    <b-badge
                      v-if="row.item.enrollment_active === true"
                      pill
                      variant="success"
                    >
                      Active
                    </b-badge>
                    <b-badge
                      v-if="row.item.enrollment_active === false"
                      pill
                      variant="danger"
                    >
                      Not Active
                    </b-badge>
                  </b-col>
                </b-row>

                <b-row class="border-bottom">
                  <b-col cols="2">
                    <strong>Otp Requsted</strong>
                  </b-col>
                  <b-col cols="10">
                    {{ row.item.otp_requsted }}
                  </b-col>
                </b-row>
                <b-row class="border-bottom">
                  <b-col cols="2">
                    <strong>Payment Status</strong>
                  </b-col>
                  <b-col cols="10">
                    {{ row.item.payment_status }}
                  </b-col>
                </b-row>
                <b-row class="border-bottom">
                  <b-col cols="2">
                    <strong>Entrollment Date</strong>
                  </b-col>
                  <b-col cols="10">
                    {{ row.item.createdAt }}
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
import 'cleave.js/dist/addons/cleave-phone.us'
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
      popoverShow: false,
      exportLimit: '',
      isBusy: true,
      fields: [{ key: 'Options', thClass: 'customHead' }, {
        key: 'id', label: 'Id', sortable: true, thClass: 'customHead',
      }, {
        key: 'user.name', label: 'Full Name', sortable: true, thClass: 'customHead',
      }, {
        key: 'user.phone', label: 'Phone', sortable: true, thClass: 'customHead',
      }, {
        key: 'enrollment_status', labe: 'Enrollment', sortable: true, thClass: 'customHead',
      },
      ],
      items: [
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
    this.getGroupMembers()
  },
  methods: {

    closeSearch() {
      this.$refs.searchModel.hide()
    },
    resetSearch() {
      Object.entries(this.formValues).forEach(([key, value]) => {
        if (key == 'skills') {
          this.formValues[key] = []
        } else if (key == 'lang_eng' || key == 'lang_ar' || key == 'lang_hind' || key == 'appearance_presentable') {
          this.formValues[key] = null
        } else {
          this.formValues[key] = ''
        }
      })

      console.log(this.formValues)
    },

    onClose() {
      this.popoverShow = false
    },

    statusVariant(ownerType) {
      if (ownerType === 'Unpaid') {
        return 'danger'
      }
      if (ownerType === 'Paid') {
        return 'success'
      }
      if (ownerType === 'Partially Paid') {
        return 'warning'
      }

      return 'primary'
    },

    getGroupMembers() {
      this.isBusy = true

      axios.get(`groups/groupMembers/${this.$route.params.id}`)

        .then(response => {
          console.log('response', response.data.data)
          this.items = response.data.data
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
      this.getGroups()
    },

    searchTimeOut() {
      let timeout = null
      clearTimeout(timeout)
      // Make a new timeout set to go off in 800ms
      timeout = setTimeout(() => {
        this.page = 1
        this.getGroupMembers()
      }, 800)
    },
    deleteDocument(user_id, group_id) {
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
          const body = JSON.stringify({
            user_id,
            group_id,
          })
          const url = '/groups/remove_member_from_group'
          const authOptions = {
            method: 'post',
            url,
            data: body,
            headers: {
              'Content-Type': 'application/json',
            },
            json: true,
          }
          axios(authOptions)
            .then(response => {
              if (response.data.hasOwnProperty('success')) {
                if (response.data.success === true) {
                  this.getGroupMembers()
                  this.$toast({
                    component: ToastificationContent,
                    position: 'top-right',
                    props: {
                      title: 'Group Closed successfully',
                      icon: 'EditIcon',
                      variant: 'danger',
                    },
                  })
                  console.log('Group Closed Successfully')
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
            })
            .catch(error => {
              console.error(error)
            })
        }
      })
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
