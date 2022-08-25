import INotificacao from '@/interfaces/INotificacao'
import IProjeto from '@/interfaces/IProjeto'
import { InjectionKey } from 'vue'
import { createStore, Store, useStore as vuexUseStore } from 'vuex'
import { OBTER_PROJETOS } from './tipo-acoes'
import { ADICIONA_PROJETO, ALTERA_PROJETO, DEFINIR_PROJETOS, EXCLUIR_PROJETO, NOTIFICAR } from './tipo-mutacoes'
import http from '@/http'

interface Estado {
    projetos: IProjeto[],
    notificacoes: INotificacao[]
}

export const key: InjectionKey<Store<Estado>> = Symbol()

export const store = createStore<Estado>({
    state: {
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
        }
    }
})

export function useStore(): Store<Estado> {
    return vuexUseStore(key)
}