<template>
  <div class="notificacoes">
    <article class="message is-success">
      <div class="message-header">Atenção!</div>
      <div class="message-body">aqui vai um texto de notificação</div>
    </article>
    <article class="message is-warning">
      <div class="message-header">Atenção!</div>
      <div class="message-body">aqui vai um texto de notificação</div>
    </article>
    <article class="message is-danger">
      <div class="message-header">Atenção!</div>
      <div class="message-body">aqui vai um texto de notificação</div>
    </article>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Notificacoes",
});
</script>

<style scoped>
.notificacoes {
  position: absolute;
  right: 0;
  width: 300px;
  padding: 8px;
  z-index: 105;
}
</style>
