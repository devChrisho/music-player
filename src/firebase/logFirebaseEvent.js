import { getAnalytics, logEvent } from "firebase/analytics";

/**
 * It takes an event object and a song name, and logs the event to Firebase Analytics
 * @param event - The event object that we created in the previous step.
 * @param songName - The name of the song that was played.
 */
export const logFirebaseEvent = (event, songName) => {
  const analytics = getAnalytics();
  logEvent(analytics, event.eventName, {
    ...event.params,
    songName: songName ?? "",
  });
};
