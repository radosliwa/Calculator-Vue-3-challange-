/* eslint-disable no-unused-vars */
enum InputTypes {
    number = 'number',
    operator = 'operator',
    point = 'point',
    function = 'function'
}

enum Functions {
    RESET = 'reset',
    DELETE = 'delete'
}

type TValue = number | keyof typeof InputTypes

type TOperator = '+' | '-' | '*' | '/' | '=' | 'reset' | 'delete'

type TButtonValue = TOperator | number | '.' | '0.'
interface IButton {
    value: TButtonValue
    type: keyof typeof InputTypes
    name: string
}

const isOperator = (value: TButtonValue): value is TOperator => ['+', '-', '*', '/', '=', 'reset', 'delete'].includes(value as TOperator)

export { TValue, IButton, InputTypes, TButtonValue, isOperator, Functions }
