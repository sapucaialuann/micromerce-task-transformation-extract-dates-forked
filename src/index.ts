//since the format is fixed (despite the spaces), I thought that creating a Customer type would not be necessary and also take time.
// The only property we know what to expect is the one we are using, so there also might be no reason to create a test case where the property has
// a chance of being a different string of letters other than 'NULL'.

type Dates = {
  startDate: string;
  endDate: string;
};

const extractDates = (customer: {
  ListOfPeriods?: string;
}): (Dates | string)[] => {
  if (
    !customer.ListOfPeriods ||
    customer.ListOfPeriods.toUpperCase() === "NULL"
  ) {
    return [];
  }

  const periods: string[] = customer.ListOfPeriods.split("|").map(
    (period: string) => period.trim(),
  );
  const datesArray: (Dates | string)[] = [];

  periods.forEach((period: string) => {
    const dates: string[] = period
      .split("-")
      .map((date: string) => date.trim());
    if (dates.length < 2 || dates.some((date) => date.length !== 10)) {
      datesArray.push("string length is invalid");
      return;
    } else {
      datesArray.push({
        startDate: dates[0],
        endDate: dates[1],
      });
    }
  });

  return datesArray;
};

export default extractDates;
