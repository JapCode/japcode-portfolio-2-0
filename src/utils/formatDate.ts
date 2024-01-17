type ISODate = string;
type FormattedDate = string;

function formatDate(isoDate: ISODate): FormattedDate {
  const options: Intl.DateTimeFormatOptions = {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  };
  const formattedDate: string = new Date(isoDate).toLocaleDateString(
    'en-US',
    options,
  );
  return formattedDate;
}

export default formatDate;
