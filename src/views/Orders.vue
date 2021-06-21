<template>
  <div class="h-full ml-14 mt-20 mb-10 md:ml-64">
    <div class="mt-4 mx-4 flex justify-between">
      <h3 class="text-lg font-semibold">Orders</h3>
      <input
          class="border border-gray-300 sm:text-sm pl-2 w-1/3 sm:w-1/2 h-10 rounded"
          @change="setTerm"
          v-debounce="500"
          placeholder="Search..."
          :value="term"
          type="text" />
    </div>
    <Table
        :headers="['Product Name', 'Date', 'Price', 'Status']"
        :loading="loading"
        :total="total"
        :data="orders">
      <template v-slot="{ data, statusStyles }">
        <tr v-for="order in data" :key="order.id" class="bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-400">
          <td v-text="order.product.name" class="px-2 py-3 text-sm" />
          <td v-text="$filters.date(order.created_at)" class="px-2 py-3 whitespace-nowrap text-sm" />
          <td v-text="$filters.currencyFilter(order.total)" class="px-2 py-3 whitespace-nowrap text-sm" />
          <td class="px-2 py-3 whitespace-nowrap">
            <span :class="`bg-${statusStyles(order.status)}-100 text-${statusStyles(order.status)}-700`"
                  class="px-2 py-1 font-semibold leading-tight"> Approved </span>
          </td>
        </tr>
      </template>
    </Table>
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


export default {
  name: 'Orders',
  components: { Table, Pagination },
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

//input{
//  width: 300px;
//  height: 40px;
//}

</style>
