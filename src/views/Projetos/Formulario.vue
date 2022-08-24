<template>
  <section>
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
  </section>
</template>

<script lang="ts">
import { useStore } from "@/store";
import { defineComponent } from "vue";
import { ADICIONA_PROJETO, ALTERA_PROJETO, NOTIFICAR } from '@/store/tipo-mutacoes'
import { TipoNotificacao } from "@/interfaces/INotificacao";

export default defineComponent({
  name: "Formulario",
  props: {
    id: {
      type: String
    }
  },
  data() {
    return {
      nomeDoProjeto: "",
    };
  },
  mounted () {
    if (this.id) { // temos a prop 'id' quando estamos editando o Projeto
      const projeto = this.store.state.projetos.find(proj => proj.id === this.id)
      this.nomeDoProjeto = projeto?.nome || ''
    }
  },
  methods: {
    salvar() {
      if (this.id) { // edição
        this.store.commit(ALTERA_PROJETO, {
          id: this.id,
          nome: this.nomeDoProjeto
        })
      } else {
      // salvar o projeto usando a mutation
      this.store.commit(ADICIONA_PROJETO, this.nomeDoProjeto);  
      }
      this.nomeDoProjeto = "";
      this.store.commit(NOTIFICAR, {
        titulo: 'Novo projeto foi salvo',
        texto: 'Prontinho 😁 seu projeto já está disponível',
        tipo: TipoNotificacao.SUCESSO
      })
      this.$router.push("/projetos"); // apos salvar, redireciona
    },
  },
  setup() {
    const store = useStore();
    return {
      store,
    };
  },
});
</script>
