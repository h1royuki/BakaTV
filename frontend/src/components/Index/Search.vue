<template>
    <div v-if="items.length > 0" class="search-result">
        <div v-for="(film, index ) in items" :key="index">
            <film v-on:send="$emit('send', $event)" :film="film"></film>
        </div>
      </div>
      <div v-else class="search-empty"> 
          
      </div>
</template>
<script>
import Film from './Search/Film';

export default {
    props: ['items'],
    components: {
        Film
    }
}
</script>

<style>
.search-result {
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
}

.search-empty {
    color: white;
    font-size: 30px;
}
</style>

