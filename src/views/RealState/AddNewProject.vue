<template>
  <v-card class="pa-5">
    <h1>Sube un nuevo proyecto</h1>
    <h4>Datos del proyecto</h4>
    <v-row class="d-flex">
      <v-col>
        <v-text-field
          v-model="project.properties.name"
          filled
          rounded
          color="green"
          dense
          required
          label="Ingrese nombre del proyecto"
        >
        </v-text-field>
        <v-text-field
          v-model="project.properties.direccion"
          filled
          rounded
          color="green"
          dense
          required
          label="Ingrese dirección del proyecto"
        >
        </v-text-field>
        <v-autocomplete
          v-model="project.properties.distrito"
          :items="districts"
          @change="currentLatLong(project.properties.distrito)"
          color="green"
          filled
          dense
          rounded
          required
          label="Elija el distrito"
        >
        </v-autocomplete>
      </v-col>
      <v-col>
        <v-menu
          ref="menu1"
          v-model="menu1"
          color="green"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          max-width="290px"
          required
          min-width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              color="green"
              filled
              dense
              rounded
              label="Fecha de entrega"
              :value="project.properties.delivery_date"
              persistent-hint
              prepend-inner-icon="mdi-calendar"
              v-bind="attrs"
              v-on="on"
              required
            ></v-text-field>
          </template>
          <v-date-picker
            color="green"
            locale="ES-es"
            no-title
            v-model="date"
            @input="menu1 = false"
          ></v-date-picker>
        </v-menu>
        <v-select
          :items="['En planos', 'En construcción', 'Entrega inmediata']"
          v-model="project.properties.project_phase"
          color="green"
          filled
          dense
          rounded
          required
          label="Elija el estado del proyecto"
        >
        </v-select>
        <v-text-field
          v-model="project.properties.room_max"
          color="green"
          filled
          dense
          rounded
          type="number"
          label="Elija el número de habitaciones "
        >
        </v-text-field>
      </v-col>
    </v-row>
    <v-row v-if="project.properties.distrito">
      <h4 class="py-3">
        Recorre el mapa y clickea la ubicación de tu proyecto, esto servirá para
        que los usuarios puedan encontrar tu proyecto por la ubicación
      </h4>
      <GoogleMap
        :latitude="latitude"
        :zoom="zoom"
        :longitude="longitude"
        :markers="marker"
        :totalMarkers="marker"
        :addMarker="addMarker"
      />
    </v-row>
    <h4>Detalle</h4>
    <v-row class="pa-4">
      <v-col>
        <v-text-field
          v-model="project.properties.cantidad"
          filled
          rounded
          color="green"
          dense
          label="Ingrese número de dptos del proyecto"
        >
        </v-text-field>
        <v-text-field
          v-model="project.properties.floors"
          filled
          rounded
          color="green"
          dense
          label="Ingrese número de pisos del proyecto"
        >
        </v-text-field>
        <v-text-field
          v-model="project.properties.project_whatsapp"
          filled
          rounded
          color="green"
          dense
          label="Ingrese número de celular para contacto"
        >
        </v-text-field>
            <h4>Cotización</h4>
        <v-row class="pa-4">
          <v-col>
            <v-file-input
              v-model="cotization"
              color="green"
              label="Suba la cotización en pdf de su proyecto"
              filled
              dense
              rounded
            >
            </v-file-input>
          </v-col>
        </v-row>
      </v-col>
      <v-col>
        <v-text-field
          v-model="project.properties.area_max"
          color="green"
          filled
          dense
          rounded
          type="number"
          label="Ingrese área máxima en m2"
        >
        </v-text-field>
        <v-text-field
          v-model="project.properties.area_min"
          color="green"
          filled
          dense
          rounded
          type="number"
          label="Ingrese área mínima en m2"
        >
        </v-text-field>
        <v-textarea
          v-model="project.properties.descripcion"
          color="green"
          filled
          dense
          rounded
          label="Ingrese detalle del proyecto"
        >
        </v-textarea>
      </v-col>
    </v-row>
    <h4>Datos del proyecto</h4>
    <v-row class="pa-4">
      <v-col>
        <v-text-field
          v-model="project.properties.val_price1"
          filled
          rounded
          color="green"
          dense
          type="number"
          label="Ingrese precio de separación en soles"
        >
        </v-text-field>
        <v-text-field
          v-model="project.properties.deposito_price"
          filled
          rounded
          color="green"
          dense
          type="number"
          label="Ingrese precio de depósito en soles"
        >
        </v-text-field>
      </v-col>
      <v-col>
        <v-text-field
          v-model="project.properties.room_max"
          color="green"
          filled
          dense
          rounded
          type="number"
          label="Ingrese número de habitaciones"
        >
        </v-text-field>
      </v-col>
    </v-row>
    <v-row class="pa-4">
      <v-col>
        <h4 class="my-4">Bancos con que trabaja</h4>
        <v-select
          v-model="project.properties.finance_bank"
          label="Escoja los bancos que financian"
          :items="banks"
          filled
          dense
          multiple
          color="green"
          rounded
        >
        </v-select>
      </v-col>
      <v-col>
        <h4 class="my-4">Amenities del proyecto</h4>
        <v-select
          v-model="project.properties.areas_comunes"
          label="Escoja los amenities que cuenta su proyecto"
          :items="amenities"
          color="green"
          filled
          dense
          multiple
          rounded
        >
        </v-select>
      </v-col>
    </v-row>
    <h4>Fotos</h4>
    <v-row>
      <v-col>
        <v-file-input
          @change="readFileMain"
          v-model="mainPhoto"
          label="Foto principal del proyecto  "
          filled
          color="green"
          dense
          rounded
          prepend-icon="mdi-camera"
        ></v-file-input>
        <v-img
          v-if="urlmain"
          width="400"
          height="500"
          class="mx-12 px-12"
          dark
          :src="urlmain"
          lazy-src="../../assets/salam-1.png"
        >
        </v-img>
      </v-col>
      <v-col>
        <v-file-input
          @change="readFile"
          v-model="aditionalPhotos"
          color="green"
          filled
          dense
          rounded
          multiple
          label="Fotos adicionales "
          prepend-icon="mdi-camera"
        ></v-file-input>
        <v-carousel v-if="urladitional.length > 0" class="imgs m-12">
          <v-carousel-item
            v-for="(img, i) in urladitional"
            :key="i"
            :src="img"
            reverse-transition="fade-transition"
            transition="fade-transition"
          ></v-carousel-item>
        </v-carousel>
      </v-col>
    </v-row>
    <v-row class="d-flex justify-center my-5 mr-10">
      <PreviewView
        :project="project.properties"
        :publish="publishProject"
        :loading="loading"
      />
      <v-btn color="green" @click="publishProject">
        Publicar proyecto
        <v-progress-circular
          class="ml-2"
          v-if="loading"
          left
          :size="25"
          :width="5"
          color="white"
          indeterminate
        ></v-progress-circular>
      </v-btn>
    </v-row>
    <ModalOk
      :dialog="published"
      :title="`El proyecto ${project.properties.name} fue publicado con éxito!`"
    />
  </v-card>
</template>

<script>
import moment from 'moment';
import { addFileToStorage, getFileFromStorage } from '../../firebase/storage';
import { addNewProject, userAddProject } from '../../firebase/database';
import { currentUser } from '../../firebase/auth';
import ModalOk from '../../components/ModalOk.vue';
import GoogleMap from '../../components/GoogleMap.vue';
import PreviewView from '../../components/PreviewView.vue';
import districts from '../../data/districts.json';
import ubigeo from '../../data/ubigeo.json';

export default {
  components: {
    GoogleMap,
    PreviewView,
    ModalOk,
  },
  data: () => ({
    loading: false,
    urlmain: '',
    urladitional: [],
    date: new Date().toISOString().substr(0, 10),
    project: {
      geometry: {},
      properties: {
        name: '',
        coin: 'S/.',
        direccion: '',
        imagenes: [],
        distrito: '',
        delivery_date: '',
        deposito_price: '',
        val_price1: '',
        project_phase: '',
        room_max: '',
        cantidad: '',
        project_whatsapp: '',
        floors: '',
        area_max: '',
        descripcion: '',
        finance_bank: '',
        areas_comunes: [],
      },
    },
    cotization: '',
    aditionalPhotos: '',
    mainPhoto: '',
    menu1: false,
    menu2: false,
    banks: [
      'BCP',
      'Pichincha',
      'Scotiabank',
      'Saga Falabella',
      'Interbank',
      'GNB',
    ],
    marker: [],
    districts,
    amenities: [
      'Areas verdes',
      'Área de juegos para niños',
      'Ascensor directo',
      'Boulevard peatonal',
      'Cancha de Fulbito',
      'Cancha de Squash',
      'Club House',
      'Cuarto de servicio',
      'Gimnasio',
      'Jardín de niños',
      'Karaoke',
      'Lobby',
      'Minimarket',
      'Parque privado',
      'Paseo de Aguas',
      'Piscina',
      'Sala Bar',
      'Salón Gourmet',
      'Sala de internet',
      'Sala de Niños',
      'Sala de cine',
      'Sala de usos Múltuples',
      'Sauna',
      'Techo Panorámico',
      'Techos Ecológicos',
      'Terraza',
      'Video vigilancia',
      'Zona de Lavandería',
      'Zona de Parrillas',
      'Otros',
    ],
    published: false,
    zoom: 12,
    latitude: -12.089637033755114,
    longitude: -77.05453930635801,
  }),
  watch: {
    date() {
      this.project.properties.delivery_date = moment(this.date).format(
        'DD/MM/YYYY',
      );
    },
  },
  methods: {
    addMarker(position) {
      this.marker = [
        {
          position,
        },
      ];
      this.project.geometry = {
        coordinates: [position.lng, position.lat],
        type: 'Point',
      };
    },
    currentLatLong(district) {
      const currentDistrict = ubigeo.filter((e) => e.distrito === district)[0];
      this.latitude = currentDistrict.lat;
      this.longitude = currentDistrict.long;
      this.zoom = 14;
    },
    readFile(e) {
      this.urladitional = e.map((file) => URL.createObjectURL(file));
      this.project.properties.imagenes = this.project.properties.imagenes.concat(
        this.urladitional,
      );
    },
    readFileMain(e) {
      this.urlmain = URL.createObjectURL(e);
      this.project.properties.imagenes.push(this.urlmain);
    },
    publishProject() {
      this.loading = true;
      const vm = this;
      vm.project.properties.id = new Date().getTime();
      const photos = [this.mainPhoto].concat(this.aditionalPhotos);
      const promises = addFileToStorage(
        `${currentUser().uid}/${this.project.properties.name}`,
        [this.cotization],
      );
      addFileToStorage(
        `${currentUser().uid}/${this.project.properties.name}`,
        photos,
      );
      Promise.all(promises)
        .then(() => photos.map((p) => p.name))
        .then((photoNames) => photoNames.map((photo) => getFileFromStorage(
          `${currentUser().uid}/${this.project.properties.name}/${photo}`,
        )))
        .then((url) => Promise.all(url).then((urls) => {
          vm.project.properties.imagenes = urls;
        }))
        .then(() => addNewProject(vm.project.properties.id, vm.project))
        .then(() => userAddProject(currentUser().uid, vm.project.properties.id))
        .then(() => {
          this.loading = false;
          this.published = true;
        });
    },
  },
  created() {
    this.$store.commit('layout/SET_LAYOUT', 'realState-layout');
    this.project.properties.builder_name = this.$route.query.name;
  },
};
</script>

<style lang="scss" scoped>
.imgs {
  width: 400px;
  height: 200px;
}
</style>
