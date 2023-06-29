<template>
  <div>
    <b-card>
      <template #header>
        <h4 class="mb-0">Quản lý Resources</h4>
      </template>
      <FileManager />
    </b-card>
  </div>
</template>

<script>
import FileManager from "../components/card/file-manager.vue";
export default {
  components: {
    FileManager,
  },
  head: {
    title: "Quản lý Resources",
  },
};
</script>

<style scoped></style>
