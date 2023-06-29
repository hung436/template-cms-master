<template>
  <b-card>
    <template #header>
      <b-row>
        <b-col sm="12">
          <div class="notfound-404">
            <h1>Page Check</h1>
          </div>
        </b-col>
      </b-row>
    </template>
    <b-row>
      <b-col sm="3">
        <div class="notfound-bg">
          <b-alert show :variant="allErr.success == true ? 'success' : 'danger'">Trạng thái: {{ allErr.success }}</b-alert>
          <div v-if="allErr.message">
            status: {{ allErr.message.status || '' }}<br/>
          message: {{ allErr.message.message }}<br/>
          stack: {{ allErr.message.stack }}
          </div>
        
        </div>
      </b-col>
      <b-col sm="9">
        <div class="notfound-bg">
          <b-alert show :variant="'primary'">detail</b-alert>
      {{ allErr }}
        </div>
      </b-col>
    
    </b-row>
  </b-card>
</template>

<script>
export default {
  layout: "showerr",
  data() {
    return {

    }
  },
  computed: {
    allErr() {
      return this.$store.state.allErr
    }
  },
}
</script>

<style>

</style>