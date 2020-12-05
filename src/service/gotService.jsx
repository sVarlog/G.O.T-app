export default class GotService {
    constructor() {
        this._apiBase = 'https://www.anapioficeandfire.com/api';
    }
    async getResourse(url) {
        const res = await fetch(`${this._apiBase}${url}`);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return await res.json();
    }

    getAllCharacters = async (page = 0) => {
        const res = await this.getResourse(`/characters?page=${page}`);
        return res.map(this._transformCharacter);
    }

    getCharacter = async (id) => {
        const res = await this.getResourse(`/characters/${id}`);
        return this._transformCharacter(res)
    }

    getAllHouses = async (page) => {
        const res = await this.getResourse(`/houses/?page=${page}`);
        return res.map(this._transformHouse);
    }

    getHouse = async (id) => {
        const res = await this.getResourse(`/houses/${id}`);
        return this._transformHouse(res);
    }

    getAllBooks = async (page = 0) => {
        const res = await this.getResourse(`/books/?page=${page}`);
        return res.map(this._transformBook);
    }

    getBook = async (id) => {
        const res = await this.getResourse(`/books/${id}`);
        return this._transformBook(res);
    }

    isSet(data) {
        if (data) {
            return data;
        } else {
            return 'no data';
        }
    }

    _extractId = (el) => {
        return el.url.match(/\/([0-9]*)$/)[1];
    }

    _transformCharacter = (char) => {
        return {
            id: this._extractId(char),
            name: this.isSet(char.name),
            gender: this.isSet(char.gender),
            born: this.isSet(char.born),
            died: this.isSet(char.died),
            culture: this.isSet(char.culture)
        }
    }

    _transformHouse = (house) => {
        return {
            id: this._extractId(house),
            name: this.isSet(house.name),
            region: this.isSet(house.region),
            words: this.isSet(house.words),
            titles: this.isSet(house.titles),
            overlord: this.isSet(house.overlord),
            ancestralWeapons: this.isSet(house.ancestralWeapons),
        }
    }

    _transformBook = (book) => {
        return {
            id: this._extractId(book),
            name: this.isSet(book.name),
            numberOfPages: this.isSet(book.numberOfPages),
            publiser: this.isSet(book.publiser),
            released: this.isSet(book.released),
        }
    }
}