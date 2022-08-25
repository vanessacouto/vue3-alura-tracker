import INotificacao from '@/interfaces/INotificacao'
import IProjeto from '@/interfaces/IProjeto'
import { InjectionKey } from 'vue'
import { createStore, Store, useStore as vuexUseStore } from 'vuex'
import { ALTERAR_PROJETO, CADASTRAR_PROJETO, OBTER_PROJETOS, OBTER_TAREFAS, REMOVER_PROJETO } from './tipo-acoes'
import { ADICIONA_PROJETO, ALTERA_PROJETO, DEFINIR_PROJETOS, DEFINIR_TAREFAS, EXCLUIR_PROJETO, NOTIFICAR } from './tipo-mutacoes'
import http from '@/http'
import ITarefa from '@/interfaces/ITarefa'

interface Estado {
    projetos: IProjeto[],
    tarefas: ITarefa[],
    notificacoes: INotificacao[]
}

export const key: InjectionKey<Store<Estado>> = Symbol()

export const store = createStore<Estado>({
    state: {
        tarefas: [],
        projetos: [],
        notificacoes: []
    },
    mutations : {
        [ADICIONA_PROJETO](state, nomeDoProjeto: string) {
            const projeto = {
                id: new Date().toISOString(),
                nome: nomeDoProjeto
            } as IProjeto
            state.projetos.push(projeto)
        },
        [ALTERA_PROJETO](state, projeto: IProjeto) {
            const index = state.projetos.findIndex(proj => proj.id === projeto.id)
            state.projetos[index] = projeto
        },
        [EXCLUIR_PROJETO](state, id: string) {
            state.projetos = state.projetos.filter(proj => proj.id != id)
        },
        [DEFINIR_PROJETOS](state, projetos: IProjeto[]) {
            state.projetos = projetos
        },
        [DEFINIR_TAREFAS](state, tarefas: ITarefa[]) {
            state.tarefas = tarefas
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
        [OBTER_PROJETOS] ({ commit }) {
            http.get('projetos') // o get retorna uma Promise
                .then(resposta => commit(DEFINIR_PROJETOS, resposta.data)) // chama o mutation para commitar a ação
        },
        [CADASTRAR_PROJETO] (contexto, nomeDoProjeto: string) {
            // retorna uma Promise
            return http.post('projetos', {
                nome: nomeDoProjeto
            }) 
        },
        [ALTERAR_PROJETO] (contexto, projeto: IProjeto) {
            // retorna uma Promise
            return http.put(`projetos/${projeto.id}`, projeto) 
        },
        [REMOVER_PROJETO] ({ commit }, id: string) {
            // retorna uma Promise
            return http.delete(`projetos/${id}`)
                // se deletou com sucesso, remove da lista logicamente
                 .then(() => commit(EXCLUIR_PROJETO, id))
        },
        [OBTER_TAREFAS] ({ commit }) {
            http.get('tarefas') // o get retorna uma Promise
                .then(resposta => commit(DEFINIR_TAREFAS, resposta.data)) // chama o mutation para commitar a ação
        },
    }
})

export function useStore(): Store<Estado> {
    return vuexUseStore(key)
}