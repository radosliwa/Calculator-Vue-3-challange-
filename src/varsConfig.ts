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
        mainBackground: '#E6E6E6',
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
        textScreen: '#FFF',
        textWhite: '#FFF',

    } as IVars,
    layout2: {
        /* backgrounds */
        mainBackground: '#E6E6E6',
        toggleBackground: '#D1CCCC',
        keypadBackground: '#D1CCCC',
        screenBackground: '#EDEDED',
        keyMainBcg: '#377F86',
        keyDelBcg: '#637097',
        keyEqualBcg: '#CA5502',
        /* shadows */
        keyEqualShadow: '#893901',
        /* keys */
        keyMainCol: '#000',
        keyDelCol: '#FFF',
        textScreen: '#FFF',
        textWhite: '#FFF',
    } as IVars,
    layout3: {
        // backgrounds
        screenAndToggleBackground: 'red',
        // $mainBackground: hsl(222, 26%, 31%),
        // $deviceBackground: hsl(223, 31%, 20%),
        // // keys
        // $keyBcg: hsl(225, 21%, 49%),
        // $keyShadowMain: 0px 5px 0px rgba(64, 78, 114, 0.6),
        // $keyShadowMainHover: 0px 8px 0px rgba(52, 65, 99, 1),
        // $keyShadowMainActive: 0px 5px 0px black,
        // $keyWhiteBcg: #F0F0F0,
        // $keyBlueBcg: hsl(225, 21%, 49%),
        // $keyBlueShadow: 0px 5px 0px hsl(225, 21%, 49%),
        // $keyEqualBcg:hsl(6, 63%, 50%),
        // $equalShadow:hsl(6, 70%, 34%);
    } as IVars

};

export { IVars, IConfig, varsConfig };
