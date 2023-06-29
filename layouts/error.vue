<template>
  <b-card>
    <template #header>
      <b-row>
        <b-col sm="12">
          <div class="notfound-404">
            <h1>Page 404</h1>
          </div>
        </b-col>
      </b-row>
    </template>
    <b-row>
      <b-col sm="12">
        <div class="notfound-bg">
          <img src="/img/404.jpg" alt="">
          <h2>Rất tiếc, Trang bạn tìm kiếm không tồn tại</h2>
        <nuxt-link to="/" class="home-btn">Về trang chủ</nuxt-link>
        </div>
      </b-col>
    </b-row>
  </b-card>
</template>
<script>
export default {
  components: {},
  layout: "blank",
};
</script>

<style scoped>
  .notfound-bg{
    text-align: center;
  }
</style>
