import { readFileSync } from "fs"

export class LoadJSON<T> {

    private assetName : string;

    constructor( assetName : string ) {
        this.assetName = assetName;
    }

    load() : T {
        const file = readFileSync("assets/" + this.assetName, "utf-8");
        return JSON.parse(file) as T
    }


}