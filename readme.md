# 電文パーサー

その名の通り、緊急地震速報の電文をパーズするやつです。

## Usage
```ts
import { ParseTelegram } from "./path/to/dist"

const telegram = new ParseTelegram(`37 03 00 020117093511 C11
020117093010
ND2002017093012 NCN904 JD20020117093012 JN002
486 N343 E1384 010 75 6- RK665// RT01000 RC00000
EBI 442 S6-5- 093022 11 440 S6-04 093022 11 443 S6-04 093030 11 441
S0503 093036 11 9999=`)

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
```

# License
MIT 2025 akikaki-bot