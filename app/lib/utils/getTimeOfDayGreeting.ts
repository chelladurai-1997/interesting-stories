// Function to get the time of day greeting with greenery emojis
export function getTimeOfDayGreeting(): string {
  const currentHour: number = new Date().getHours();
  let greeting: string;
  let emoji: string;

  if (currentHour < 12) {
    greeting = "Good morning";
    emoji = "🌿"; // Herb emoji for a fresh morning
  } else if (currentHour < 18) {
    greeting = "Good afternoon";
    emoji = "🍃"; // Leaf fluttering in the wind for an afternoon refresh
  } else {
    greeting = "Good evening";
    emoji = "🌳"; // Deciduous tree emoji for a calm evening
  }

  return `${greeting} ${emoji}`;
}
