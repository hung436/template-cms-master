<template>
  <div>
    <h1>{{ msg }}</h1>
    <DataSend 
    @sending-start="started"
    @sending-complete="completed"
    />
  </div>
</template>

<script>
import DataSend from "./datasend.vue"
export default {
    props: {
        msg: {
            type: String,
        },
    },
    components: {
        DataSend,
    },
    methods: {
        started() {
            console.log(('Start'));
        },
        completed(){
            console.log('completed');
        }
    },

}
</script>

<style>

</style>