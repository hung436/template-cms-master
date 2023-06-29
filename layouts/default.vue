<template>
  <div :class="containerClass" @click="onWrapperClick">
    <AppTopBar @menu-toggle="onMenuToggle" />
    <div class="layout-sidebar" @click="onSidebarClick">
      <AppMenu :model="menu" @menuitem-click="onMenuItemClick" />
    </div>

    <div class="layout-main-container">
      <div class="layout-main">
        <nuxt />
      </div>
      <AppFooter />
    </div>
  </div>
</template>

<style>
</style>
<script>
import AppTopBar from "./sub/AppTopbar.vue";
import AppMenu from "./sub/AppMenu.vue";
import AppConfig from "./sub/AppConfig.vue";
import AppFooter from "./sub/AppFooter.vue";
import "primevue/resources/primevue.min.css";
import "primeflex/primeflex.css";
import "primeicons/primeicons.css";
import "prismjs/themes/prism-coy.css";
import Jwt from "jsonwebtoken";
const cookieParser = process.client ? require("cookieparser") : undefined;
const Cookie = process.client ? require("js-cookie") : undefined;
export default {
  middleware: ["auth"],
  data() {
    return {
      layoutMode: "static",
      staticMenuInactive: false,
      overlayMenuActive: false,
      mobileMenuActive: false,
      menu: [
        {
          label: "Home",
        },
        {
          // label: "UI Components",
          // icon: "pi pi-fw pi-sitemap",
          items: [
            {
              label: "Dashboard",
              icon: "pi pi-fw pi-home",
              to: "/",
            },
            {
              label: "Nhập trang báo",
              icon: "pi pi-fw pi-id-card",
              url: "/nhap-trang-bao",
            },
            {
              label: "Nhập Tin",
              icon: "pi pi-fw pi-check-square",
              url: "/nhap-tin",
            },
            {
              label: "Quản lý trang báo",
              icon: "pi pi-fw pi-bookmark",
              to: "/quan-ly-trang-bao",
            },
            {
              label: "Quản lý tin",
              icon: "pi pi-file",
              url: "/quan-ly-tin",
            },
            {
              label: "Quản lý tên Chuyên Trang",
              icon: "pi pi-tags",
              to: "/chuyen-trang",
            },
            {
              label: "Resources",
              icon: "pi pi-images",
              to: "/resources",
            },
          ],
        },
      ],
    };
  },
  watch: {
    $route() {
      this.menuActive = false;
    },
  },
  mounted() {
    let _this = this
    $(".p-ripple").each(function () {
      let txt = $(this).attr("href");
      if (txt == _this.$route.path) {
        $(this).focus();
      }
    });
  },
  methods: {
    onWrapperClick() {
      if (!this.menuClick) {
        this.overlayMenuActive = false;
        this.mobileMenuActive = false;
      }

      this.menuClick = false;
    },
    onMenuToggle() {
      this.menuClick = true;

      if (this.isDesktop()) {
        if (this.layoutMode === "overlay") {
          if (this.mobileMenuActive === true) {
            this.overlayMenuActive = true;
          }

          this.overlayMenuActive = !this.overlayMenuActive;
          this.mobileMenuActive = false;
        } else if (this.layoutMode === "static") {
          this.staticMenuInactive = !this.staticMenuInactive;
        }
      } else {
        this.mobileMenuActive = !this.mobileMenuActive;
      }

      event.preventDefault();
    },
    onSidebarClick() {
      this.menuClick = true;
    },
    onMenuItemClick(event) {
      if (event.item && !event.item.items) {
        this.overlayMenuActive = false;
        this.mobileMenuActive = false;
      }
    },
    addClass(element, className) {
      if (element.classList) element.classList.add(className);
      else element.className += " " + className;
    },
    removeClass(element, className) {
      if (element.classList) element.classList.remove(className);
      else
        element.className = element.className.replace(
          new RegExp(
            "(^|\\b)" + className.split(" ").join("|") + "(\\b|$)",
            "gi"
          ),
          " "
        );
    },
    isDesktop() {
      return window.innerWidth >= 992;
    },
    isSidebarVisible() {
      if (this.isDesktop()) {
        if (this.layoutMode === "static") return !this.staticMenuInactive;
        else if (this.layoutMode === "overlay") return this.overlayMenuActive;
      }

      return true;
    },
  },
  computed: {
    containerClass() {
      return [
        "layout-wrapper",
        {
          "layout-overlay": this.layoutMode === "overlay",
          "layout-static": this.layoutMode === "static",
          "layout-static-sidebar-inactive":
            this.staticMenuInactive && this.layoutMode === "static",
          "layout-overlay-sidebar-active":
            this.overlayMenuActive && this.layoutMode === "overlay",
          "layout-mobile-sidebar-active": this.mobileMenuActive,
        },
      ];
    },
  },
  beforeUpdate() {
    if (this.mobileMenuActive)
      this.addClass(document.body, "body-overflow-hidden");
    else this.removeClass(document.body, "body-overflow-hidden");
  },
  components: {
    AppTopBar: AppTopBar,
    AppMenu: AppMenu,
    AppConfig: AppConfig,
    AppFooter: AppFooter,
  },
  head: {
    script: [
      {
        src: "/tooling/js/jquery/2.1.3/jquery.min.js",
        type: "text/javascript",
      },
    ],
  },
};
</script>
<style lang="scss">
// @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;900&family=Mulish:wght@400;500;700;900&family=Roboto:wght@400;500;700;900&display=swap');
@import "../assets/styles/layout.scss";
@import "../assets/demo/flags/flags.css";
</style>
<style lang="css">
@import "../assets/css/full.css";
</style>