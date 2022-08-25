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
import { defineComponent, ref } from "vue";
import { TipoNotificacao } from "@/interfaces/INotificacao";
import useNotificador from "@/hooks/notificador";
import { ALTERAR_PROJETO, CADASTRAR_PROJETO } from "@/store/tipo-acoes";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "Formulario",
  props: {
    id: {
      type: String,
    },
  },
  // vamos fazer o mesmo que tem no 'data()', 'mounted()' e 'methods' (options API) so que no 'setup()' (composition API)
  // data() {
  //   return {
  //     nomeDoProjeto: "",
  //   };
  // },

  // mounted() {
  //   if (this.id) {
  //     // temos a prop 'id' quando estamos editando o Projeto
  //     const projeto = this.store.state.projeto.projetos.find(
  //       (proj) => proj.id == this.id
  //     );
  //     this.nomeDoProjeto = projeto?.nome || "";
  //   }
  // },
  // methods: {},
  setup(props) {
    const router = useRouter();

    const store = useStore();
    const { notificar } = useNotificador();

    // variavel reativa
    const nomeDoProjeto = ref("");

    if (props.id) {
      // temos a prop 'id' quando estamos editando o Projeto
      const projeto = store.state.projeto.projetos.find(
        (proj) => proj.id == props.id
      );
      nomeDoProjeto.value = projeto?.nome || "";
    }

    const lidarComSucesso = () => {
      nomeDoProjeto.value = "";
      // esta pegando o notificar do 'hook' notificador
      notificar(
        TipoNotificacao.SUCESSO,
        "Excelente!",
        "O projeto foi cadastrado/alterado com sucesso!"
      );
      router.push("/projetos"); // apos salvar, redireciona
    };

    const salvar = () => {
      if (props.id) {
        // edição
        store
          .dispatch(ALTERAR_PROJETO, {
            id: props.id,
            nome: nomeDoProjeto.value,
          })
          .then(() => {
            // se tudo der ok no dispatch, executa esse código
            lidarComSucesso();
          });
      } else {
        // chama a action
        store.dispatch(CADASTRAR_PROJETO, nomeDoProjeto.value).then(() => {
          // se tudo der ok no dispatch, executa esse código
          lidarComSucesso();
        });
      }
    };

    return {
      nomeDoProjeto,
      salvar
    };
  },
});
</script>
