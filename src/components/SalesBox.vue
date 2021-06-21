<template>
  <div class="bg-blue-500 dark:bg-gray-800 shadow-lg rounded-md flex flex-col items-center justify-between p-3 border-b-4 border-blue-600 dark:border-gray-600 text-white font-medium group">
    <h3>{{ title }}</h3>
    <span v-if="sale">{{ $filters.nFormatter(sale.total) }} / {{ sale.orders }} orders</span>
  </div>
</template>

<script>

export default {
  name: "SalesBox",
  props: {
    title: String,
    sale: Object
  }
}
</script>

<style scoped>

</style>
