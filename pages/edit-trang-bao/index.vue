<template lang="">
  <div>
    <paper :detail="detail" />
  </div>
</template>
<script>
import paper from "../../components/paper/paper.vue";
import { AxiosAuth } from "../../utils/axios";
export default {
  components: { paper },
  async asyncData({ req, res }) {
    const { data } = await AxiosAuth.get(
      `/api/find-newspaper-by-id?${req._parsedUrl.query}`
    );
    if (data.status) {
      return { detail: data.data[0] };
    }
  },
};
</script>
<style lang=""></style>
