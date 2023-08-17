import { VueWrapper, mount } from '@vue/test-utils'
import Controller from '../src/components/Controller.vue'
import { describe, it, expect, beforeEach } from 'vitest'
import { config } from '../src/buttonsConfig'

describe('Controller.vue', () => {
    let wrapper: VueWrapper
    beforeEach(() => {
        wrapper = mount(Controller, {
            props: {
                config,
                currentLayout: 'layout1'
            }
        })
    })

    it('renders without crashing', () => {
        expect(wrapper).toBeTruthy()
    })

    it('renders correct number of buttons', () => {
        const buttons = wrapper.findAll('button')
        expect(buttons.length).toBe(config.length)
    })

    it('emits "key-selected" event on button click', async () => {
        const randomIndex = Math.floor(Math.random() * config.length)
        const randomButton = wrapper.findAll('button')[randomIndex]

        await randomButton.trigger('click')

        expect(wrapper.emitted()).toHaveProperty('key-selected')
        expect(wrapper.emitted()['key-selected'][0]).toEqual([config[randomIndex]])
    })

    it('applies correct classes based on currentLayout', async () => {
        const randomIndex = Math.floor(Math.random() * config.length)
        const randomButton = wrapper.findAll('button')[randomIndex]
        for (let i = 1; i <= 3; i++) {
            await wrapper.setProps({ currentLayout: `layout${i}` })
            expect(randomButton.classes()).toContain(`button--layout${i}`)
        }
    })
})
