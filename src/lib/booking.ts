export type BookingData = {
  event: string;
  date: string;
  city: string;
  guests: number;
  cuisines: string[];
  name: string;
  phone: string;
};
export type BookingErrors = Partial<Record<keyof BookingData, string>>;
export const eventTypes = [
  "Royal Wedding",
  "Sangeet / Mehendi",
  "Reception",
  "Corporate Gala",
  "Private Feast",
];
export const cities = ["Ajmer", "Pushkar", "Kishangarh"];
export const cuisineTypes = [
  "Royal Rajasthani",
  "Artisanal Sweets",
  "Live Counters",
  "Multi-Cuisine",
];
export const bookingSteps = [
  "Your occasion",
  "Location & guests",
  "Your menu",
  "Contact details",
  "Review & send",
];
export const initialBooking: BookingData = {
  event: "",
  date: "",
  city: "",
  guests: 500,
  cuisines: [],
  name: "",
  phone: "",
};
export function indiaToday(now = new Date()) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
}
export function validateBooking(data: BookingData, today: string): BookingErrors {
  const errors: BookingErrors = {};
  if (!eventTypes.includes(data.event)) errors.event = "Choose the occasion you’re planning.";
  if (
    !/^\d{4}-\d{2}-\d{2}$/.test(data.date) ||
    Number.isNaN(Date.parse(data.date)) ||
    new Date(data.date).toISOString().slice(0, 10) !== data.date ||
    data.date < today
  )
    errors.date = "Choose today or a future event date.";
  if (!cities.includes(data.city)) errors.city = "Choose Ajmer, Pushkar or Kishangarh.";
  if (!Number.isInteger(data.guests) || data.guests < 100 || data.guests > 5000)
    errors.guests = "Enter a guest estimate between 100 and 5,000. Call us for other group sizes.";
  if (!data.cuisines.length || data.cuisines.some((c) => !cuisineTypes.includes(c)))
    errors.cuisines = "Choose at least one menu preference.";
  if (data.name.trim().length < 2) errors.name = "Enter your full name (at least two characters).";
  if (
    !/^\+?[\d\s().-]+$/.test(data.phone.trim()) ||
    !/^(?:91)?[6-9]\d{9}$/.test(data.phone.replace(/\D/g, ""))
  )
    errors.phone = "Enter a 10-digit Indian mobile number, optionally with +91.";
  return errors;
}
const stepFields: (keyof BookingData)[][] = [
  ["event", "date"],
  ["city", "guests"],
  ["cuisines"],
  ["name", "phone"],
  ["event", "date", "city", "guests", "cuisines", "name", "phone"],
];
export function validateBookingStep(data: BookingData, step: number, today: string): BookingErrors {
  const errors = validateBooking(data, today);
  return Object.fromEntries(
    Object.entries(errors).filter(([key]) =>
      stepFields[step - 1]?.includes(key as keyof BookingData),
    ),
  );
}
export function bookingPayload(data: BookingData) {
  return {
    event_type: data.event,
    event_date: data.date,
    city: data.city,
    guests: data.guests,
    cuisines: [...data.cuisines],
    name: data.name.trim(),
    phone: data.phone.trim(),
  };
}
export type BookingPayload = ReturnType<typeof bookingPayload>;
export type SubmissionResult =
  { status: "success" } | { status: "duplicate" } | { status: "error"; message: string };
// Injectable writer lets tests exercise real submission control without a database.
export function createBookingSubmitter(
  write: (payload: BookingPayload) => PromiseLike<{ error: unknown }>,
) {
  let pending = false;
  return async (data: BookingData): Promise<SubmissionResult> => {
    if (pending) return { status: "duplicate" };
    pending = true;
    try {
      const errors = validateBooking(data, indiaToday());
      if (Object.keys(errors).length)
        return {
          status: "error",
          message: "Please review your event and contact details before sending.",
        };
      const result = await write(bookingPayload(data));
      if (result.error) throw result.error;
      return { status: "success" };
    } catch {
      return {
        status: "error",
        message:
          "We couldn’t confirm your enquiry. Your details are still here. Please call +91 94604 26952 before retrying if the connection timed out.",
      };
    } finally {
      pending = false;
    }
  };
}
