/* eslint-disable no-unused-vars */
enum InputTypes {
    number = 'number',
    operator = 'operator',
    point = 'point',
    function = 'function'
}
type TValue = number | keyof typeof InputTypes
type TButtonValue = 'del' | '+' | '-' | '*' | '/' | '.' | '=' | 'reset' | number
interface IButton {
    value: TButtonValue
    type: keyof typeof InputTypes
    name: string
}
export { TValue, IButton, InputTypes, TButtonValue }
