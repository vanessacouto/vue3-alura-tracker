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
import { TipoNotificacao } from "@/interfaces/INotificacao";
import useNotificador from "@/hooks/notificador";
import { ALTERAR_PROJETO, CADASTRAR_PROJETO } from "@/store/tipo-acoes";

export default defineComponent({
  name: "Formulario",
  props: {
    id: {
      type: String,
    },
  },
  data() {
    return {
      nomeDoProjeto: "",
    };
  },
  mounted() {
    if (this.id) {
      // temos a prop 'id' quando estamos editando o Projeto
      const projeto = this.store.state.projeto.projetos.find(
        (proj) => proj.id == this.id
      );
      this.nomeDoProjeto = projeto?.nome || "";
    }
  },
  methods: {
    salvar() {
      if (this.id) {
        // edição
        this.store
          .dispatch(ALTERAR_PROJETO, {
            id: this.id,
            nome: this.nomeDoProjeto,
          })
          .then(() => {
            // se tudo der ok no dispatch, executa esse código
            this.lidarComSucesso();
          });
      } else {
        // chama a action
        this.store.dispatch(CADASTRAR_PROJETO, this.nomeDoProjeto).then(() => {
          // se tudo der ok no dispatch, executa esse código
          this.lidarComSucesso();
        });
      }
    },
    lidarComSucesso() {
      this.nomeDoProjeto = "";
      // esta pegando o notificar do 'hook' notificador
      this.notificar(
        TipoNotificacao.SUCESSO,
        "Excelente!",
        "O projeto foi cadastrado/alterado com sucesso!"
      );
      this.$router.push("/projetos"); // apos salvar, redireciona
    },
  },
  setup() {
    const store = useStore();
    const { notificar } = useNotificador();
    return {
      store,
      notificar,
    };
  },
});
</script>
