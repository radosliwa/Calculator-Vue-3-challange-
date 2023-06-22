import { shallowMount } from '@vue/test-utils';
import Controller from '@/components/Controller.vue';

describe('Controller.vue', () => {
    const wrapper = shallowMount(Controller);
    const buttons = wrapper.findAll('.button-number');
    const buttonToClick = buttons[Math.floor(Math.random() * 5)];

    it('emits value when keypad buttons are clicked', async () => {
        await buttonToClick.trigger('click');
        expect(wrapper.emitted()['key-selected']).toBeTruthy();
    });

    it('emitted value equals current value', async () => {
        await buttonToClick.trigger('click');
        const emittedValue = wrapper.emitted()['key-selected'][0][0]._value.value;
        const currentValue = wrapper.vm.currentValue.value;
        expect(currentValue).toEqual(emittedValue);
    });
});
