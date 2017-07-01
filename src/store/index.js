import { observable, computed, action, toJS } from "mobx";
import { cellsCount, minutesPerRange, DAYS } from "../constants";

const defaultData = DAYS.reduce((acc, el) => {
  acc[el.key] = [];
  return acc;
}, {});

class CalendarStore {
  static mapFromBackendData(dataForOneDay) {
    return dataForOneDay.reduce((acc, el) => {
      let currT = Number(el.bt);
      while (currT < Number(el.et)) {
        acc[currT] = true;
        currT += minutesPerRange;
      }
      return acc;
    }, {});
  }

  static computeValues = (data, expr) => {
    const res = data.keys().reduce((acc, el) => {
      const v = data.get(el);
      acc[el] = expr(v.keys().filter(el => v.get(el)));
      return acc;
    }, {});
    return res;
  };
  static getDaysRange(day1key, day2key) {
    const index1 = DAYS.findIndex(el => el.key === day1key);
    const index2 = DAYS.findIndex(el => el.key === day2key);
    return DAYS.slice(Math.min(index1, index2), Math.max(index1, index2) + 1);
  }

  constructor(initialState = {}) {
    this.cellData = observable.map({});
    this.valueSelectedAllDay = {};
    this.valueUnselectedAllDay = {};
    for (var l = 0; l < cellsCount; l++) {
      const end = (l + 1) * minutesPerRange;
      this.valueSelectedAllDay[end] = true;
      this.valueUnselectedAllDay[end] = false;
    }
  }

  @action
  addRange({ start, end, startDay, endDay }) {
    const range = CalendarStore.getDaysRange(startDay, endDay);
    range.forEach(day => {
      for (let i = start; i <= end; i = i + minutesPerRange) {
        const key = i;
        this.toggleSelected(day.key, key);
      }
    });
  }

  @action
  toggleAllDay(day) {
    const value = this.valueSelectedAllDay;
    this.cellData.set(day, this.cellData.get(day).merge(value));
  }
  @action
  toggleSelected(day, key) {
    const value = this.cellData.get(day).get(key);
    this.cellData.get(day).set(key, !value);
  }

  @computed
  get cellStatus() {
    return CalendarStore.computeValues(this.cellData, v => ({
      all: v.length === cellsCount,
      touched: v.length > 0
    }));
  }

  save() {
    const res = this.cellData.entries().reduce((acc, [key, val]) => {
      acc[key] = val.entries().filter(el => el[1]).reduce((acc, el) => {
        const key = Number(el[0]);
        const prevElem = acc[acc.length - 1];
        // console.log(prevElem.et, prevElem.et + minutesPerRange);
        if (prevElem && prevElem.et === key - minutesPerRange) {
          prevElem.et = key;
        } else {
          acc.push({
            bt: key - minutesPerRange,
            et: key
          });
        }
        return acc;
      }, []);
      return acc;
    }, {});
    console.log(res);
  }
  clear() {
    this.initData(defaultData);
    console.log("clear");
  }
  @action
  initData(data) {
    Object.keys(data).forEach(el => {
      this.cellData.set(
        el,
        observable.map(CalendarStore.mapFromBackendData(data[el]))
      );
    });
  }
}

export const store = new CalendarStore();
store.initData(defaultData);
console.log(store);
window.store = store;
export default store;
