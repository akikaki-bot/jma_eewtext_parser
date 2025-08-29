import { ParseTelegramCount } from "../functions/getCountNumber";
import { 
    DataCorrectlyN1,
    DataCorrectlyN2,
    DataCorrectlyN3,
    DataCorrectlyN4,
    DataCorrectlyN5,
    DataCorrectly_N1,
    DataCorrectly_N2,
    DataCorrectly_N3,
    DataCorrectly_N4,
    DataCorrectly_N5,
    IsEEW,
    OceanOrLand,
    TelegramCondition, 
    TelegramExportPlace, 
    TelegramTitleCode, 
    Telegram_Condition, 
    Telegram_Export_Places, 
    Telegram_Title_Codes, 
    Values, 
    isEEW
} from "../schemes/codes";
import { Station } from "../types/station";
import { BigIntResolver } from "./bigInt";
import { ValueParser } from "./getValueFromTextHeader";
import { LoadJSON } from "./loadJSON";

const forcastStations = new LoadJSON<Station[]>("stations.json").load();

export class ParseTelegram {

    private telegramText : string;
    private telegramValueParser : ValueParser;

    constructor ( telegramText : string ) {
        this.telegramText = telegramText.replace(/[\r\n]+/g, ' ').replace(/\n/g, ' ').replace(/ +/g, ' ');
        this.telegramValueParser = new ValueParser( telegramText );
    }

    resolveStationCode( code : number ) : string | null {
        const station = forcastStations.find( station => parseInt(station.area.code) === code );
        return station ? station.area.name : null;
    }

    get TelegramType() : string {
        const parsedTelegram = this.telegramText.split(' ')
        return Telegram_Title_Codes[ parseInt( parsedTelegram[0] ) as TelegramTitleCode ] ?? "不明な種別コード";
    }

    get TelegramPublishOffice() : string {
        const parsedTelegram = this.telegramText.split(' ');
        return Telegram_Export_Places[ parseInt( parsedTelegram[1] ) as TelegramExportPlace ] ?? "不明な発信官署";
    }

    get TelegramCondition() : string {
        const parsedTelegram = this.telegramText.split(' ');
        return Telegram_Condition[ parseInt( parsedTelegram[2] ) as TelegramCondition ] ?? "不明な種類";
    }

    get TelegramTime() : Date {
        const parsedTelegram = this.telegramText.split(' ');
        const time_string = parsedTelegram[3];
        const year = parseInt( time_string.slice(0,2) );
        const month = parseInt( time_string.slice(2,4) ) - 1; // なんかずれる
        const day = parseInt( time_string.slice(4,6) );
        const hour = parseInt( time_string.slice(6,8) );
        const minute = parseInt( time_string.slice(8,10) );
        const second = parseInt( time_string.slice(10,12) );
        return new Date( 2000+year, month, day, hour, minute, second );
    }

    get TelegramSendCount() : string {
        const sendLeft = this.telegramValueParser.getValueFromTextHeader("C" , 2 , 1);
        return sendLeft ?? "/"
    }

    get isTelegramEnd() : boolean {
        const f = this.telegramValueParser.getValueFromTextHeader("C" , 2 , 1);
        if( f === null ) return false;
        return parseInt( f ) === 11 
    }

    get EarthquakeEarlyWarningID() : BigIntResolver {
        const ND = this.telegramValueParser.getValueFromTextHeader("ND" , 14 , 2);
        return new BigIntResolver( ND ?? "0" );
    }

    get EarthquakeEarlyWarningCondition() : { isEnded : boolean , ReportNumber : number | "未設定" } {
        const NCN = this.telegramValueParser.getValueFromTextHeader("NCN" , 3 , 3);
        const condition = this.telegramValueParser.getValueFromTextIndex( NCN ?? "" , 1 , 0 );
        const reportNumber = this.telegramValueParser.getValueFromTextIndex( NCN ?? "" , 2 , 1 );

        return {
            isEnded : condition === "9",
            ReportNumber : ( reportNumber !== "//" || reportNumber !== null ) ? ParseTelegramCount( reportNumber ?? "0" ) : "未設定"
        }
    }

    get HypocenterCode() : number {
        const JN = this.telegramValueParser.getValueFromTextHeader("JN" , 3 , 6);
        if( JN === "///") return -1
        return parseInt( JN ?? "0" );
    }

    get HypocenterLatitude() : string {
        const N = this.telegramValueParser.getValueFromTextHeader("N" , 3 , 1 , "JN" , "ND" , "NCN");
        return N?.substring( 0 , 2 ) + "." + N?.substring( 2 , 3 );
    }

    get HypocenterLongitude() : string {
        const E = this.telegramValueParser.getValueFromTextHeader("E" , 4 , 1);
        return E?.substring( 0 , 3 ) + "." + E?.substring( 3 , 4 );
    }

    get HypocenterDepth() : number {
        const depth = this.telegramValueParser.getValueFromTextHeader("E" , 3 , 6);
        return parseInt( depth ?? "0" );
    }

    get Magunitude() : number {
        const magnitude = this.telegramValueParser.getValueFromTextHeader("E" , 2 , 10);
        return parseFloat( magnitude?.split('').join('.') ?? "0" );
    }

    get EarthquakePlaceInfomation() : { 
        isOceanOrLand : Values<typeof OceanOrLand> | "不明、未設定、キャンセル時", 
        isEEW : Values<typeof isEEW> | "不明、未設定、キャンセル時" 
    } {
        const RT = this.telegramValueParser.getValueFromTextHeader("RT" , 5 , 2);
        const [ RTN1 , RTN2 , ...RTNK ] = RT?.split("") ?? [];
        return {
            isOceanOrLand : OceanOrLand[ parseInt( RTN1 ?? "0" ) as OceanOrLand ] ?? "不明、未設定、キャンセル時",
            isEEW : isEEW[ parseInt( RTN2 ?? "0" ) as IsEEW ] ?? "不明、未設定、キャンセル時"
        };
    }

    get DatumCorrectly() : {
        EpicenterCorrectly : Values<typeof DataCorrectly_N1> | "不明、未設定、キャンセル時",
        HypocenterCorrectly : Values<typeof DataCorrectly_N2> | "不明、未設定、キャンセル時",
        MagnitudeCorrectly : Values<typeof DataCorrectly_N3> | "不明、未設定、キャンセル時",
        MagunitudeUsePointCount : Values<typeof DataCorrectly_N4> | "不明、未設定、キャンセル時",
        HypocenterCorrectlyINUseJMA : Values<typeof DataCorrectly_N5> | "不明、未設定、キャンセル時"
    } {
        const RK = this.telegramValueParser.getValueFromTextHeader("RK" , 6 , 2);
        if( RK === null ) return {
            EpicenterCorrectly : "不明、未設定、キャンセル時",
            HypocenterCorrectly : "不明、未設定、キャンセル時",
            MagnitudeCorrectly : "不明、未設定、キャンセル時",
            MagunitudeUsePointCount : "不明、未設定、キャンセル時",
            HypocenterCorrectlyINUseJMA : "不明、未設定、キャンセル時"
        };

        const [ RKN1, RKN2, RKN3, RKN4, RKN5 ] = RK.split('');
        return {
            EpicenterCorrectly : DataCorrectly_N1[ parseInt( RKN1 ) as DataCorrectlyN1 ] ?? "不明、未設定、キャンセル時",
            HypocenterCorrectly : DataCorrectly_N2[ parseInt( RKN2 ) as DataCorrectlyN2 ] ?? "不明、未設定、キャンセル時",
            MagnitudeCorrectly : DataCorrectly_N3[ parseInt( RKN3 ) as DataCorrectlyN3 ] ?? "不明、未設定、キャンセル時",
            MagunitudeUsePointCount : DataCorrectly_N4[ parseInt( RKN4 ) as DataCorrectlyN4 ] ?? "不明、未設定、キャンセル時",
            HypocenterCorrectlyINUseJMA : DataCorrectly_N5[ parseInt( RKN5 ) as DataCorrectlyN5 ] ?? "不明、未設定、キャンセル時"
        }
    }

    get WarningAreas() : { AreaCode : number , conditionTime : string , MinInt : string , MaxInt : string , isOver : boolean }[] {
        const EBI = this.telegramValueParser.getValueFromTextHeaderToValueContent("EBI " , "9999=");
        const chunkedCodes = this.chunkArray( EBI?.split(" ") ?? [] , 4 );

        const parsed = chunkedCodes.map( ( code ) => {
            return {
                AreaCode : parseInt( code[0] ),
                conditionTime : `${code[2].slice(0,2)}時${code[2].slice(2,4)}分${code[2].slice(4,6).length === 0 ? "00" : code[2].slice(4,6)}秒以降`,
                MinInt : code[1].substring( 1 , 2 ),
                MaxInt : code[1].substring( 2 , 3 ),
                isOver : code[1].substring( 2 , 3 ) === "//"
            }
        })
        return parsed;
    }

    get OriginalTelegram() : string {
        return this.telegramText;
    }

    private chunkArray<T = unknown>(array: T[], size: number): T[][] {
        const hoge = (arr: T[], size: number) => arr.flatMap((_, i, a) => i % size ? [] : [a.slice(i, i + size)]);
        return hoge(array, size)
    }

}