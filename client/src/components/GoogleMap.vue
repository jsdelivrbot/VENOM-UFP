<template>
<GmapMap
  :center="{lat:41.172873, lng:-8.611798}"
  :zoom="7"
  map-type-id="terrain"
  style="width: 500px; height: 300px"
>
  <GmapMarker
    :key="index"
    v-for="(m, index) in markers"
    :position="m.position"
    :clickable="true"
    :draggable="true"
    @click="center=m.position"
  />
</GmapMap>
</template>

<script>
export default {
  data() {
    return {
      center: { lat: 41.172873, lng: -8.611798 },
      markers: [
        { position: { lat: 41.172873, lng: -8.611798 } },
        { position: { lat: -6.21462, lng: 106.84513 } }
      ]
    };
  }
};
</script>