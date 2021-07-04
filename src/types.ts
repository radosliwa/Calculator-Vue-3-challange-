type TText = 'number'|'operator'|'text'| 'function'
type TValue = number|string
interface IButton {
    value: TValue;
    type: TText,
    name: string,
    altValue?:TValue
}
export { TText, TValue, IButton };
