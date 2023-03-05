<template>
  <div class="content">
    <div class="panel">
      <h1>Cadastrar Acomodação</h1>
      <!-- ... -->
    </div>
  </div>

  <div v-for="item in accommodations" :key="item.id">
    {{ ('000' + item.id).slice(-3) }} -> {{ item.name }}
  </div>
</template>

<script>
  export default {
    name: 'AdminAccommodations',

    data() {
      return {
      }
    },

    computed: {
      accommodations() {
        return this.$store.state.accommodationsModule.accommodations;
      }
    },

    methods: {
    },

    mounted() {
      this.$store.dispatch('accommodationsModule/getAccommodations');
    }
  }
</script>

<style scoped>
  .content {
    display: flex;
    justify-content: center;
    margin-top: 2rem;
  }

  .panel {
    width: 80%;
    text-align: center;
    padding: 2rem;
    border-radius: .5rem;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
  }

  h1 {
    text-shadow: 1px 1px 2px #838383cc;
    font-weight: 600;
  }
</style>