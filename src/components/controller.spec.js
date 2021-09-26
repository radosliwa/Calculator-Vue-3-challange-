import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import Controller from '@/components/Controller.vue'

describe('Controller.vue', () => {
    const wrapper = shallowMount(Controller)
    it('emits value when keypad buttons are clicked', async () => {
        // expect(wrapper.text()).to.include(number)
        const buttons = wrapper.findAll('.button-number')
        console.log('buttons ', buttons);
        
        // await buttons[Math.floor(Math.random * 5)].trigger('click')
        // expect(wrapper.emitted()['key-value']).toBeTruthy()
    })
})