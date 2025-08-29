

export class ValueParser {

    private telegram : string;

    constructor( telegram : string ) {
        this.telegram = telegram;
    }

    public getValueFromTextHeaderToValueContent(
        headCode : string ,
        toCode : string
    ) : string | null {
        if( this.telegram.indexOf( headCode ) === -1 ) return null;
        const value = this.telegram.substring( 
            this.telegram.indexOf( headCode ) + headCode.length ,
            this.telegram.indexOf( toCode ) - toCode.length
        );

        if( value.length === 0 ) {
            return null;
        }

        return value.replace(/\n/g, ' ');
    }

    public getValueFromTextHeader( 
        headCode : string , 
        textLength : number , 
        offset ?: number , 
        skipString ?: string, 
        skipString2 ?: string, 
        skipString3 ?: string 
    ) : string | null  {
        const offsetValue = offset ? offset : 0;
        const skip = skipString ? skipString : undefined;

        const skipedTelegram = 
                typeof skip === "undefined" ? 
                    this.telegram : 
                    this.telegram
                        .replace( skipString ?? "" , "" )
                        .replace( skipString2 ?? "" , "" )
                        .replace( skipString3 ?? "" , "" );

        const value = skipedTelegram.substring( 
            skipedTelegram.indexOf( headCode ) + offsetValue ,
            skipedTelegram.indexOf( headCode ) + offsetValue + textLength
        );

        // skip ? console.log( value ) : void 0;

        if( value.length === 0 ) {
            return null;
        }

        return value;
    }

    public getValueFromTextIndex( text : string , length : number , index : number ) : string | null {
        const value = text.substring( index , index + length );

        if( value.length === 0 ) {
            return null;
        }

        return value;
    }
}