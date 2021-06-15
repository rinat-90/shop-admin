<template>
  <Card>
    <div>{{ title }}</div>
    <span>{{ $filters.nFormatter(sale.total) }} / {{ sale.orders }} orders</span>
    <pre>{{ todaySale }}</pre>
  </Card>
</template>

<script>
import Card from "@/components/Card";

export default {
  name: "SalesBox",
  components: { Card },
  props: {
    title: String,
    sale: Object
  }
}
</script>

<style scoped>

</style>
