interface IVars {
    [key: string]: string,
}

interface IConfig {
    layout1: IVars;
    layout2: IVars;
    layout3: IVars;

}

const varsConfig: IConfig = {
    layout1: {
        /* backgrounds */
        mainBackground: '#3A4764',
        toggleBackground: '#182034',
        keypadBackground: '#182034',
        screenBackground: '#182034',
        keyMainBcg: '#F0F0F0',
        keyDelBcg: '#637097',
        keyEqualBcg: '#d02f2f',
        /* shadows */
        keyEqualShadow: '#93261A',
        /* keys */
        keyMainCol: '#000',
        keyDelCol: '#FFF',
        keyEqualCol: '#FFF',
        /* text */
        textScreen: '#FFF',
        textToggle: '#FFF'

    } as IVars,
    layout2: {
        /* backgrounds */
        mainBackground: '#E6E6E6',
        toggleBackground: '#D1CCCC',
        keypadBackground: '#D1CCCC',
        screenBackground: '#D1CCCC',
        keyMainBcg: '#E5E4E1',
        keyDelBcg: '#377F86',
        keyEqualBcg: '#CA5502',
        /* shadows */
        keyEqualShadow: '#893901',
        /* keys */
        keyMainCol: '#000',
        keyDelCol: '#FFF',
        /* text */
        textScreen: '#FFF',
        textToggle: '#000'
    } as IVars,
    layout3: {
        /* backgrounds */
        // 1D0934
        mainBackground: '#160628',
        toggleBackground: '#160628',
        keypadBackground: '#1D0934',
        screenBackground: '#160628',
        keyMainBcg: '#341C4F',
        keyDelBcg: '#58077D',
        keyEqualBcg: '#00E0D1',
        /* shadows */
        keyEqualShadow: '#893901',
        /* keys */
        keyMainCol: '#FFE53D',
        keyDelCol: '#FFF',
        textScreen: '#FFE53D'
    } as IVars

};

export { IVars, IConfig, varsConfig };