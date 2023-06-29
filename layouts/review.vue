<template>
  <div>
    <header>
      <div class="inner-header">
        <ul class="list-product">
          <li><a href="#" title="">Tuổi Trẻ Online</a></li>
          <li><a href="#" title="">Tuổi Trẻ TV</a></li>
          <li><a href="#" title="">Tuổi Trẻ Cuối Tuần</a></li>
          <li><a href="#" title="">TuoiTreNews</a></li>
          <li><a href="#" title="">Tuổi Trẻ Cười</a></li>
          <li><a href="#" title="">Podcast Tuổi Trẻ</a></li>
          <li><a href="#" title="">Rao Vặt Tuổi Trẻ</a></li>
        </ul>
      </div>

      <div class="container">
        <div class="header-left">
          <div class="outer-page">
            <span>Chọn trang</span>
            <div class="inner-page">
              <a href="#" title="">Trang đầu</a>
              <a href="#" title="">Thời sự</a>
              <a href="#" title="">Kinh tế</a>
              <a href="#" title="">Phóng sự ảnh</a>
              <a href="#" title="">Bạn đọc & Tuổi Trẻ</a>
              <a href="#" title="">Nhịp sống trẻ</a>
              <a href="#" title="">Giáo dục</a>
              <a href="#" title="">Tổ ấm</a>
              <a href="#" title="">Thể thao</a>
              <a href="#" title="">Cuộc sống quanh ta</a>
              <a href="#" title="">Thông tin doanh nghiệp</a>
              <a href="#" title="">Đối thoại cùng Tuổi Trẻ</a>
              <a href="#" title="">Văn hóa gia đình</a>
            </div>
          </div>
        </div>
        <a class="logo" href="index.html" title="">
          <img src="/rv/images/logo.svg" title="logo" />
        </a>
        <div class="header-right">
          <div class="outer-calendar">
            <input data-toggle="datepicker" value="Chọn Ngày" />
          </div>
        </div>
      </div>
    </header>
    <div class="main">
      <!-- content -->
      <section class="container">
        <div class="swiper mySwiper">
          <nuxt />
        </div>
      </section>
    </div>
  </div>
</template>
  
  <script>
export default {
  head: {
    link: [
      {
        rel: "stylesheet",
        href: "/rv/css/screen.css",
      },
    ],
    script: [
      {
        src: "/tooling/js/jquery/2.1.3/jquery.min.js",
        type: "text/javascript",
      }
    ],
  },
};
</script>
  
  <style>
</style>
  