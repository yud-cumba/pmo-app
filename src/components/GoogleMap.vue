<template>
  <gmap-map
    ref="mapRef"
    :center="center"
    :zoom="z"
    style="width: 100%; height: 500px"
    @click="getLatLong"
  >
    <gmap-marker
      :key="index"
      v-for="(m, index) in markers"
      :position="m.position"
      :title="m.title"
      :clickable="true"
      :draggable="true"
      :icon="{ url: require('../assets/building.svg')}"
      @click="toggleInfo(m.position)"
    ></gmap-marker>
  </gmap-map>
</template>
<script>
// import { gmapApi } from 'vue2-google-maps';
import { eventBus } from '../main';

export default {
  data() {
    return {
      center: { lat: this.latitude, lng: this.longitude },
      currentInmob: [],
      z: this.zoom,
    };
  },

  props: ['latitude', 'longitude', 'markers', 'totalMarkers', 'zoom', 'addMarker'],
  methods: {
    getLatLong(e) {
      this.center = e.latLng.toJSON();
      this.addMarker(e.latLng.toJSON());
    },
    toggleInfo(position) {
      // eslint-disable-next-line max-len
      this.currentInmob = this.totalMarkers.filter((e) => e.position.lat === position.lat && e.position.lng === position.lng);
      this.center = {
        lat: this.currentInmob[0].position.lat,
        lng: this.currentInmob[0].position.lng,
      };
      this.z = 20;
    },
  },
  watch: {
    currentInmob() {
      eventBus.$emit('infoProject', this.currentInmob);
    },
    latitude() {
      this.z = 15;
      this.center = { lat: this.latitude, lng: this.longitude };
    },
  },
  created() {
    eventBus.$on('inputProject', (payload) => {
      // eslint-disable-next-line prefer-destructuring
      this.markers = this.totalMakers.filter((e) => e.title === payload.project);
    });
  },
};
</script>
