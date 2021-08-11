<template>
  <q-page class="constrain-more q-pa-md">
    <div class="camera-frame q-pa-md">
      <img class="full-width" src="https://cdn.quasar.dev/img/parallax2.jpg">
    </div>
    <div class="text-center q-pa-md">
      <q-btn round color="grey-10" icon="eva-camera" size="lg"/>
    </div>
    <div class="row justify-center q-ma-md">
      <q-input
        class="col col-sm-6"
        lazy-rules
        v-model="post.caption"
        dense
        label="Caption"
        :rules="[ val => val && val.length > 0 || 'Please type something']"
      />
    </div>
    <div class="row justify-center q-ma-md">
      <q-input
        class="col col-sm-6"
        lazy-rules
        v-model="post.location"
        dense
        label="Location"
        :rules="[ val => val && val.length > 0 || 'Please type something']"
      >
        <template v-slot:append>
          <q-btn round dense flat icon="eva-navigation-2-outline" />
        </template>

      </q-input>
    </div>

    <div class="row justify-center q-ma-md">
      <q-btn unelevated rounded color="grey-10" label="Post" class="q-mt-md"/>
    </div>


  </q-page>
</template>

<script>
import { uid } from 'quasar'

export default {
  name: 'PageCamera',
  data () {
    return {
      post: {
        id:uid(),
        caption: '',
        location: '',
        photo: null,
        date: Date.now(),
      }
    }
  }
}
</script>

<style lang="sass">
  .camera-frame
    border: 2px solid $grey-10
    border-radius: 10px

</style>