import { useState } from 'react';

type Mode = 'create' | 'update';

interface UseServerActionOptions<T> {
  action: (data: T) => Promise<void>;
  onSuccess?: () => void;
  onError?: (err: unknown) => void;
}

export function useServerAction<T>({
  action,
  onSuccess,
  onError,
}: UseServerActionOptions<T>) {
  const [loading, setLoading] = useState(false);

  const execute = async (data: T) => {
    setLoading(true);
    try {
      await action(data);
      onSuccess?.();
    } catch (err) {
      console.error(err);
      onError?.(err);
    } finally {
      setLoading(false);
    }
  };

  return { execute, loading };
}
