<template>
  <div class="orders">
    <div class="heading">
      <div>Orders</div>
      <input
          @change="setTerm"
          v-debounce="500"
          placeholder="Search..."
          :value="term"
          type="text" />
    </div>
    <Card>
      <div v-if="loading">Loading...</div>
      <Table
          v-else-if="!loading && orders.length"
          :headers="['Product Name', 'Date', 'Price', 'Status']"
          :data="orders">
        <template v-slot="{ data, statusStyles }">
          <tr v-for="order in data" :key="order.id">
            <td v-text="order.product.name" />
            <td v-text="$filters.date(order.created_at)" />
            <td v-text="$filters.currencyFilter(order.total)" />
            <td v-text="order.status" :style="statusStyles(order.status)"/>
          </tr>
        </template>
      </Table>
    </Card>
  </div>
  <Pagination
      v-if="orders.length"
      :total-page="total / orders.length"
      :page="page"
      :next-handler="inc"
      :prev-handler="dec" />
</template>
<script>
import { onMounted, ref, computed, watch } from 'vue'
import { useStore } from 'vuex'
import Table from "@/components/Table";
import Pagination from "@/components/Pagination";
import Card from "@/components/Card";


export default {
  name: 'Orders',
  components: { Table, Card, Pagination },
  setup() {
    const page = ref(1)
    const term = ref('')
    const store = useStore()

    const fetchOrders = async (page = 1, term = '') => {
      await  store.dispatch('order/fetch', { page, term })
    }

    const setTerm = (e) => {
      term.value = e.target.value
      page.value = 1
    };

    onMounted(fetchOrders)

    watch([term, page],([term, page ]) => {
      if(term || page) {
        fetchOrders(page, term)
      }
    })

    return {
      loading: computed(() => store.getters['order/loading']),
      total: computed(() => store.getters['order/total']),
      orders: computed(() => store.getters['order/orders']),
      term,
      page,
      inc: () => page.value++,
      dec: () => page.value--,
      setTerm,

    }
  }
}
</script>

<style lang="scss" scoped>
.heading{
  display: flex;
  justify-content: space-between;
  padding: 15px;
}

input{
  width: 300px;
  height: 40px;
}

</style>
