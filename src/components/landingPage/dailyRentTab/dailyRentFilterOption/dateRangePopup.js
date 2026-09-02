"use client";

import { useEffect, useMemo, useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { useDispatch, useSelector } from "react-redux";

import {
    setDailyrentEndDate,
    setDailyrentStartDate,
} from "@/redux/landingPageFilter/slice";
import {
    formatDateKey,
    getMonthStart,
    getTomorrowDate,
    normalizeDate,
    parseDateKey,
} from "@/utils/globalFunctions";
import {
    DatePopupActions,
    DatePopupCalendarBlock,
    DatePopupCard,
    DatePopupHeader,
    DatePopupMonthsScroller,
    DatePopupOverlay,
    DatePopupTitle,
    PopupButton,
} from "./style";

const DateRangePopup = ({ isOpen, onClose }) => {
    const dispatch = useDispatch();
    const { dailyrentStartDate, dailyrentEndDate } = useSelector(
        (state) => state.landingPageFilterSlice,
    );

    const today = useMemo(() => normalizeDate(new Date()), []);
    const currentMonthStart = useMemo(() => getMonthStart(today), [today]);
    const tomorrow = useMemo(() => getTomorrowDate(today), [today]);

    const savedStartDate = parseDateKey(dailyrentStartDate) ?? today;
    const savedEndDate = parseDateKey(dailyrentEndDate) ?? tomorrow;

    const [selectedRange, setSelectedRange] = useState({
        from: savedStartDate,
        to: savedEndDate,
    });
    const [calendarMonth, setCalendarMonth] = useState(() => {
        const savedStartMonth = getMonthStart(savedStartDate);
        return savedStartMonth < currentMonthStart
            ? currentMonthStart
            : savedStartMonth;
    });
    const [isMobileView, setIsMobileView] = useState(false);

    useEffect(() => {
        if (!isOpen) {
            return undefined;
        }

        const originalOverflow = document.body.style.overflow;
        const originalTouchAction = document.body.style.touchAction;

        document.body.style.overflow = "hidden";
        document.body.style.touchAction = "none";

        return () => {
            document.body.style.overflow = originalOverflow;
            document.body.style.touchAction = originalTouchAction;
        };
    }, [isOpen]);

    useEffect(() => {
        const updateScreenType = () => {
            setIsMobileView(window.innerWidth <= 900);
        };

        updateScreenType();
        window.addEventListener("resize", updateScreenType);
        return () => window.removeEventListener("resize", updateScreenType);
    }, []);

    if (!isOpen) {
        return null;
    }

    const handleApply = () => {
        if (!selectedRange?.from || !selectedRange?.to) {
            return;
        }

        dispatch(setDailyrentStartDate(formatDateKey(selectedRange.from)));
        dispatch(setDailyrentEndDate(formatDateKey(selectedRange.to)));
        onClose();
    };

    const handleOverlayClick = (event) => {
        if (event.target === event.currentTarget) {
            onClose();
        }
    };

    return (
        <DatePopupOverlay onClick={handleOverlayClick}>
            <DatePopupCard>
                <DatePopupCalendarBlock>
                    <DatePopupHeader>
                        <DatePopupTitle>Select date range</DatePopupTitle>
                    </DatePopupHeader>

                    <DatePopupMonthsScroller>
                        <DayPicker
                            mode="range"
                            numberOfMonths={isMobileView ? 12 : 2}
                            month={calendarMonth}
                            onMonthChange={(nextMonth) => {
                                const nextMonthStart = getMonthStart(nextMonth);
                                setCalendarMonth(
                                    nextMonthStart < currentMonthStart
                                        ? currentMonthStart
                                        : nextMonthStart,
                                );
                            }}
                            selected={selectedRange}
                            onSelect={setSelectedRange}
                            disabled={{ before: today }}
                            defaultMonth={today}
                            startMonth={currentMonthStart}
                        />
                    </DatePopupMonthsScroller>

                    <DatePopupActions>
                        <PopupButton type="button" onClick={onClose}>
                            Cancel
                        </PopupButton>
                        <PopupButton
                            type="button"
                            $primary
                            onClick={handleApply}
                            disabled={!selectedRange?.from || !selectedRange?.to}
                        >
                            Apply
                        </PopupButton>
                    </DatePopupActions>
                </DatePopupCalendarBlock>
            </DatePopupCard>
        </DatePopupOverlay>
    );
};

export default DateRangePopup;
