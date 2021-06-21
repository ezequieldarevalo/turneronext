import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import Dropdown from './icons/Dropdown';
import I18n from 'components/common/i18n';
import { capitalizeFirstChar } from '../../lib/commonFunctions';
import useQuoteObtaining from 'hooks/useQuoteObtaining';
moment.locale('es'); // moment para el calendario en español

const DatePickerContainer = styled.div`
  min-height: 338px;
  min-width: 330px;
  background: #ffffff;
  border-radius: 4px;
  border: solid 1px #dadada;
  padding: 16px 7px 12px 9px;
`;

const SelectMonth = styled.div`
  display: flex;
  justify-content: space-between;
  height: 21px;
  width: 100%;
`;

const PrevMonth = styled.button`
  cursor: pointer;
  color: #888888;
  margin-left: 13px;
  font-size: 19px;
  transform: rotate(-180deg);
`;

const NextMonth = styled.button`
  cursor: pointer;
  color: #888888;
  margin-right: 11px;
  font-size: 19px;
`;

const MonthName = styled.div`
  height: 20px;
  font-family: Nunito-SemiBold;
  line-height: 20px;
  width: 131px;
  font-size: 17px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: #000000;
`;

const Week = styled.div`
  height: 49px;
  overflow: hidden;
  :last-of-type {
    height: 43px;
  }
`;

const WeekDays = styled.div`
  margin-bottom: 8px;
  margin-top: 19px;
  height: 18px;
`;

const WeekDay = styled.div`
  width: calc(100% / 7);
  display: inline-block;
  text-align: center;
  font-size: 15px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #888888;
`;

const Day = styled.button`
  cursor: pointer;
  position: relative;
  width: calc(100% / 7);
  height: 43px;
  display: inline-block;
  background-color: #ffffff;
  padding: 0;
  margin-top: 3px;
  margin-bottom: 3px;
  box-sizing: border-box;
  z-index: 1;
  text-align: center;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1;
  letter-spacing: -0.34px;
  text-align: center;
  color: #000000;
  line-height: 43px;
  .selected {
    position: relative;
    height: 35px;
    width: 36px;
    margin: auto;
    line-height: 35px;
    box-sizing: border-box;
    border-radius: 3px;
    background-color: rgb(116,172,223);
    color: #ffffff;
  }
  .disabled {
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    text-align: center;
    color: #a4a4a4;
  }
`;

interface IProps {
  changeDaySelected: (date: string) => void;
}

function isToday(day) {
  return day.isSame(new Date(), 'day');
}

function DatePicker({ changeDaySelected }: IProps): JSX.Element {
  const [{quotes, quoteSelected}] = useQuoteObtaining();


  const momentInit = moment(
    new Date(quoteSelected.fecha || quotes.dias[0])
  );
  const [value, setValue] = useState(momentInit);
  const [calendar, setCalendar] = useState(BuildDatePicker(momentInit));

  function BuildDatePicker(value) {
    const startDay = value.clone().startOf('month').startOf('week');
    const endDay = value.clone().endOf('month').endOf('week');
    const day = startDay.clone().subtract(1, 'day');
    const calendar = [];
    while (day.isBefore(endDay, 'day')) {
      calendar.push(
        Array(7)
          .fill(0)
          .map(() => day.add(1, 'day').clone())
      );
    }
    return calendar;
  }

  function isSelected(day, value) {
    return value.isSame(day, 'day');
  }

  function beforeToday(day) {
    return day.isBefore(new Date(), 'day');
  }

  function isAvailable(day) {
    const calendarDay = day.clone().format('YYYY-MM-DD');
    const isInAvailableDates = quotes.dias.find(
      (element) => element.substring(0, 10) === calendarDay
    );
    return !beforeToday(day) && isInAvailableDates;
  }

  function dayStyles(day, value) {
  
    if (!isAvailable(day)) return 'disabled';
    if (isSelected(day, value)) return 'selected';
    if (isToday(day)) return 'today';
    return '';
  }

  const currentMonthName = value.format('MMMM');

  const currentYear = value.format('YYYY');

  const previousMonth = value.clone().subtract(1, 'month');

  const nextMonth = value.clone().add(1, 'month');

  const onChangeMomentDay = useCallback((momentDay) => {
    setValue(momentDay);
    setCalendar(BuildDatePicker(momentDay));
    const datePicked = quotes.dias.find(
      (element) =>
      element.substring(0, 10) === momentDay.format('YYYY-MM-DD')
    );
    if (datePicked) {
      changeDaySelected(datePicked);
    }
  }, []);

  return (
    <DatePickerContainer>
      <SelectMonth>
        <PrevMonth
          type="button"
          onClick={() => onChangeMomentDay(previousMonth)}
        >
          <Dropdown />
        </PrevMonth>
        <MonthName>
          {capitalizeFirstChar(currentMonthName)}&nbsp;{currentYear}
        </MonthName>
        <NextMonth type="button" onClick={() => onChangeMomentDay(nextMonth)}>
          <Dropdown />
        </NextMonth>
      </SelectMonth>
      <WeekDays>
        <WeekDay>
          <I18n id="order.delivery.reschedule.datepicker.weekday.mon"></I18n>
        </WeekDay>
        <WeekDay>
          <I18n id="order.delivery.reschedule.datepicker.weekday.tue"></I18n>
        </WeekDay>
        <WeekDay>
          <I18n id="order.delivery.reschedule.datepicker.weekday.wed"></I18n>
        </WeekDay>
        <WeekDay>
          <I18n id="order.delivery.reschedule.datepicker.weekday.thu"></I18n>
        </WeekDay>
        <WeekDay>
          <I18n id="order.delivery.reschedule.datepicker.weekday.fri"></I18n>
        </WeekDay>
        <WeekDay>
          <I18n id="order.delivery.reschedule.datepicker.weekday.sat"></I18n>
        </WeekDay>
        <WeekDay>
          <I18n id="order.delivery.reschedule.datepicker.weekday.sun"></I18n>
        </WeekDay>
      </WeekDays>
      <div>
        {calendar.map((week) => (
          <Week key={week[0].format()}>
            {week.map((day) => (
              <Day
                type="button"
                key={day.format()}
                onClick={() => onChangeMomentDay(day)}
                disabled={!isAvailable(day)}
              >
                <div className={dayStyles(day, value)}>
                  {day.format('D').toString()}
                </div>
              </Day>
            ))}
          </Week>
        ))}
      </div>
    </DatePickerContainer>
  );
}

export default DatePicker;
