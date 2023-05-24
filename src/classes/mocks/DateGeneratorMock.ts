import {DateGeneratorInterface} from "../DateGeneratorInterface";

export default class DateGeneratorMock implements DateGeneratorInterface{
    date: Date

    constructor() {
        this.date = new Date();
    }

    getDate():string {
        return this.date.toISOString();
    }
}
