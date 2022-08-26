<template>
  <div>
    <!-- search input -->
    <div class="custom-search d-flex justify-content-between">
      <b-form-group>
        <div class="d-flex align-items-center">
          <b-input-group>
            <b-input-group-prepend>
              <b-button
                variant="outline-primary"
                @click="
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
      <b-form-group>
        <div class="d-flex align-items-center">
          <b-input-group>
            <b-input-group-prepend>
              <b-button
                v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                variant="primary"
                :to="{ name: 'add_category' }"
                title="Create Category"
              >
                ADD+
              </b-button>
            </b-input-group-prepend>
          </b-input-group>
        </div>
      </b-form-group>
    </div>
    <b-table
      :items="items"
      :fields="fields"
      responsive
      class="mb-0 bg-white"
      :busy="isBusy"
    >
      <template #cell(Options)="row">
        <!-- As `row.showDetails` is one-way, we call the toggleDetails function on @change -->
        <b-form-group>
          <div class="d-flex align-items-center w-fit-content">
            <b-input-group>
              <b-input-group-prepend>
                <b-button
                  v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                  size="sm"
                  variant="outline-primary"
                  :to="{
                    name: 'sub_categories',
                    params: { id: row.item.id },
                  }"
                >
                  <feather-icon icon="SearchIcon" />
                </b-button>
              </b-input-group-prepend>
              <b-input-group-append>
                <b-button
                  v-ripple.400="'rgba(40, 199, 111, 0.15)'"
                  size="sm"
                  :to="{ name: 'edit_category', params: { id: row.item.id } }"
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
                  @click="deleteDocument(row.item.id)"
                >
                  <feather-icon icon="Trash2Icon" />
                </b-button>
              </b-input-group-append>
            </b-input-group>
          </div>
        </b-form-group>
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
import axios from '@axios'

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

import Ripple from 'vue-ripple-directive'

import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default {
  components: {
    BTable,
    BButton,
    BFormCheckbox,
    BCard,
    BRow,
    BCol,
    BBadge,
    BAvatar,
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
    BListGroup,
    BListGroupItem,
    BPopover,
    BSpinner,

  },
  directives: {
    Ripple,
  },
  data() {
    return {
      Day: '',
      popoverShow: false,
      base_url: '',
      isSubmitting: false,

      filteredOptions: [],

      formValues: {
        title: '',
        searchTerm: '',
      },
      options: {
        date: {
          date: true,
          delimiter: '-',
          datePattern: ['Y', 'm', 'd'],
        },
      },
      exportLimit: '',
      isBusy: true,
      fields: [
        {
          key: 'Options',
          thClass: 'customHead',
        },
        {
          key: 'id',
          label: 'ID',
          sortable: true,
          thClass: 'customHead',
        },
        {
          key: 'title',
          label: 'Title',
          sortable: true,
          thClass: 'customHead',
        },
        {
          key: 'createdAt',
          label: 'created at',
          sortable: true,
          thClass: 'customHead',
        },
      ],
      items: [],
      /* eslint-disable global-require */

      searchTerm: '',
      pageSize: 10,
      page: 1,
      count: 0,
    }
  },

  mounted() {
    this.getDocuments()
  },
  methods: {
    onClose() {
      this.popoverShow = false
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
            .get(`groups/delete_category/${id}`)
            .then(response => {
              if (response.data.hasOwnProperty('success')) {
                if (response.data.success === true) {
                  this.getDocuments()
                  this.$toast({
                    component: ToastificationContent,
                    position: 'top-right',
                    props: {
                      title: 'Transaction Deleted Successfully',
                      icon: 'EditIcon',
                      variant: 'success',
                    },
                  })
                  console.log('Transaction Deleted Successfully')
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

    getDocuments() {
      this.isBusy = true

      axios
        .get('/groups/get_categories')

        .then(response => {
          console.log('response', response.data.data)
          this.items = response.data.data
          this.isBusy = false

          // TODO
        })
        .catch(error => {
          console.error(error)
        })
    },

    handlePageChange(value) {
      this.page = value
      this.isBusy = true
      this.getDocuments()
    },
    searchCategory() {
      this.isBusy = true
      axios
        .get(`/groups/search_categories/${this.formValues.searchTerm}`)
        .then(response => {
          console.log('response', response.data.data)
          this.items = response.data.data
          this.isBusy = false
          // TODO
        })
        .catch(error => {
          console.error(error)
        })
    },

    searchTimeOut() {
      let timeout = null
      clearTimeout(timeout)
      // Make a new timeout set to go off in 1000ms
      timeout = setTimeout(() => {
        this.page = 1
        this.searchCategory()
      }, 1000)
    },
    statusVariant(ownerType) {
      if (ownerType == 'Low') {
        return 'primary'
      } if (ownerType == 'Medium') {
        return 'warning'
      } if (ownerType == 'High') {
        return 'danger'
      }
      return 'primary'
    },
    closeSearch() {
      this.$refs.searchModel.hide()
    },
    resetSearch() {
      console.log(this.formValues)

      Object.entries(this.formValues).forEach(([key]) => {
        this.formValues[key] = ''
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
  background-color: #246BFD !important;
  color: #fff;
}
</style><style>
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
}
</style><style lang="scss">
@import "@core/scss/vue/libs/vue-autosuggest.scss";
</style>
