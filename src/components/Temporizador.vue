<template>
  <div class="is-flex is-align-items-center is-justify-content-space-between">
    <Cronometro :tempoEmSegundos="tempoEmSegundos" />

    <Botao @clicado="iniciar" icone="fas fa-play" texto="play" :desabilitado="cronometroRodando" />

    <Botao @clicado="finalizar" icone="fas fa-stop" texto="stop" :desabilitado="!cronometroRodando" />
    
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Cronometro from "./Cronometro.vue";
import Botao from "./Botao.vue";

export default defineComponent({
  name: "Temporizador",
  components: { Cronometro, Botao },
  emits: ['aoTemporizadorFinalizado'],
  data() {
    return {
      tempoEmSegundos: 0,
      cronometro: 0,
      cronometroRodando: false
    };
  },
  methods: {
    iniciar() {
      // começar a contagem
      // 1 seg = 1000 ms
      this.cronometroRodando = true
      this.cronometro = setInterval(() => {
        this.tempoEmSegundos += 1;
      }, 1000); // metodo do JS: a cada segundo que passar, executa a função do primeiro parametro
    },

    finalizar() {
        this.cronometroRodando = false
      // para de executar ao limpar o intervalo
      clearInterval(this.cronometro);
      // quem estiver ouvind o evento, receberá o 'tempoEmSegundos'
      this.$emit('aoTemporizadorFinalizado', this.tempoEmSegundos) 
      this.tempoEmSegundos = 0 // reseta o tempo
    },
  },
});
</script>
