

export interface Station {
    area : {
        code : string,
        name : string,
        furigana : string
    },
    city : {
        code : string,
        name : string,
        furigana : string
    },
    code : string,
    name : string,
    furigana : string,
    lat : string,
    lon : string,
    pref : {
        name : string,
        code : number,
        furigana : string
    },
    affi : string
}