<template>
  <Formulario @aoSalvarTarefa="salvarTarefa" />
  <div class="lista">
    <Tarefa v-for="(tarefa, index) in tarefas" :key="index" :tarefa="tarefa" />
    <Box v-if="listaVazia"> Você não está muito produtivo hoje 😅 </Box>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import Formulario from "../components/Formulario.vue";
import Tarefa from "../components/Tarefa.vue";
import Box from "../components/Box.vue";
import { useStore } from "@/store";
import { OBTER_TAREFAS } from "@/store/tipo-acoes";

// https://github.com/alura-cursos/alura-tracker

export default defineComponent({
  name: "App",
  components: {
    Formulario,
    Tarefa,
    Box,
  },
  computed: {
    listaVazia(): boolean {
      return this.tarefas.length === 0;
    },
  },
  methods: {
    // salvarTarefa(tarefa: ITarefa) {
    //   this.tarefas.push(tarefa);
    // },
  },
  setup() {
    const store = useStore();
    store.dispatch(OBTER_TAREFAS)
    
    return {
      tarefas: computed(() => store.state.tarefas),
      store
    };
  },
});
</script>

