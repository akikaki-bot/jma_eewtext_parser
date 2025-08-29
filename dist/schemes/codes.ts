

export const Telegram_Title_Codes = {
    35 : "最大予測震度のみの緊急地震速報",
    36 : "マグニチュード、最大予測震度及び主要動到達予測時刻の緊急地震速報",
    37 : "マグニチュード、最大震度及び主要動到達時刻の緊急地震速報",
    38 : "テスト電文 ( ﾅｳｷﾔｽﾄﾃｽﾄ 91 )",
    39 : "キャンセル（取り消し）情報",
    47 : "一般向け緊急地震速報",
    48 : "キャンセル報",
    61 : "リアルタイム震度電文（工学的基礎面の値）リアルタイム震度電文のキャンセル報"
} as const

export type TelegramTitleCode = keyof typeof Telegram_Title_Codes;

export const Telegram_Export_Places = {
    1 : "札幌",
    2 : "仙台",
    3 : "東京",
    4 : "大阪",
    5 : "福岡"
} as const

export type TelegramExportPlace = keyof typeof Telegram_Export_Places;

export const Telegram_Condition = {
    0 : "通常",
    1 : "訓練",
    10 : "通常の取り消し",
    11 : "訓練の取り消し",
    20 : "参考情報またはテスト電文",
    30 : "コード部全体の配信試験"
}

export type TelegramCondition = keyof typeof Telegram_Condition;

export const DataCorrectly_N1 = {
    1 : "P 波／S 波レベル越え、IPF 法（1 点）、または仮定震源要素",
    2 : "IPF 法（2 点）",
    3 : "IPF 法（3 点／4 点）",
    4 : "IPF 法（5 点）",
    5 : "防災科研システム（4 点以下、または精度情報なし）",
    6 : "防災科研システム（5 点以上）",
    7 : "EPOS（海域〔観測網外〕）",
    8 : "EPOS（内陸〔観測網内〕）",
    9 : "予備"
} as const

export type DCN1 = typeof DataCorrectly_N1[keyof typeof DataCorrectly_N1];

export type DataCorrectlyN1 = keyof typeof DataCorrectly_N1;

export const DataCorrectly_N2 = {
    1 : "P 波／S 波レベル越え、IPF 法（1 点）、または仮定震源要素",
    2 : "IPF 法（2 点）",
    3 : "IPF 法（3 点／4 点）",
    4 : "IPF 法（5 点）",
    5 : "防災科研システム（4 点以下、または精度情報なし）",
    6 : "防災科研システム（5 点以上）",
    7 : "EPOS（海域〔観測網外〕）",
    8 : "EPOS（内陸〔観測網内〕）",
    9 : "予備"
} as const

export type DataCorrectlyN2 = keyof typeof DataCorrectly_N2;

export const DataCorrectly_N3 = {
    1 : "未定義",
    2 : "防災科研システム",
    3 : "全点P相",
    4 : "P相／全相混在",
    5 : "全点S相",
    6 : "EPOS",
    7 : "未定義",
    8 : "P 波／S 波レベル越え、または仮定震源要素",
    9 : "予備"
} as const

export type DataCorrectlyN3 = keyof typeof DataCorrectly_N3;

export const DataCorrectly_N4 = {
    1 : "1 点、P 波／S 波レベル越え、または仮定震源要素",
    2 : "2点",
    3 : "3点",
    4 : "4点",
    5 : "5点以上"
}

export type DataCorrectlyN4 = keyof typeof DataCorrectly_N4;

export const DataCorrectly_N5 = {
    1 : "IPF 法（1 点）、または仮定震源要素",
    2 : "IPF 法（2 点）",
    3 : "IPF 法（3 点／4 点）",
    4 : "IPF 法（5 点以上）",
    9 : "震源とマグニチュードに基づく震度予測手法の精度が最終報相当。推定震源・マグニチュードはこれ以降変化しない。（ただしPLUM 法により予測震度が今後変化する可能性はある）"
} as const

export type DataCorrectlyN5 = keyof typeof DataCorrectly_N5;

export const OceanOrLand = {
    1 : "海域",
    0 : "陸域"
} as const

export type OceanOrLand = keyof typeof OceanOrLand;

export const isEEW = {
    1 : "予報",
    0 : "警報"
} as const

export type IsEEW = keyof typeof isEEW;

export type Values<T> = T[keyof T];