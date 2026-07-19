import {createContext, type ReactNode, useContext, useMemo} from "react";
import {useLocalStorage} from "../hooks/useLocalStorage.ts";


interface FeedInteractionsState {
    liked: Record<string, boolean>;
    saved: Record<string, boolean>;
}

interface FeedInteractionsContextValue {
    isLiked: (postId: string) => boolean;
    isSaved: (postId: string) => boolean;
    toggleLike: (postId: string) => void;
    toggleSave: (postId: string) => void;
}
const FeedInteractionsContext = createContext<FeedInteractionsContextValue | undefined>(undefined);



export function FeedInteractionsProvider({ children }: { children: ReactNode }) {
    const [state, setState] = useLocalStorage<FeedInteractionsState>('collectors-hub:feed-interactions', {
        liked: {},
        saved: {},
    });

    const toggleLike = (postId: string) => {
        setState((prev) => ({ ...prev, liked: { ...prev.liked, [postId]: !prev.liked[postId] } }));
    };

    const toggleSave = (postId: string) => {
        setState((prev) => ({ ...prev, saved: { ...prev.saved, [postId]: !prev.saved[postId] } }));
    };

    const value = useMemo(
        () => ({
            isLiked: (postId: string) => !!state.liked[postId],
            isSaved: (postId: string) => !!state.saved[postId],
            toggleLike,
            toggleSave,
        }),

        [state]
    );

    return (
        <FeedInteractionsContext.Provider value={value}>{children}</FeedInteractionsContext.Provider>
    );
}

export function useFeedInteractions() {
    const ctx = useContext(FeedInteractionsContext);
    if (!ctx) throw new Error('useFeedInteractions must be used within a FeedInteractionsProvider');
    return ctx;
}

