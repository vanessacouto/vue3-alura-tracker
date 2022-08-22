import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router"
import Tarefas from "../views/Tarefas.vue";

const rotas: RouteRecordRaw[] = [{
    path: '/',
    name: 'Tarefas',
    component: Tarefas
}]

const roteador = createRouter({
    history: createWebHashHistory(),
    routes: rotas
})

export default roteador