<template>
  <div class="h-full ml-14 mt-14 mb-10 md:ml-64">
    <h3 class="text-lg font-semibold mx-5 mt-20">Sales</h3>
    <!-- Statistics Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 p-4 gap-4">
      <SalesBox title="Today" :sale="todaySale" />
      <SalesBox title="Last Week" :sale="lastWeekSale" />
      <SalesBox title="Last Month" :sale="lastMonthSale" />
    </div>
    <!-- ./Statistics Cards -->

    <!-- Revenue Chart  -->
    <h3 class="text-lg font-semibold mx-5 mt-20">Revenue Sale</h3>
    <Chart
        v-if="sales"
        :type="type"
        :sales="sales(type)" />
    <!-- Revenue Chart -->


    <h3 class="text-lg font-semibold mx-5">Bestsellers</h3>
    <Table
        v-if="bestSellers"
        :headers="['Product Name', 'Price', '# Unit Sold', 'Revenue']"
        :data="bestSellers">
      <template v-slot="{ data }">
        <tr
            v-for="bs in data" :key="bs.product.id"
            class="bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-400">
          <td v-text=" bs.product.name" class="px-4 py-3 font-semibold text-sm" />
          <td v-text="$filters.currencyFilter(bs.revenue / bs.units)" class="px-4 py-3 text-sm" />
          <td v-text="bs.units" class="px-4 py-3 text-sm" />
          <td v-text="$filters.currencyFilter(bs.revenue)" class="px-4 py-3 text-xs" />
        </tr>
      </template>
    </Table>
  </div>

<!--  <h1>Dashboard</h1>-->
<!--  <div class="flex" v-if="todaySale && lastWeekSale && lastMonthSale">-->
<!--    <SalesBox title="Today" :sale="todaySale" />-->
<!--    <SalesBox title="Last Week" :sale="lastWeekSale" />-->
<!--    <SalesBox title="Last Month" :sale="lastMonthSale" />-->
<!--  </div>-->


<!--  <div class="flex justify-between my-5">-->
<!--    <div class="flex flex-row gap-3">-->
<!--      <h1>Revenue</h1>-->
<!--      <div class="flex justify-center flex-col h-full text-sm text-gray-500">-->
<!--        <span class="">{{ type === 'week' ? '(Last 7 days)': 'Last 12 months'}}</span>-->
<!--      </div>-->
<!--    </div>-->
<!--    <label for="toggle_button">-->
<!--      <span v-if="toggle" class="toggle__label">WEEK</span>-->
<!--      <span v-if="!toggle" class="toggle__label">MONTH</span>-->

<!--      <input-->
<!--          :value="toggle"-->
<!--          @input="toggle = !toggle"-->
<!--          type="checkbox"-->
<!--          id="toggle_button">-->
<!--    </label>-->
<!--  </div>-->


</template>

<script>
import { useStore } from 'vuex'
import { ref, watch, computed, onMounted } from 'vue'
import Table from "@/components/Table";
import Chart from "@/components/Chart";
import SalesBox from "@/components/SalesBox";

export default {
  name: "Dashboard",
   components: {
     Table,
     Chart,
     SalesBox
   },
  setup(){
    const toggle = ref(false)
    const type = ref('month')
    const store = useStore()

    onMounted(store.dispatch('dashboard/fetch'))
    watch(toggle, (toggle) => {
      if (toggle) {
        type.value = 'week'
      } else {
        type.value = 'month'
      }
    })

    return {
      bestSellers: computed(() => store.getters['dashboard/bestSellers']),
      sales: computed(() => store.getters['dashboard/sales']),
      todaySale: computed(() => store.getters['dashboard/todaySale']),
      lastWeekSale: computed(() => store.getters['dashboard/lastWeekSale']),
      lastMonthSale: computed(() => store.getters['dashboard/lastMonthSale']),
      loading: computed(() => store.getters['dashboard/loading']),
      error: computed(() => store.getters['dashboard/error']),
      type,
      toggle
    }


  }
};
</script>

<style lang="scss" scoped>
.heading{
  display: flex;
}

.revenue-heading{
  display: flex;
  justify-content: space-between;
}

.stats{
  display: flex;
  justify-content: start;
  gap: 20px;
  margin-bottom: 20px;
}
</style>
