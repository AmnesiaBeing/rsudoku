<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
  type: String,
  title: String,
  visible: Boolean,
});

const classes = computed(() => {
  return `dialog-bg-${props.type}`;
});

const emit = defineEmits(["update:visible"]);
</script>

<template>
  <div
    class="dialog"
    :class="classes"
    v-if="props.visible"
  >
    <div class="dialog-main">
      <div class="dialog-content">
        <h2 v-if="props.title">{{ props.title }}</h2>
        <slot></slot>
      </div>
    </div>
  </div>
</template>
