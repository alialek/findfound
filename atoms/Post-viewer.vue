<template>
  <!-- eslint-disable vue/no-v-html -->
  <div>
    <div v-for="(tag, n) in text.blocks" :key="n">
      <p
        v-if="tag.type === 'paragraph'"
        class="paragraph"
        v-html="tag.data.text"
      ></p>
      <h2
        v-if="tag.type === 'header'"
        class="header my-5"
        v-html="tag.data.text"
      ></h2>
      <div v-if="tag.type === 'image'" class="my-8">
        <div
          class="justify-center"
          style="display: flex; background-color: #eee"
        >
          <img :src="tag.data.file.url" style="width: 100% !important" />
        </div>
        <p class="my-1 text-center post-caption">{{ tag.data.caption }}</p>
      </div>
      <div v-if="tag.type === 'list'" class="my-2 ml-2 mb-4">
        <ol v-if="tag.data.style === 'ordered'">
          <li v-for="(item, m) in tag.data.items" :key="m" class="my-1">
            {{ item }}
          </li>
        </ol>
        <ul v-if="tag.data.style === 'unordered'">
          <li v-for="(item, i) in tag.data.items" :key="i" class="my-1">
            {{ item }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PostViewer',
  props: {
    post: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    text() {
      return this.post
    },
  },
}
</script>

<style></style>
