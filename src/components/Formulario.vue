<template>
  <div class="box">
    <div class="columns">
      <div
        class="column is-8"
        role="form"
        aria-label="Formulário para a criação de uma nova tarefa"
      >
        <input
          type="text"
          class="input"
          placeholder="Qual tarefa você deseja iniciar?"
        />
      </div>
      <div class="column">
        <div
          class="is-flex is-align-items-center is-justify-content-space-between"
        >
          <section>
            <strong>{{ tempoDecorrido }}</strong>
          </section>
          <button class="button" @click="iniciar">
            <span class="icon">
              <i class="fas fa-play"></i>
            </span>
            <span>play</span>
          </button>
          <button class="button" @click="finalizar">
            <span class="icon">
              <i class="fas fa-stop"></i>
            </span>
            <span>stop</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Formulario",
  data() {
    return {
      tempoEmSegundos: 0,
      cronometro: 0
    };
  },
  computed: {
    tempoDecorrido (): string {
      // recebe o tempo em milissegundos e pegamos a porção de hora/min/seg que o ISOString retorna
      return new Date(this.tempoEmSegundos * 1000).toISOString().substr(11,8)
    }
  },
  methods: {
    iniciar() {
      // começar a contagem
      // 1 seg = 1000 ms
      this.cronometro = setInterval(() => {
        this.tempoEmSegundos += 1;
      }, 1000); // metodo do JS: a cada segundo que passar, executa a função do primeiro parametro
    },

    finalizar() {
      // para de executar ao limpar o intervalo
      clearInterval(this.cronometro)
    },
  },
});
</script>
