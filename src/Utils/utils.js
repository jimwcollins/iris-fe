import { DateTime } from 'luxon';

// Format date and time for articles
export const formatDate = (date) => {
  // Turn ISO date string from db into a Luxon DateTime
  const dt = DateTime.fromISO(date);

  // Now calculate duration between article time and now
  const duration = Object.entries(
    dt
      .diffNow([
        'years',
        'months',
        'weeks',
        'days',
        'hours',
        'minutes',
        'seconds',
      ])
      .toObject()
  );

  // Now loop through and return the largest unit of time for this duration
  for (let i = 0; i < duration.length; i++) {
    const time = Math.round(Math.abs(duration[i][1]));
    let unit = duration[i][0];

    if (time !== 0) {
      if (unit === 'seconds') return 'just now';
      if (time < 2) unit = unit.slice(0, -1);
      return `${time} ${unit} ago`;
    }
  }
};

// Capitalise titles
export const formatTitle = (title) => {
  return title.charAt(0).toUpperCase() + title.slice(1);
};
