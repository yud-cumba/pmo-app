<template>

  <v-footer
    padless
  >
  <v-toolbar v-if="$vuetify.breakpoint.smAndDown"
            color="white">
     <v-img
        src="../assets/logoPMO.png"
        aspect-ratio="1"
        class="my-5"
        max-height="40"
        max-width="180"
      />
      <div class="ml-auto">
      <v-icon>mdi-facebook</v-icon>
      <v-icon>mdi-instagram</v-icon>
      <v-icon>mdi-linkedin</v-icon>
      </div>
  </v-toolbar>
    <v-card
    v-else
      class="d-flex"
      flat
      tile
    >
      <v-col class="col text-sm-body-1 ">
        <v-img
        src="../assets/logoPMO.png"
        aspect-ratio="1"
        class="my-5 mx-0"
        max-height="40"
        max-width="180"
      />
        <p class=" mx-2">
          <v-icon>mdi-map-marker</v-icon>Lima, Perú</p>
        <p class=" mx-2">
          contacto@compratudepa.online</p>
      </v-col>
      <v-col class="col text-sm-body-1 px-10 mt-5" >
        <h4 class="py-3">Menú</h4>
        <router-link to="/" style="text-decoration: none">
        <p style="color:black">Inicio</p></router-link>
        <router-link
        to="/maps?district=&pricesMin=59000&pricesMax=1405000&typePrice=S%2F.&rooms=&phase="
        style="text-decoration: none">
        <p style="color:black">Proyectos</p></router-link>
        <router-link to="/advices" style="text-decoration: none">
        <p style="color:black">Te asesoramos</p></router-link>
      </v-col>
      <v-col class="col text-sm-body-1 px-10 mt-5">
        <h4 class="py-3">Incubados por:</h4>
         <v-img
        src="../assets/Incubator.png"
        aspect-ratio="1"
        class="my-5 mx-0"
        max-height="60"
        max-width="180"
      />
      </v-col>
      <v-col class="col text-sm-body-1 px-10 mt-5" >
         <PrivacyPolicy title="Política de privacidad"/>
        <h4 class="py-3">Estemos en contacto </h4>
        <v-text-field dense outlined label="Ingresa tu correo"
        append-outer-icon="mdi-map-marker"></v-text-field>
      </v-col>
    </v-card>
  </v-footer>
</template>

<script>
import PrivacyPolicy from './PrivacyPolicy.vue';

export default {
  components: { PrivacyPolicy },
  data: () => ({
    icons: [
      'mdi-facebook',
      'mdi-twitter',
      'mdi-linkedin',
      'mdi-instagram',
    ],
  }),
};
</script>
<style lang="scss" scoped>
.col{
  width: 25vw;
}
</style>
