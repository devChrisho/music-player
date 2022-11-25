import { logFirebaseEvent } from "./logFirebaseEvent";
import EVENTS from "./events";
import { app, db, analytics } from "./firebaseConfig";

export { EVENTS, logFirebaseEvent, db, analytics };
export default app;
