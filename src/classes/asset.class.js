export class Asset {
    static #path = './assets/images/';

    static getAssetSrc(name, format = 'png', path = undefined) {
        return (path ?? this.#path) + name + '.' + format;
    }
}