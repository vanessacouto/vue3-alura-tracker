import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Tarefas from "../views/Tarefas.vue";
import Projetos from "../views/Projetos.vue";
import Formulario from "../views/Projetos/Formulario.vue";

const rotas: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Tarefas",
    component: Tarefas,
  },
  {
    path: "/projetos",
    name: "Projetos",
    component: Projetos,
  },
  {
    path: "/projetos/novo",
    name: "Novo projetos",
    component: Formulario,
  },
  {
    path: "/projetos/:id",
    name: "Editar projetos",
    component: Formulario,
  }
];

const roteador = createRouter({
  history: createWebHashHistory(),
  routes: rotas,
});

export default roteador;
