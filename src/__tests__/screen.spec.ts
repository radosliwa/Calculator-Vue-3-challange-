import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import Screen from '@/components/Screen.vue'

describe('Screen.vue', () => {
    const number = Math.random()
    const wrapper = mount(Screen, {
        props: { number }
    })

    it('shows input', () => {
        expect(wrapper.text()).toContain(number)
    })
})
