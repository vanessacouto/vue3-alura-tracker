import IProjeto from '@/interfaces/IProjeto'
import { InjectionKey } from 'vue'
import { createStore, Store } from 'vuex'

interface Estado {
    projetos: IProjeto[]
}

export const key: InjectionKey<Store<Estado>> = Symbol()

export const store = createStore<Estado>({
    state: {
        projetos: [
            {
                id: new Date().toISOString(),
                name: 'TypeScript'
            },
            {
                id: new Date().toISOString(),
                name: 'Vue'
            },
            {
                id: new Date().toISOString(),
                name: 'Vuex'
            },
        ]
    }
})