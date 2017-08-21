import { Injectable } from '@angular/core';

@Injectable()
export class CommonUtilityService {

  constructor() { }

  formatAMPM(date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? ' PM' : ' AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    const strTime = hours + ':' + minutes + ':' + date.getSeconds() + ampm;
    return strTime;
  }

}

