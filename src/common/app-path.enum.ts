const AppPath = {
  ROOT: "/",
  SIGNUP: "/sign-up",
  SIGNIN: "/sign-in",
  TRIP_$ID: "/trip/:tripId",
  BOOKINGS: "/bookings",
  ANY: "*",
} as const;

export { AppPath };
