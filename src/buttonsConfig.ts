import { InputTypes, Functions, IButton, OperatorNames } from './types'

export const config: IButton[] = [
    {
        value: 7,
        type: InputTypes.NUMBER,
        name: 'number'
    },
    {
        value: 8,
        type: InputTypes.NUMBER,
        name: InputTypes.NUMBER
    },
    {
        value: 9,
        type: InputTypes.NUMBER,
        name: InputTypes.NUMBER
    },
    {
        value: 'del',
        type: InputTypes.FUNCTION,
        name: Functions.DELETE
    },
    {
        value: 4,
        type: InputTypes.NUMBER,
        name: InputTypes.NUMBER
    },
    {
        value: 5,
        type: InputTypes.NUMBER,
        name: InputTypes.NUMBER
    },
    {
        value: 6,
        type: InputTypes.NUMBER,
        name: InputTypes.NUMBER
    },
    {
        value: '+',
        type: InputTypes.OPERATOR,
        name: OperatorNames.PLUS
    },
    {
        value: 1,
        type: InputTypes.NUMBER,
        name: 'number'
    },
    {
        value: 2,
        type: InputTypes.NUMBER,
        name: 'number'
    },
    {
        value: 3,
        type: InputTypes.NUMBER,
        name: 'number'
    },
    {
        value: '-',
        type: InputTypes.OPERATOR,
        name: 'minus'
    },
    {
        value: '.',
        type: InputTypes.POINT,
        name: 'point'
    },
    {
        value: 0,
        type: InputTypes.NUMBER,
        name: 'number'
    },
    {
        value: '/',
        type: InputTypes.OPERATOR,
        name: OperatorNames.DIVISION
    },
    {
        value: '*',
        type: InputTypes.OPERATOR,
        name: OperatorNames.TIMES
    },
    {
        value: Functions.RESET,
        type: InputTypes.FUNCTION,
        name: Functions.RESET
    },
    {
        value: '=',
        type: InputTypes.OPERATOR,
        name: OperatorNames.EQUAL
    }
]
