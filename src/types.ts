// type TText = 'number' | 'operator' | 'text' | 'function'
const enum InputTypes {
    number = 'number',
    operator = 'operator',
    text = 'text',
    function = 'function',
}
type TValue = number | string
interface IButton {
    value: TValue;
    type: keyof typeof InputTypes,
    name: string,
    altValue?: TValue
}
export { TValue, IButton, InputTypes };
