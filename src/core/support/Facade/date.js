import { DATE_FORMAT } from "../../../.env"
import moment from 'moment';

export const toDate = (rawDate, format="") => {
    let date = (new Date(rawDate)).toLocaleDateString();
    return date
}


export const toMoment = (string, format = DATE_FORMAT) => {
    return moment(string, format)
}

export const momentDateToString = (date) => {
    let dateString = date.toISOString()
    return dateString
  }