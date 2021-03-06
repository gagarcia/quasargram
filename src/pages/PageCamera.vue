<template>
  <q-page class="constrain-more q-pa-md">
    <div class="camera-frame q-pa-md">
      <video
        v-show="!imageCaptured"
        class="full-width"
        autoplay
        ref="video"
      />
      <canvas 
        v-show="imageCaptured"
        ref="canvas"
        class="full-width"
        height="240"
      />
    </div>
    <div class="text-center q-pa-md">
      <q-btn v-if="hasCameraSupport" @click="captureImage" round color="grey-10" icon="eva-camera" size="lg"/>

      <q-file 
      v-else 
      label="choose an image"
      @input="captureImageFallback" 
      accept="image/*"
      outlined 
      v-model="imageUpload">
        <template v-slot:prepend>
          <q-icon name="eva-attach-outline" />
        </template>
      </q-file>

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
        :loading  = "locationLoading"
        lazy-rules
        v-model="post.location"
        dense
        label="Location"
        :rules="[ val => val && val.length > 0 || 'Please type something']"
      >
        <template v-slot:append>
          <q-btn v-if="!locationLoading" @click="getLocation" round dense flat icon="eva-navigation-2-outline" />
        </template>

      </q-input>
    </div>

    <div class="row justify-center q-ma-md">
      <q-btn @click="addPost()" unelevated rounded color="grey-10" label="Post" class="q-mt-md"/>
    </div>


  </q-page>
</template>

<script>
import { uid } from 'quasar'
require('md-gum-polyfill')

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
      },
      imageCaptured: false,
      imageUpload:[],
      hasCameraSupport: true,
      locationLoading: false
    }
  },
  methods: {
    initCamera () {
      navigator.mediaDevices.getUserMedia({
        video: true
      }).then(stream => {
        this.$refs.video.srcObject = stream
      }).catch(error => {
        this.hasCameraSupport = false
      })
    },
    captureImage () {
      let video = this.$refs.video
      let canvas = this.$refs.canvas

      canvas.width = video.getBoundingClientRect().width
      canvas.height = video.getBoundingClientRect().height

      let context = canvas.getContext('2d')

      context.drawImage(video, 0, 0, canvas.width, canvas.height)

      this.imageCaptured = true

      this.post.photo = this.dataURItoBlob(canvas.toDataURL())

      this.disableCamera()

    },
    captureImageFallback (file) {
      this.post.photo = file

      let canvas = this.$refs.canvas
      let context = canvas.getContext('2d')

      var reader = new FileReader()
      reader.onload = event => {
        var img = new Image()
        img.onload = () => {
          canvas.width = img.width
          canvas.height = img.height
          context.drawImage(img,0,0)
          this.imageCaptured = true

        }
        img.src = event.target.result
    }
    reader.readAsDataURL(file)
    },
    disableCamera() {
      this.$refs.video.srcObject.getVideoTracks().forEach(track => {
        track.stop()
      })
    },
    dataURItoBlob(dataURI) {
      // convert base64 to raw binary data held in a string
      // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
      var byteString = atob(dataURI.split(',')[1]);

      // separate out the mime component
      var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]

      // write the bytes of the string to an ArrayBuffer
      var ab = new ArrayBuffer(byteString.length);

      // create a view into the buffer
      var ia = new Uint8Array(ab);

      // set the bytes of the buffer to the correct values
      for (var i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i);
      }

      // write the ArrayBuffer to a blob, and you're done
      var blob = new Blob([ab], {type: mimeString});
      return blob;
    },
    getLocation () {
      this.locationLoading = true
      navigator.geolocation.getCurrentPosition(position => {
        this.getCityAndCoutry(position)
      }, err => {
        this.locationError()
      },{ timeout: 10000 })
    },
    getCityAndCoutry(position) {
      let apiUrl = `https://geocode.xyz/${ position.coords.latitude },${ position.coords.longitude }?json=1`
      this.$axios.get(apiUrl).then(result => {
        this.locationSucces(result)
      }).catch(err => {
        this.locationError()
      })
    },
    locationSucces(result) {
      this.post.location = result.data.city
      if (result.data.country) {
        this.post.location += `, ${ result.data.country }`
      }
      this.locationLoading = false
    },
    locationError() {
      this.$q.dialog({
        title: 'Ops!',
        message: 'we could not find you'
      })
      this.locationLoading = false
    },
    addPost() {
      let formData = new FormData()

      formData.append('id', this.post.id)
      formData.append('caption', this.post.caption)
      formData.append('location', this.post.location)
      formData.append('date', this.post.date)
      formData.append('file', this.post.photo, this.post.id + '.png')

      this.$axios.post(`${ process.env.API }/createPost`, formData).then(response => {
        console.log('response: ', response)
      }).catch(err => {
        console.log('err', err)
      })
    }
  },

  mounted () {
    this.initCamera()
  },
  beforeDestroy() {
    this.disableCamera()
  }
}
</script>

<style lang="sass">
  .camera-frame
    border: 2px solid $grey-10
    border-radius: 10px

</style>