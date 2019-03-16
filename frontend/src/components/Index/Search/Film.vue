<template>
  <div class="film" @click="$emit('send', film)">
    <img class="film-poster" :src="film.cover">
    <div class="film-props">
      <div class="film-name">{{film.name_rus}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["film"]
};
</script>

<style>
.film {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  margin: 10px 10px;
  max-width: 240px;
  position: relative;
  box-shadow: 0 -10px 20px 1px #0000004d;
  border-radius: 10px;
}

.film:hover {
  cursor: pointer;
}

.film-poster {
  width: 170px;
  height: 260px;
  border-radius: 10px;
}

.film-props {
  width: 100%;
  position: absolute;
  bottom: 0;
  background-color: #000c;
  border-bottom-left-radius: 9px;
  border-bottom-right-radius: 11px;
}

.film-name {
  font-size: 15px;
  color: white;
  padding: 5px;
  text-align: center;
}

.film-desc {
  color: #a7a4a4;
  text-align: center;
  font-size: 15px;
  padding: 5px;
}
</style>

