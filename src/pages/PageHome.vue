<template>
  <q-page class="constrain q-pa-md">
    <div class="row q-col-gutter-sm">
      <div class="col-12 col-sm-8">
        <q-card
          v-for="post in posts"
          :key="post.id"
          class="card-post q-mb-md" 
          flat bordered
        >
          <q-item>
            <q-item-section avatar>
              <q-avatar>
                <img src="https://media-exp1.licdn.com/dms/image/C4D03AQFBfPxUA7F9LQ/profile-displayphoto-shrink_800_800/0/1619736546168?e=1634169600&v=beta&t=J_BmNvNCsMlBEdQG__PVOpeSXG5muUoksarHtWc-dg0">
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label>Gabriel Garcia</q-item-label>
              <q-item-label caption>
                {{ post.location }}
              </q-item-label>
            </q-item-section>
          </q-item>

          <q-separator />

          <q-img
            :src="post.imageUrl"
          />

          <q-card-section>
            <div>{{ post.caption }}</div>
            <div class="text-caption text-grey">{{ post.date | niceDate }}</div>
          </q-card-section>

        </q-card>

      </div>

      <div class="col-4 large-screen-only">
        <q-item class="fixed">
          <q-item-section avatar>
            <q-avatar size="md">
              <img src="https://media-exp1.licdn.com/dms/image/C4D03AQFBfPxUA7F9LQ/profile-displayphoto-shrink_800_800/0/1619736546168?e=1634169600&v=beta&t=J_BmNvNCsMlBEdQG__PVOpeSXG5muUoksarHtWc-dg0">
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label>Gabriel Garcia</q-item-label>
            <q-item-label caption>
              Cravos, SP
            </q-item-label>
          </q-item-section>
        </q-item>
      </div>

    </div>

  </q-page>
</template>

<script>
import { date } from 'quasar'

export default {
  name: 'PageHome',
  data () {
    return {
      posts: [
        {
          id: 1,
          caption: 'Ponte',
          date: 1628684664588,
          location: 'Cravinhos, SP',
          imageUrl: 'https://cdn.quasar.dev/img/parallax2.jpg'
        },
        {
          id: 2,
          caption: 'Ponte',
          date: 1628684664588,
          location: 'Cravinhos, SP',
          imageUrl: 'https://cdn.quasar.dev/img/parallax2.jpg'
        },
        {
          id: 3,
          caption: 'Ponte',
          date: 1628684664588,
          location: 'Cravinhos, SP',
          imageUrl: 'https://cdn.quasar.dev/img/parallax2.jpg'
        },
        {
          id: 4,
          caption: 'Ponte',
          date: 1628684664588,
          location: 'Cravinhos, SP',
          imageUrl: 'https://cdn.quasar.dev/img/parallax2.jpg'
        },

      ]
    }
  },
  filters: {
    niceDate(value) {
      return date.formatDate(value, 'MMMM D h:mmA')
    }
  }

}
</script>

<style lang="sass">
  .card-post
    .q-img
      min-height: 200px
</style>