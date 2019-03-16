<template>
    <div v-if="items" class="search-result">
        <div v-for="(film, index ) in items" :key="index">
            <film v-on:send="$emit('send', $event)" :film="film"></film>
        </div>
      </div>
</template>
<script>
import Film from './Search/Film';

export default {
    props: ['items'],
    components: {
        Film: Film
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
</style>

