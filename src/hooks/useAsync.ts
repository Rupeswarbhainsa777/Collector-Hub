import { useCallback, useEffect, useState } from 'react';
import type { AsyncStatus } from '../types';

interface UseAsyncResult<T> {
    data: T | undefined;
    status: AsyncStatus;
    error: string | null;
    reload: () => void;
}

export function useAsync<T>(fn: () => Promise<T>, deps: unknown[] = []): UseAsyncResult<T> {
    const [data, setData] = useState<T | undefined>(undefined);
    const [status, setStatus] = useState<AsyncStatus>('idle');
    const [error, setError] = useState<string | null>(null);
    const [reloadToken, setReloadToken] = useState(0);

    const reload = useCallback(() => setReloadToken((t) => t + 1), []);

    useEffect(() => {
        let cancelled = false;
        setStatus('loading');
        setError(null);

        fn()
            .then((result) => {
                if (!cancelled) {
                    setData(result);
                    setStatus('success');
                }
            })
            .catch((err: Error) => {
                if (!cancelled) {
                    setError(err.message || 'Something went wrong.');
                    setStatus('error');
                }
            });

        return () => {
            cancelled = true;
        };

    }, [...deps, reloadToken]);

    return { data, status, error, reload };
}
