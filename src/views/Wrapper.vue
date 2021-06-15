<template>
  <Sidebar />
  <main class="main">
    <router-view />
  </main>
</template>

<script>
import { useStore } from 'vuex'
import { watch, computed } from 'vue'
import Sidebar from "@/components/Sidebar";
export default {
  name: "Wrapper",
  components: {Sidebar},
  setup() {
    const store = useStore()
    const orderError = computed(() => store.getters['order/error'])

    watch([orderError], ([orderError]) => {
      if (orderError) {
        store.dispatch('auth/logout')
      }
    })

  }
}
</script>

<style>

.sidenav {
  height: 100%;
  width: 300px;
  position: fixed;
  z-index: 1;
  border-right: 2px solid #ccc;
  top: 0;
  left: 0;
  overflow-x: hidden;
}

.main {
  margin-left: 300px; /* Same as the width of the sidenav */
  font-size: 28px; /* Increased text to enable scrolling */
  padding: 0px 10px;
}
</style>
