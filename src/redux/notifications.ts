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
    navigator.serviceWorker.getRegistration().then((registration) => {
      if (registration) {
        registration.pushManager.getSubscription().then((sub) => {
          if (!sub) {
            return API.get(
              "suteuorest",
              "/notifications/config/webpush",
              {}
            ).then((data) => {
              console.log(data);
              return registration.pushManager
                .subscribe({
                  userVisibleOnly: true,
                  applicationServerKey: data.config.publicKey,
                })
                .then((sub) => {
                  API.put(
                    "suteuorest",
                    "/notifications/subscriptions/" +
                      encodeURIComponent(sub.endpoint),
                    {
                      type: "webpush",
                      data: sub.toJSON(),
                    }
                  );
                });
            });
          }
        });
      }
    });
  }
  if (action.type === "UNREGISTER_SERVICE_WORKER") {
    navigator.serviceWorker.getRegistration().then((registration) => {
      if (registration) {
        registration.pushManager.getSubscription().then((sub) => {
          if (sub) {
            return API.del(
              "suteuorest",
              "/notifications/subscriptions/" +
                encodeURIComponent(sub.endpoint),
              {}
            ).then(() => {
              sub.unsubscribe();
            });
          }
        });
      }
    });
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
