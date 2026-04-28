import { useCallback, useEffect, useMemo, useRef, useState } from "react";

export const useAdminQuery = (loader, deps = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [version, setVersion] = useState(0);
  const loaderRef = useRef(loader);
  const depsKey = useMemo(() => JSON.stringify(deps), [deps]);

  const refetch = useCallback(() => setVersion((value) => value + 1), []);

  useEffect(() => {
    loaderRef.current = loader;
  }, [loader]);

  useEffect(() => {
    let alive = true;

    (async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await loaderRef.current();
        if (alive) setData(result);
      } catch (err) {
        if (alive) setError(err);
      } finally {
        if (alive) setLoading(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, [depsKey, version]);

  return { data, setData, loading, error, refetch };
};
