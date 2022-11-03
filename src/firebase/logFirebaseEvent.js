import { getAnalytics, logEvent } from "firebase/analytics";

export const logFirebaseEvent = (event, songName) => {
  const analytics = getAnalytics();
  logEvent(analytics, event.eventName, {
    ...event.params,
    songName: songName ?? "",
  });
};
