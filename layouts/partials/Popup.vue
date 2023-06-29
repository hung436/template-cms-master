<template>

</template>

<script>
  export default {
    name: "Popup",
    computed: {
      popupExamQuiz() {
        return this.$store.state.modules.popup.popupExamQuiz
      },
      popupExamWrite() {
        return this.$store.state.modules.popup.popupExamWrite
      },
      popupExamTest() {
        return this.$store.state.modules.popup.popupExamTest
      },
    },
    watch: {
      popupExamQuiz() {
        if (this.popupExamQuiz)
          this.$swal({
            title: 'Đợt thi trắc nghiệm không tồn tại hoặc chưa bắt đầu !',
            icon: 'error',
          })
      },
      popupExamWrite() {
        if (this.popupExamWrite)
          this.$swal({
            title: 'Đợt thi tự luận không tồn tại hoặc chưa bắt đầu !',
            icon: 'error',
          })
      },
      popupExamTest() {
        if (this.popupExamTest)
          this.$swal({
            title: 'Đợt thi thử chưa được bắt đầu',
            icon: 'error',
          })
      },
    }
  }
</script>

<style scoped>

</style>
