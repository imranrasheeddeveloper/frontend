import axios from '@axios';
import { heightTransition } from '@core/mixins/ui/transition';
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue';

export default (await import('vue')).defineComponent({
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
BFormTimepicker
},
directives: {
Ripple
},

mixins: [heightTransition],

data() {
return {
options: {
date: {
date: true,
delimiter: '-',
datePattern: ['Y', 'm', 'd']
}
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
contact_id: ''
}
};
},
mounted() {
this.initTrHeight();
this.formValues.id = this.$route.params.id;
this.getCategory();
},
created() {
window.addEventListener('resize', this.initTrHeight);
},
destroyed() {
window.removeEventListener('resize', this.initTrHeight);
},
methods: {
Submit() {
this.isSubmitting = true;
const body = this.formValues;
console.log('submit', this.formValues);

axios
.post('/groups/updateUser', {
data: { body }
})
.then(response => {
if (response.data.hasOwnProperty('success')) {
if (response.data.success === true) {
console.log(response.data.data);

this.$router.replace('/categories').then(() => {
this.$toast({
component: ToastificationContent,
position: 'top-right',
props: {
title: response.data.message,
icon: 'EditIcon',
variant: 'success'
}
});
});
} else {
this.isSubmitting = false;

this.$toast({
component: ToastificationContent,
position: 'top-right',
props: {
title: response.data.message,
icon: 'AlertCircleIcon',
variant: 'danger'
}
});
}
} else {
this.isSubmitting = false;

this.$toast({
component: ToastificationContent,
position: 'top-right',
props: {
title: 'Error',
icon: 'AlertCircleIcon',
variant: 'danger',
text: 'Something went wrong, try again later'
}
});
}
})
.catch(error => {
console.error(error);
});
},
getCategory() {
console.log(this.$route.params.id);
const appendWithurl = `groups/get_user_by_id/${this.$route.params.id}`;

axios.get(appendWithurl).then(response => {
this.formValues = response.data.data;
this.for;
this.initTrHeight();
console.log('Category Fetched');
}).catch(error => {
console.error(error);
});
},
initTrHeight() {
this.trSetHeight(null);
this.$nextTick(() => {
// this.trSetHeight(this.$refs.form.scrollHeight);
});
}
}
});
const __VLS_template = () => ({});
