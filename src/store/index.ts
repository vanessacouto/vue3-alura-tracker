import INotificacao from '@/interfaces/INotificacao'
import { InjectionKey } from 'vue'
import { createStore, Store, useStore as vuexUseStore } from 'vuex'
import { ALTERAR_TAREFA, CADASTRAR_TAREFA, OBTER_TAREFAS } from './tipo-acoes'
import { ADICIONA_TAREFA, ALTERA_TAREFA, DEFINIR_TAREFAS, NOTIFICAR } from './tipo-mutacoes'
import http from '@/http'
import ITarefa from '@/interfaces/ITarefa'
import { EstadoProjeto, projeto } from './modulos/projeto'

// estado global
export interface Estado {
    tarefas: ITarefa[],
    notificacoes: INotificacao[],
    projeto: EstadoProjeto
}

export const key: InjectionKey<Store<Estado>> = Symbol()

export const store = createStore<Estado>({
    state: {
        tarefas: [],
        notificacoes: [],
        projeto: {
            projetos: []
        }
    },
    mutations : {
        [DEFINIR_TAREFAS](state, tarefas: ITarefa[]) {
            state.tarefas = tarefas
        },
        [ADICIONA_TAREFA](state, tarefa: ITarefa) {
            state.tarefas.push(tarefa)
        },
        [ALTERA_TAREFA](state, tarefa: ITarefa) {
            const index = state.tarefas.findIndex(t => t.id == tarefa.id)
            state.tarefas[index] = tarefa
        },
        [NOTIFICAR](state, novaNotificaao: INotificacao) {
            novaNotificaao.id = new Date().getTime(),
            state.notificacoes.push(novaNotificaao)

            setTimeout(() => {
                state.notificacoes = state.notificacoes.filter(notificacao => notificacao.id != novaNotificaao.id)
            }, 3000) // depois de 3 segundos, remove a notificao do state
        }
    },
    actions: {
        [OBTER_TAREFAS] ({ commit }) {
            http.get('tarefas') // o get retorna uma Promise
                .then(resposta => commit(DEFINIR_TAREFAS, resposta.data)) // chama o mutation para commitar a ação
        },
        [CADASTRAR_TAREFA] ({ commit }, tarefa: ITarefa) {
            // retorna uma Promise
            return http.post('tarefas', tarefa) 
                // pega a tarefa recem adicionada e insere no state (a 'resposta.data' contem todos os dados da tarefa recem cadastrada)
                .then(resposta => commit(ADICIONA_TAREFA, resposta.data))
        },
        [ALTERAR_TAREFA] ({ commit }, tarefa: ITarefa) {
            // retorna uma Promise
            return http.put(`tarefas/${tarefa.id}`, tarefa) 
                .then(() => commit(ALTERA_TAREFA, tarefa))
        },
    },
    modules: {
        projeto
    }
})

export function useStore(): Store<Estado> {
    return vuexUseStore(key)
}