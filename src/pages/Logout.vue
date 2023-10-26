<template>
  <h1>Шо ты тут делаешь?</h1>
</template>

<script>

export default {
  name: "Logout",
  mounted() {
    localStorage.removeItem('user');
    this.$router.push('/auth')
  }
}
</script>

<style scoped>

</style>