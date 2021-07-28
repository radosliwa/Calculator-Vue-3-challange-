interface IVars {
    [key:string]:string,
}

interface IConfig {
    layout1: IVars;
    layout2: IVars;
    layout3: IVars;

}

const varsConfig = {
    layout1: {
        // backgrounds
        screenAndToggleBackground: '#182034',
        // $mainBackground: hsl(222, 26%, 31%),
        // $deviceBackground: hsl(223, 31%, 20%),
        // // keys
        // $keyShadowMain: 0px 5px 0px rgba(64, 78, 114, 0.6),
        // $keyShadowMainHover: 0px 8px 0px rgba(52, 65, 99, 1),
        // $keyShadowMainActive: 0px 5px 0px black,
        keyMainBcg: '#F0F0F0',
        // $keyBlueBcg: hsl(225, 21%, 49%),
        // $keyBlueShadow: 0px 5px 0px hsl(225, 21%, 49%),
        equalBcg: '#d02f2f',
        // $equalShadow:hsl(6, 70%, 34%);
    } as IVars,
    layout2: {
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
        // $equalBcg:hsl(6, 63%, 50%),
        // $equalShadow:hsl(6, 70%, 34%);
    } as IVars

} as IConfig;

export { IVars, IConfig, varsConfig };
