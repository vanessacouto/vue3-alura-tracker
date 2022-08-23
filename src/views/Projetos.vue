<template>
  <section class="projetos">
    <h1 class="title">Projetos</h1>
    <form @submit.prevent="salvar">
      <div class="field">
        <label for="nomeDoProjeto" class="label"> Nome do Projeto </label>
        <input
          type="text"
          class="input"
          v-model="nomeDoProjeto"
          id="nomeDoProjeto"
        />
      </div>
      <div class="field">
        <button class="button" type="submit">Salvar</button>
      </div>
    </form>
    <table class="table is-fullwidth">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nome</th>
        </tr>
      </thead>
      <tbody v-for="projeto in projetos" :key="projeto.id">
        <tr>
          <td>{{ projeto.id }}</td>
          <td>{{ projeto.nome }}</td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script lang="ts">
import { useStore } from "@/store";
import { computed, defineComponent } from "vue";

export default defineComponent({
  name: "Projetos",
  data() {
    return {
      nomeDoProjeto: ""
    };
  },
  methods: {
    salvar() {
      // const projeto: IProjeto = {
      //   nome: this.nomeDoProjeto,
      //   id: new Date().toISOString(),
      // };
      // this.projetos.push(projeto);

      // salvar o projeto usando a mutation
      this.store.commit('ADICIONA_PROJETO', this.nomeDoProjeto)
      this.nomeDoProjeto = "";
    },
  },
  setup () {
    const store = useStore()
    return {
      store,
      projetos: computed(() => store.state.projetos)
    }
  }
});
</script>

<style scoped>
.projetos {
  padding: 1.25rem;
}
</style>
