export class Eventz {
    timeCreated: Date;
    originCity: string;
    originState: string;
    originCountry: string;
    destCity: string;
    destState: string;
    destCountry: string;
    distance: number = 0;
    eventID: number;
    constructor(
        public creatorAccount: number,
        public origin: string,
        public destination: string,
        public timeOfEvent: Date
    ) {
        if (typeof(timeOfEvent) === 'string') {
            this.timeOfEvent = new Date(timeOfEvent);
        }
        this.timeCreated = new Date();
        const originLocs: string[] = origin.split(', ');
        const originCityz: string[] = originLocs[0].split(' ');
        for (const i in originCityz) {
            originCityz[i] = originCityz[i][0].toUpperCase().concat(originCityz[i].slice(1));
        }
        originLocs[0] = originCityz.join(' ');
        this.originCity = originLocs[0];
        this.originState = originLocs[1].toUpperCase();
        const originCountryz: string[] = originLocs[2].split(' ');
        for (const i in originCountryz) {
            originCountryz[i] = originCountryz[i][0].toUpperCase().concat(originCountryz[i].slice(1));
        }
        originLocs[2] = originCountryz.join(' ');
        this.originCountry = originLocs[2];
        const destLocs: string[] = origin.split(', ');
        const destCityz: string[] = destLocs[0].split(' ');
        for (const i in destCityz) {
            destCityz[i] = destCityz[i][0].toUpperCase().concat(destCityz[i].slice(1));
        }
        destLocs[0] = destCityz.join(' ');
        this.destCity = destLocs[0];
        this.destState = destLocs[1].toUpperCase();
        const destCountryz: string[] = destLocs[2].split(' ');
        for (const i in destCountryz) {
            destCountryz[i] = destCountryz[i][0].toUpperCase().concat(destCountryz[i].slice(1));
        }
        destLocs[2] = destCountryz.join(' ');
        this.destCountry = destLocs[2];
        // TODO: Distance
        
        this.eventID = 0;
    }
}

export class eventsList{
    list: Eventz[] = [];
    constructor(){}
    addEvent(newEvent: Eventz) {
        newEvent.eventID = (newEvent.creatorAccount * 10);
        const isSameEventID = (element: Eventz) => (element.eventID) == newEvent.eventID;
        while (this.list.findIndex(isSameEventID) != -1) {
            newEvent.eventID++;
        }
        this.list.push(newEvent);
    }
    deleteEvent(eventID: number) {
        this.list = this.list.filter((ele) => (ele.eventID) != eventID);
    }
    numberCreatedOnOrAfter(timeAfter: Date) {
        return this.list.filter((ele) => (ele.timeCreated) >= timeAfter).length;
    }
    numberCreatedInDateRange(timeAfter: Date, timeBefore: Date) {
        return this.list.filter((ele) => (((ele.timeCreated) >= timeAfter) && ((ele.timeCreated) < timeBefore))).length;
    }
    numberScheduledOnOrAfter(timeAfter: Date) {
        return this.list.filter((ele) => (ele.timeOfEvent) >= timeAfter).length;
    }
    numberScheduledInDateRange(timeAfter: Date, timeBefore: Date) {
        return this.list.filter((ele) => (((ele.timeOfEvent) >= timeAfter) && ((ele.timeOfEvent) < timeBefore))).length;
    }
    numberFromCity(inputz: string) {
        const locs: string[] = inputz.split(', ');
        return this.list.filter((ele) => (((ele.originCity.toLowerCase()) == locs[0].toLowerCase()) && (ele.originState.toLowerCase() == locs[1].toLowerCase())) && (ele.originCountry.toLowerCase() == locs[2].toLowerCase())).length;
    }
    numberToCity(inputz: string) {
        const locs: string[] = inputz.split(', ');
        return this.list.filter((ele) => (((ele.destCity.toLowerCase()) == locs[0].toLowerCase()) && (ele.destState.toLowerCase() == locs[1].toLowerCase())) && (ele.destCountry.toLowerCase() == locs[2].toLowerCase())).length;
    }
    numberOfEvents() {
        return this.list.length;
    }
    numberOfUsers() {
        const users: number[] = [];
        for (let index = 0; index < this.list.length; index++) {
            users[index] = this.list[index].creatorAccount;
        }
        return users.filter((item, index, array) => array.indexOf(item) == index).length;
    }
    averageDistance() {
        let sumz: number = 0;
        this.list.forEach(element => {
            sumz += element.distance
        });
        return sumz / this.numberOfEvents();
    }
}