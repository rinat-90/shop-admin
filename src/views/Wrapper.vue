<template>
  <Sidebar />
  <main class="main">
    <router-view />
  </main>
</template>

<script>
import Sidebar from "@/components/Sidebar";
export default {
  name: "Wrapper",
  components: { Sidebar },
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
