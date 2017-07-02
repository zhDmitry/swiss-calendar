import { observable, computed, action, toJS } from "mobx";

class CalendarStore {
  static mapFromBackendData(dataForOneDay, unitsPerRange) {
    return dataForOneDay.reduce((acc, el) => {
      let currT = Number(el.bt);
      while (currT < Number(el.et)) {
        acc[currT] = true;
        currT += unitsPerRange;
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
  static getDaysRange(day1key, day2key, days) {
    const index1 = days.findIndex(el => el.key === day1key);
    const index2 = days.findIndex(el => el.key === day2key);
    return days.slice(Math.min(index1, index2), Math.max(index1, index2) + 1);
  }

  constructor({ initialState = {}, cellsCount, unitsPerRange, days }) {
    this.cellsCount = cellsCount;
    this.unitsPerRange = unitsPerRange;
    this.initialData = initialState;
    this.days = days;
    console.log(this.days);
    this.cellData = observable.map({});
    this.valueSelectedAllDay = {};
    this.valueUnselectedAllDay = {};
    for (var l = 0; l < cellsCount; l++) {
      const end = (l + 1) * unitsPerRange;
      this.valueSelectedAllDay[end] = true;
      this.valueUnselectedAllDay[end] = false;
    }
    this.initData(initialState);
  }

  @action
  addRange({ start, end, startDay, endDay }) {
    const range = CalendarStore.getDaysRange(startDay, endDay, this.days);
    range.forEach(day => {
      for (let i = start; i <= end; i = i + this.unitsPerRange) {
        const key = i;
        this.toggleSelected(day.key, key);
      }
    });
  }

  @action
  toggleAllDay(day) {
    const value = this.cellStatus[day].all
      ? this.valueUnselectedAllDay  
      : this.valueSelectedAllDay
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
      all: v.length === this.cellsCount,
      touched: v.length > 0
    }));
  }
  reduceDay = (acc, el) => {
    const key = Number(el[0]);
    const prevElem = acc[acc.length - 1];
    if (prevElem && prevElem.et === key - this.unitsPerRange) {
      prevElem.et = key;
    } else {
      acc.push({
        bt: key - this.unitsPerRange,
        et: key
      });
    }
    return acc;
  };

  save() {
    const res = this.cellData.entries().reduce((dayResult, [mkey, val]) => {
      dayResult[mkey] = val
        .entries()
        .filter(el => el[1])
        .sort((a, b) => {
          return Number(a[0]) - Number(b[0]);
        })
        .reduce(this.reduceDay, []);
      return dayResult;
    }, {});
    console.log(res);
    return res;
  }
  clear() {
    this.initData(this.initialData);
    console.log("clear");
  }
  @action
  initData(data) {
    Object.keys(data).forEach(el => {
      this.cellData.set(
        el,
        observable.map(
          CalendarStore.mapFromBackendData(data[el], this.unitsPerRange)
        )
      );
    });
  }
}

export default CalendarStore;
