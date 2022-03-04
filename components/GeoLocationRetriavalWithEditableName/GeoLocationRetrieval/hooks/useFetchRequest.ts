import { useEffect, useState } from "react";

export default function useFetchRequest<TResult = any>(
  input?: RequestInfo,
  init?: RequestInit | undefined
) {
  const [state, setRequestState] = useState<
    "loading" | "ready" | "error" | "init"
  >("init");

  const [result, setResult] = useState<TResult>();

  useEffect(() => {
    let didCancel = false;
    if (!input) return;
    (async () => {
      setRequestState("loading");
      const res = await fetch(input, init);
      if (didCancel) return;
      if (!res.status.toString().startsWith("2")) {
        setRequestState("error");
        return;
      }
      try {
        const data = await res.json();
        setResult(data);
        setRequestState("ready");
      } catch (e) {
        setRequestState("error");
      }
    })();

    return () => {
      didCancel = true;
    };
  }, [input]);

  return {
    state,
    result,
  };
}
