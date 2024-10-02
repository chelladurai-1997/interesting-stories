// Function to get the time of day greeting
export function getTimeOfDayGreeting(): string {
  const currentHour: number = new Date().getHours();
  if (currentHour < 12) {
    return "Good morning";
  } else if (currentHour < 18) {
    return "Good afternoon";
  } else {
    return "Good evening";
  }
}
