<template>
  <h1>Dashboard</h1>
  <div class="stats" v-if="todaySale && lastWeekSale && lastMonthSale">
    <SalesBox title="Today" :sale="todaySale" />
    <SalesBox title="Last Week" :sale="lastWeekSale" />
    <SalesBox title="Last Month" :sale="lastMonthSale" />
  </div>


  <div class="revenue-heading">
    <h1>Revenue
      <span v-if="type === 'week'">(Last 7 days)</span>
      <span v-if="type === 'month'">(Last 12 months)</span>
    </h1>
    <label for="toggle_button">
      <span v-if="toggle" class="toggle__label">WEEK</span>
      <span v-if="!toggle" class="toggle__label">MONTH</span>

      <input
          :value="toggle"
          @input="toggle = !toggle"
          type="checkbox"
          id="toggle_button">
    </label>
  </div>
  <Chart
      v-if="sales"
      :type="type"
      :sales="sales(type)" />

  <h1>Bestsellers</h1>
  <Card>
    <div v-if="loading">Loading...</div>
    <Table
        v-if="bestSellers"
        :headers="['Product Name', 'Price', '# Unit Sold', 'Revenue']"
        :data="bestSellers">
      <template v-slot="{ data }">
        <tr v-for="bs in data" :key="bs.product.id">
          <td v-text="bs.product.name" />
          <td v-text="$filters.currencyFilter(bs.revenue / bs.units)" />
          <td v-text="bs.units" />
          <td v-text="$filters.currencyFilter(bs.revenue)" />
        </tr>
      </template>
    </Table>
  </Card>
</template>

<script>
import { useStore } from 'vuex'
import { ref, watch, computed, onMounted } from 'vue'
import Table from "@/components/Table";
import Card from "@/components/Card";
import Chart from "@/components/Chart";
import SalesBox from "@/components/SalesBox";

export default {
  name: "Dashboard",
  components: { Table, Card, Chart, SalesBox },
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
h1{
  margin-bottom: 20px;
}
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
