<template>
  <div class="layout-topbar">
    <nuxt-link to="/" class="layout-topbar-logo">
      <img alt="Logo" src="/logo.png" />
    </nuxt-link>
    <button
      class="p-link layout-menu-button layout-topbar-button"
      @click="onMenuToggle"
    >
      <i class="pi pi-bars"></i>
    </button>
    <ul class="layout-topbar-menu hidden lg:flex origin-top">
      <li class="flex-avatar">
        <div>
          <span style="margin: 4px"
            >Xin chào<br /><b>{{ auth ? auth.full_name : "" }}</b></span
          >
        </div>
        <div>
          <b-dropdown
            size="lg"
            variant="link"
            toggle-class="text-decoration-none"
            no-caret
          >
            <template #button-content>
              <img class="avartar" height="35" alt="Logo" src="/users.jpeg" />
            </template>
            <b-dropdown-item @click="logout"><i class="pi pi-fw pi-sign-in"></i> Thoát</b-dropdown-item>
          </b-dropdown>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from "vuex";
const Cookie = process.client ? require("js-cookie") : undefined;
export default {
  methods: {
    onMenuToggle(event) {
      this.$emit("menu-toggle", event);
    },
    onTopbarMenuToggle(event) {
      this.$emit("topbar-menu-toggle", event);
    },
    logout() {
      if (Cookie) Cookie.remove("_ttoauth", { domain: '.tuoitre.vn', path: '/' })
      if (Cookie) Cookie.remove("usertoken", { domain: '.tuoitre.vn', path: '/' })
      this.$swal({
        text: "Đăng xuất thành công",
        icon: "success",
      });
      setTimeout(() => {
        location.reload()
      }, 2000);
    },
  },
  mounted() {
    console.log(this.auth);
  },
  computed: {
    ...mapState(["auth"]),
  },
};
</script>
<style >
.flex-avatar {
  display: flex;
}
.avartar {
  padding-top: 5px;
}
</style>