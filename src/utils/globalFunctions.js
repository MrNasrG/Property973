export const normalizeDate = (dateValue) => {
    const next = new Date(dateValue);
    next.setHours(0, 0, 0, 0);
    return next;
};

export const getMonthStart = (dateValue) =>
    new Date(dateValue.getFullYear(), dateValue.getMonth(), 1);

export const getTomorrowDate = (baseDate) => {
    const nextDay = new Date(baseDate);
    nextDay.setDate(nextDay.getDate() + 1);
    return nextDay;
};

export const parseDateKey = (dateValue) => {
    if (!dateValue || typeof dateValue !== "string") {
        return null;
    }

    const parsed = new Date(`${dateValue}T00:00:00`);
    return Number.isNaN(parsed.getTime()) ? null : parsed;
};

export const formatDateKey = (dateValue) => {
    const year = dateValue.getFullYear();
    const month = `${dateValue.getMonth() + 1}`.padStart(2, "0");
    const date = `${dateValue.getDate()}`.padStart(2, "0");
    return `${year}-${month}-${date}`;
};

export const formatDateChipLabel = (startDate, endDate) => {
    if (!startDate || !endDate) {
        return "Select dates";
    }

    const monthLabel = new Intl.DateTimeFormat("en-US", { month: "short" });
    const startMonth = monthLabel.format(startDate);
    const endMonth = monthLabel.format(endDate);
    const nights = Math.max(
        1,
        Math.round((endDate.getTime() - startDate.getTime()) / 86400000),
    );
    const nightText = nights === 1 ? "1 night" : `${nights} nights`;

    if (startMonth === endMonth) {
        return `${startDate.getDate()} - ${endDate.getDate()} ${startMonth} · ${nightText}`;
    }

    return `${startDate.getDate()} ${startMonth} - ${endDate.getDate()} ${endMonth} · ${nightText}`;
};
