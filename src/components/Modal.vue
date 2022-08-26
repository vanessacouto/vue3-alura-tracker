<template>
  <div
    class="modal"
    :class="{ 'is-active': mostrar }"
    v-if="mostrar"
  >
    <div class="modal-background"></div>
    <slot />

    <div class="modal-card">
      <!-- o slot vai representar todos os elementos que estiverem dentro da tag do Modal -->  
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Modal",
  props: {
      mostrar: {
          type: Boolean,
          required: true
      }
  }
});
</script>
