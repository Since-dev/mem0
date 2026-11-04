import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { getErrorMessage } from "@/lib/error-message";

interface UseApiQueryOptions<T> {
  enabled?: boolean;
  errorToast?: string;
  initialData?: T;
}

interface UseApiQueryResult<T> {
  data: T | undefined;
  isLoading: boolean;
  error: string;
  refetch: () => Promise<void>;
}

export function useApiQuery<T>(
  fetcher: () => Promise<T>,
  options: UseApiQueryOptions<T> = {},
): UseApiQueryResult<T> {
  const { enabled = true, errorToast, initialData } = options;

  const [data, setData] = useState<T | undefined>(initialData);
  const [isLoading, setIsLoading] = useState(enabled);
  const [error, setError] = useState("");

  const fetcherRef = useRef(fetcher);
  useEffect(() => {
    fetcherRef.current = fetcher;
  });

  // Starting a query while enabled turns on resets the state as run() does.
  const [wasEnabled, setWasEnabled] = useState(enabled);
  if (enabled !== wasEnabled) {
    setWasEnabled(enabled);
    if (enabled) {
      setIsLoading(true);
      setError("");
    }
  }

  const load = useCallback(async () => {
    try {
      setData(await fetcherRef.current());
    } catch (err) {
      const message = getErrorMessage(err, errorToast || "Request failed");
      setError(message);
      if (errorToast) {
        toast({
          title: errorToast,
          description: message,
          variant: "destructive",
        });
      }
    } finally {
      setIsLoading(false);
    }
  }, [errorToast]);

  const run = useCallback(async () => {
    setIsLoading(true);
    setError("");
    await load();
  }, [load]);

  useEffect(() => {
    if (enabled) void load();
  }, [enabled, load]);

  return { data, isLoading, error, refetch: run };
}
