export function calculateTotalHours(timeInStr, timeOutStr) {
  if (!timeInStr || !timeOutStr) return '—';

  try {
    const [timeInDate, timeOutDate] = [timeInStr, timeOutStr].map(timeStr => {
      return new Date(`1970-01-01T${convertTo24Hour(timeStr)}:00`);
    });

    const diffMs = timeOutDate - timeInDate;
    if (diffMs < 0) return '—';

    const totalMinutes = Math.floor(diffMs / 60000);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    return `${hours}h ${minutes}m`;
  } catch (error) {
    return '—';
  }
}

export function convertTo24Hour(timeStr) {
  const [time, modifier] = timeStr.split(' ');
  let [hours, minutes] = time.split(':').map(Number);

  if (modifier === 'PM' && hours !== 12) hours += 12;
  if (modifier === 'AM' && hours === 12) hours = 0;

  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
}
