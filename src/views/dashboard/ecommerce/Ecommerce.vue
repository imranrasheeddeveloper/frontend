<template>
  <section id="dashboard-ecommerce">
    <b-row
      class="match-height"
    >

      <b-col>
        <h1 class="text-center set_height">
          Welcome to Splitur System
        </h1>
      </b-col>

    </b-row>
  </section>
</template>

<script>
import { BRow, BCol } from 'bootstrap-vue'

export default {
  components: {
    BRow,
    BCol,
  },
  data() {
    return {
      data: {},
    }
  },
  created() {

  },
  mounted() {

  },
  methods: {

  },

}
</script>

<style lang="scss">
@import '@core/scss/vue/pages/dashboard-ecommerce.scss';
@import '@core/scss/vue/libs/chart-apex.scss';
.set_height{
  padding-top:20%;
}
</style>
