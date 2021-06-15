<template>
  <div class="wrapper">
    <div class="login">
      <div class="header">
        <h1 class="header-title">Freddy's Artisanal Halloween Candy shop</h1>
        <Logo />
      </div>
      <form @submit.prevent="onSubmit">
        <div class="auth-error" v-if="error">
          <span>{{ error }}</span>
          <span class="close" @click="dismiss">X</span>
        </div>
        <input v-model.trim="username" type="text" name="username" />
        <input v-model.trim="password" type="password" name="password" />
        <button type="submit">Login</button>
      </form>
    </div>
  </div>
</template>

<script>
import Logo from "@/components/Logo";
import { useStore } from 'vuex'
import { reactive, toRefs, computed } from 'vue'

export default {
  name: "Login",
  components: { Logo },
  setup(){
    const form = reactive({
      username: 'freddy',
      password: 'ElmStreet2019'
    })

    const store = useStore()

    const onSubmit = async () => {
      if (!form.username || !form.password) return false
      await store.dispatch('auth/login', form)
    }

    return {
      onSubmit,
      ...toRefs(form),
      error: computed(() => store.getters['auth/error']),
      dismiss: () => store.commit('auth/clearError'),

    }

  }
}
</script>

<style lang="scss" scoped>

.wrapper{
  height: 100vh;
  width: 100%;
  display: flex;
}

.login{
  align-self: center;
  border: 5px solid #ccc;
  width: 300px;
  margin: 0 auto;
  padding: 20px;
}



.header{
  display: flex;
  margin-bottom: 30px;

  &-title {
    font-weight: 500;
    font-size: 30px;
  }
}

input {
  display: flex;
  width: calc(100% - 15px);
  height: 40px;
  padding-left: 10px;
  margin-bottom: 20px;
  outline: none;
  border: 2px solid #ccc;
}

button {
  display: block;
  width: 100%;
  height: 40px;
  outline: none;
  border: 2px solid #ccc;
}

.auth-error{
  display: flex;
  justify-content: space-between;
  margin: 0 auto 20px;
  border: 1px solid red;
  padding: 10px;
  color: red;
}

.close{
  cursor: pointer;
}
</style>
