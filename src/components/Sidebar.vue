<template>
  <aside class="sidenav">
    <div class="menu">
      <Logo />
      <ul class="menu-list">
        <li v-for="link in links" :key="link.title">
          <router-link :to="link.route">{{ link.title }}</router-link>
        </li>
        <li @click="logOut" style="cursor:pointer;">
          Logout
        </li>
      </ul>
    </div>
  </aside>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
import Logo from "@/components/Logo";
export default {
  name: "Sidebar",
  components: { Logo },
  setup(){
    const store = useStore()
    const links = ref([
      { title: 'Dashboard', route: '/'},
      { title: 'Orders', route: '/orders'}
    ])
    return {
      links,
      logOut: () => store.dispatch('auth/logout')
    }
  }
}
</script>

<style lang="scss" scoped>

.menu{
  display: flex;
  flex-direction: column;

  &-list {
    font-size: 20px;
    list-style: none;
    padding: 0 20px;

    li{

      margin-bottom: 20px;

      a{
        text-decoration: none;
        color: #2e2f35;

        &:hover{
          color: #40424a;
        }
      }

    }
  }
}


</style>
