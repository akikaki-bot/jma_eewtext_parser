
import {
    ParseTelegram
} from "../dist"
//37 03 00 240321090912 C11 240321090803 ND20240321090811 NCN915 JD////////////// JN/// 301 N360 E1400 060 54 5- RK44559 RT01/// RC0//// EBI 331 S5-5- 090822 19 301 S5-5- 090823 19 330 S5-5- 090823 19 341 S0404 ////// 11 350 S0404 ////// 11 300 S0404 ////// 01 311 S0404 090822 19 321 S0404 090821 19 351 S0404 090823 09 310 S0404 090827 09 9999=
// const telegram = new ParseTelegram("37 03 00 240804222049 C11 240804221948 ND20240804221959 NCN907 JD////////////// JN/// 190 N430 E1453 080 45 03 RK44559 RT10/// RC0//// 9999=")


const telegram = new ParseTelegram(`37 03 00 020117093511 C11
020117093010
ND2002017093012 NCN904 JD20020117093012 JN002
486 N343 E1384 010 75 6- RK665// RT01000 RC00000
EBI 442 S6-5- 093022 11 440 S6-04 093022 11 443 S6-04 093030 11 441
S0503 093036 11 9999=`)

console.log(`平文 : ${telegram.OriginalTelegram}`)
console.log(
    [
        telegram.TelegramType,
        "発行：" + telegram.TelegramPublishOffice,
        telegram.TelegramCondition,
        "発表時刻：" + telegram.TelegramTime,
        "全電文のうち何報目：" + telegram.TelegramSendCount,
        "これは最終ページの電文であるか：" + telegram.isTelegramEnd,
        "緊急地震速報ID：" + telegram.EarthquakeEarlyWarningID,
        "最終報であるか：" + telegram.EarthquakeEarlyWarningCondition.isEnded,
        "何報目であるか：" + telegram.EarthquakeEarlyWarningCondition.ReportNumber,
        `震源コード： ${telegram.HypocenterCode} (${telegram.DatumCorrectly.HypocenterCorrectly})`,
        "震源の緯度、経度 : " + `北緯 ${telegram.HypocenterLatitude} 度, 東経${telegram.HypocenterLongitude} 度 (${telegram.DatumCorrectly.EpicenterCorrectly})`,
        "深さ：" + telegram.HypocenterDepth + "km", 
        "データの確からしさ : " + `
            マグニチュードの確からしさ : ${telegram.DatumCorrectly.MagnitudeCorrectly}
            マグニチュード使用点数 : ${telegram.DatumCorrectly.MagunitudeUsePointCount}
            震源の確からしさ（※部内システム） : ${telegram.DatumCorrectly.HypocenterCorrectlyINUseJMA}
        `,
        "地震の発生場所に関する情報 : " + `
            海域・陸域の別 : ${telegram.EarthquakePlaceInfomation.isOceanOrLand}
            緊急地震速報の種別 :${telegram.EarthquakePlaceInfomation.isEEW}
        `,
    ].join('\n')
)

console.log(
    [
        "=== パーズ結果 ===",
        `${telegram.TelegramType}（${telegram.EarthquakePlaceInfomation.isEEW}）`,
        `発表 [${telegram.TelegramPublishOffice}] ${telegram.TelegramTime} (#${telegram.TelegramSendCount} ${telegram.EarthquakeEarlyWarningCondition.isEnded ? "最終報" : "継続報"})`,
        `震源地 ${telegram.HypocenterCode} (${telegram.DatumCorrectly.HypocenterCorrectly})`,
        `マグニチュード ${telegram.Magunitude} (${telegram.DatumCorrectly.MagnitudeCorrectly})`,
        `深さ ${telegram.HypocenterDepth}km (${telegram.DatumCorrectly.HypocenterCorrectly})`,
        `震源の緯度、経度 : [${telegram.EarthquakePlaceInfomation.isOceanOrLand}] 北緯 ${telegram.HypocenterLatitude} 度, 東経${telegram.HypocenterLongitude} 度 (${telegram.DatumCorrectly.EpicenterCorrectly})`,
        "警報地域：",
        telegram.WarningAreas.map( ( area ) => 
            `${telegram.resolveStationCode(area.AreaCode)} 
             到達予想時刻：${area.conditionTime} 
             震度${area.MinInt}${area.isOver ? "以上と推定" : `${area.MaxInt}と推定`}`
        ).join('\n')
    ].join('\n')
)