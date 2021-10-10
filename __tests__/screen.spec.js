import { shallowMount } from '@vue/test-utils'
import Screen from '@/components/Screen.vue'

describe('Screen.vue', () => {
    const number = Math.random()
    const wrapper = shallowMount(Screen, {
        props: { number }
    })

    it('shows input', () => {
        expect(wrapper.text()).toContain(number)
    })
})
