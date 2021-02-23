import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators, ApplicationState, selectors } from "../redux";

function createPromiseObject<T, E>() {
  let resolve: any = undefined;
  let reject: any = undefined;
  const promise = new Promise<T>((_resolve, _reject) => {
    resolve = _resolve;
    reject = _reject;
  });
  return {
    promise,
    resolve: resolve as (value: T) => void,
    reject: reject as (value: E) => void,
  };
}

function useTask<T = any, E = any>(taskName: string) {
  const [promise, setPromise] = React.useState(undefined as any);
  const dispatch = useDispatch();
  const taskState = useSelector((state: ApplicationState) =>
    selectors.getTaskById(state, taskName)
  );
  React.useEffect(() => {
    dispatch(actionCreators.initTask(taskName));
    return () => {
      dispatch(actionCreators.finTask(taskName));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  React.useEffect(() => {
    if (taskState) {
      if (promise && taskState.state === "COMPLETED") {
        promise.resolve(taskState.result);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [taskState && taskState.state]);
  return {
    invoke: (params?: any): Promise<T> => {
      const _promise = createPromiseObject<T, E>();
      setPromise(_promise);
      dispatch(actionCreators.invokeTask(taskName, params));
      return _promise.promise;
    },
  };
}

export default useTask;
