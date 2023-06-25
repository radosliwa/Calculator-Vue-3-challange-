/* eslint-disable no-unused-vars */
enum InputTypes {
    number = 'number',
    operator = 'operator',
    point = 'point',
    function = 'function'
}
type TValue = number | string
interface IButton {
    value: TValue
    type: keyof typeof InputTypes
    name: string
}
export { TValue, IButton, InputTypes }
