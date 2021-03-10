import { API } from "aws-amplify";
import { Middleware, Reducer } from "redux";
import { ApplicationState } from ".";
import { KnownAction as ApiAction } from "./api";

export interface NotificationsState {}

export const notificationsSelectors = {
  getNotificationsState: (state: ApplicationState) => state.notifications,
};

interface RegisterServiceWorkerAction {
  type: "REGISTER_SERVICE_WORKER";
}

interface UnregisterServiceWorkerAction {
  type: "UNREGISTER_SERVICE_WORKER";
}

type KnownAction =
  | RegisterServiceWorkerAction
  | UnregisterServiceWorkerAction
  | ApiAction;

function urlBase64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export const notificationsActionCreators = {
  registerServiceWorker: (): RegisterServiceWorkerAction => ({
    type: "REGISTER_SERVICE_WORKER",
  }),
  unregisterServiceWorker: (): UnregisterServiceWorkerAction => ({
    type: "UNREGISTER_SERVICE_WORKER",
  }),
};

export const notificationsMiddleware: Middleware = ({ dispatch, getState }) => (
  next
) => (incomingAction) => {
  next(incomingAction);
  const action = incomingAction as KnownAction;
  if (action.type === "REGISTER_SERVICE_WORKER") {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/custom-service-worker.js")
        .then((registration) => {
          API.get("suteuorest", "/notifications/config/webpush", {}).then(
            (data) => {
              registration.pushManager
                .subscribe({
                  userVisibleOnly: true,
                  applicationServerKey: urlBase64ToUint8Array(
                    data.config.publicKey
                  ),
                })
                .then((subscription) => {
                  API.put(
                    "suteuorest",
                    "/notifications/subscriptions/" +
                      encodeURIComponent(subscription.endpoint),
                    {
                      body: {
                        type: "webpush",
                        data: subscription.toJSON(),
                      },
                    }
                  );
                });
            }
          );
        });
    }
  }
  if (action.type === "UNREGISTER_SERVICE_WORKER") {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        for (const registration of registrations) {
          registration.pushManager.getSubscription().then((subscription) => {
            if (subscription) {
              subscription.unsubscribe();
              API.del(
                "suteuorest",
                "/notifications/subscriptions/" +
                  encodeURIComponent(subscription.endpoint),
                {}
              );
            }
          });
          registration.unregister();
        }
      });
    }
  }
};

const initialValue = {};

export const notificationsReducer: Reducer<NotificationsState> = (
  state,
  incomingAction
) => {
  if (!state) {
    state = initialValue;
  }

  const action = incomingAction as KnownAction;
  switch (action.type) {
  }

  return state;
};
