export default function calculateDayNightDifference(startDateTimeSeconds, endDateTimeSeconds) {
    // Convert seconds to milliseconds
    const startDateTimeMillis = startDateTimeSeconds * 1000;
    const endDateTimeMillis = endDateTimeSeconds * 1000;

    // Calculate the difference in milliseconds
    const timeDifferenceMillis = endDateTimeMillis - startDateTimeMillis;

    // Calculate the number of days
    const days = Math.floor(timeDifferenceMillis / (1000 * 60 * 60 * 24));

    // Calculate the remaining time after removing full days
    const remainingMillis = timeDifferenceMillis % (1000 * 60 * 60 * 24);

    // Calculate the number of nights (assuming night as the time between 6 PM to 6 AM)
    const nights = Math.floor(remainingMillis / (1000 * 60 * 60 * 12));

    return { days, nights };
}