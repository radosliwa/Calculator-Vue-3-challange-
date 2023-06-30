/* eslint-disable no-unused-vars */
enum InputTypes {
    NUMBER = 'number',
    OPERATOR = 'operator',
    POINT = 'point',
    FUNCTION = 'function'
}

enum Functions {
    RESET = 'reset',
    DELETE = 'del'
}

type TValue = number | keyof typeof InputTypes

type TOperator = '+' | '-' | '*' | '/' | '=' | 'reset' | 'del'

type TButtonValue = TOperator | number | '.' | '0.'
interface IButton {
    value: TButtonValue
    type: InputTypes
    name: string
}

const isOperator = (value: TButtonValue): value is TOperator =>
    ['+', '-', '*', '/', '=', 'reset', 'del'].includes(value as TOperator)

export { TValue, IButton, InputTypes, TButtonValue, isOperator, Functions }
