

export class BigIntResolver {

    private value : string;

    constructor( value : string | number | bigint ) {
        this.value = value.toString();
    }

    public toBigInt() : bigint {
        return BigInt( this.value );
    }

    public toInt() : number {
        return Number( this.value );
    }

    public toString() : string {
        return this.value;
    }
}