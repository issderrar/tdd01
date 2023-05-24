import {DateGeneratorInterface} from './DateGeneratorInterface';
export class DateGenerator implements DateGeneratorInterface {
    getDate(): string {
        return new Date().toISOString()
    }
}
