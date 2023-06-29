<template>
  <main v-html="codekey"></main>
</template>

<script>
import ImageMap from "image-map";
import { setInterval } from "timers";
export default {
  layout: "review",
  components: {},
  data() {
    return {
      codekey: "",
    };
  },
  mounted() {
    let codekey = window.localStorage.getItem("code-review");
    if (codekey != null) {
      this.codekey = codekey;
      setInterval(() => {
        ImageMap("img[usemap]");
        console.log(1);
      }, 1000);
    }
    setTimeout(() => {
      $("area").each(function () {
        var txt = $(this).attr("title");
        console.log(txt);
        var coor = $(this).attr("coords");
        var coorA = coor.split(",");
        var left = coorA[0];
        var top = coorA[1];

        var $span = $('<span  class="map_title"><i class="pi pi-facebook" style="font-size: 2rem"></i>'  + "</span>");
        $span.css({ top: top + "px", left: left + "px", position: "absolute" });
        $span.appendTo("map");
      });
    }, 1200);
  },
};
</script>

<style>
main {
  position: relative;
}
.map_title {
  position: absolute;
  /* color: red; */
}
</style>
