<template>
    <div>
      <button @click="sendData">Send data</button>
    </div>
  </template>
  
  <script>
  export default {
  methods: {
      sendData() {
          this.$emit('sending-start')
          this.$emit('sending-complete')
      }
  },
  }
  </script>
  
  <style>
  
  </style>