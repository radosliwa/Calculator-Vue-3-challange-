import { mount } from '@vue/test-utils'
import { describe, it, expect, beforeEach } from 'vitest'
import App from '../src/App.vue'
import Screen from '../src/components/Screen.vue'

describe('App.vue', () => {
    const wrapper = mount(App)
    let randomNumber: number | string
    beforeEach(() => {
        wrapper.find('.button-reset').trigger('click')
        randomNumber = Math.floor(Math.random() * 10)
    })

    it('can select numbers and reset them', async () => {
        const numbers = [...Array(10).keys()]
        for (const number of numbers) {
            await wrapper.find(`.button-${number}`).trigger('click')
            expect(wrapper.findComponent(Screen).text()).toEqual(String(number))
            await wrapper.find(`.button-${number}`).trigger('click')
            await wrapper.find(`.button-${number}`).trigger('click')
            expect(wrapper.findComponent(Screen).text()).toEqual(
                String(number !== 0 ? `${number}${number}${number}` : 0)
            )
            await wrapper.find('.button-reset').trigger('click')
        }
    })

    it('can select different numbers and reset screen', async () => {
        const numbers = [...Array(10).keys()]
        for (const number of numbers) {
            await wrapper.find(`.button-${number}`).trigger('click')
            expect(wrapper.findComponent(Screen).text()).toEqual(String(number))
            await wrapper.find(`.button-${randomNumber}`).trigger('click')
            expect(wrapper.findComponent(Screen).text()).toEqual(
                String(number !== 0 ? `${number}${randomNumber}` : `${randomNumber}`)
            )
            await wrapper.find('.button-reset').trigger('click')
            expect(wrapper.findComponent(Screen).text()).toEqual('0')
        }
    })

    it('can select "." and then add numbers', async () => {
        await wrapper.find(`.button-point`).trigger('click')
        await wrapper.find(`.button-${randomNumber}`).trigger('click')
        expect(wrapper.findComponent(Screen).text()).toEqual(`0.${randomNumber}`)
    })
    // addition test
    it('can add numbers', async () => {
        await wrapper.find(`.button-${randomNumber}`).trigger('click')
        await wrapper.find(`.button-plus`).trigger('click')
        await wrapper.find(`.button-${randomNumber}`).trigger('click')
        await wrapper.find(`.button-equal`).trigger('click')
        expect(wrapper.findComponent(Screen).text()).toEqual(String(Number(randomNumber) + Number(randomNumber)))
        await wrapper.find('.button-reset').trigger('click')
        // addition with point
        await wrapper.find(`.button-7`).trigger('click')
        await wrapper.find(`.button-point`).trigger('click')
        await wrapper.find(`.button-6`).trigger('click')
        await wrapper.find(`.button-plus`).trigger('click')
        await wrapper.find(`.button-8`).trigger('click')
        await wrapper.find(`.button-point`).trigger('click')
        await wrapper.find(`.button-2`).trigger('click')
        await wrapper.find(`.button-equal`).trigger('click')
        const sum = Math.round(eval(String(7.6 + 8.2)) * 1e10) / 1e10
        const screen = String(wrapper.findComponent(Screen).text())
        expect(screen).toEqual(String(sum))
    })
})
