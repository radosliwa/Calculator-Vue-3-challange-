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

enum OperatorValues {
    MINUS = '-',
    PLUS = '+',
    DIVISION = '/',
    TIMES = '*',
    EQUAL = '='
}

const OperatorValuesArr = Object.values(OperatorValues)

type TOperatorsAndFunctions = `${OperatorValues}` | `${Functions}`

type TButtonValue = TOperatorsAndFunctions | number | '.' | '0.'

const isInputNotANumber = (value: unknown): value is TOperatorsAndFunctions =>
    ['-', '+', '/', '*', '=', ...Object.values(Functions)].includes(value as TOperatorsAndFunctions)

enum OperatorNames {
    MINUS = 'minus',
    PLUS = 'plus',
    DIVISION = 'division',
    TIMES = 'times',
    EQUAL = 'equal'
}

type IButton = {
    value: number | string
} & (
    | {
          type: InputTypes.NUMBER
          name: 'number'
      }
    | {
          type: InputTypes.OPERATOR
          name: `${OperatorNames}`
      }
    | {
          type: InputTypes.POINT
          name: 'point'
      }
    | {
          type: InputTypes.FUNCTION
          name: `${Functions}`
      }
)

export { TValue, IButton, InputTypes, TButtonValue, isInputNotANumber, OperatorValues, Functions, OperatorNames }
