import {
    createContext,
    useCallback,
    useContext,
    useMemo,
    type ReactNode,
} from "react";
import toast from "react-hot-toast";

import { useLocalStorage } from "../hooks/useLocalStorage";
import type { CollectionItem, CollectionName } from "../types";

interface AddItemInput {
    sourceId: string;
    title: string;
    image: string | null;
    category: CollectionItem["category"];
    estimatedValue: number;
}

interface CollectionContextValue {
    items: CollectionItem[];
    addItem: (input: AddItemInput, collection: CollectionName) => boolean;
    removeItem: (id: string) => void;
    moveItem: (id: string, toCollection: CollectionName) => void;
    isInCollection: (
        sourceId: string,
        collection: CollectionName
    ) => boolean;
}

const CollectionContext = createContext<CollectionContextValue | undefined>(
    undefined
);

export function CollectionProvider({
    children,
}: {
    children: ReactNode;
}) {
    const [items, setItems] = useLocalStorage<CollectionItem[]>(
        "collectors-hub:collection",
        []
    );

    const isInCollection = useCallback(
        (sourceId: string, collection: CollectionName) =>
            items.some(
                (item) =>
                    item.sourceId === sourceId &&
                    item.collection === collection
            ),
        [items]
    );

    const addItem = useCallback(
        (input: AddItemInput, collection: CollectionName): boolean => {
            const alreadyExists = items.some(
                (item) =>
                    item.sourceId === input.sourceId &&
                    item.collection === collection
            );

            if (alreadyExists) {
                toast.error(`"${input.title}" is already in ${collection}.`);
                return false;
            }

            const newItem: CollectionItem = {
                id: `${input.sourceId}-${collection}-${Date.now()}`,
                sourceId: input.sourceId,
                title: input.title,
                image: input.image,
                category: input.category,
                dateAdded: new Date().toISOString(),
                estimatedValue: input.estimatedValue,
                collection,
            };

            setItems((prev) => [newItem, ...prev]);
            toast.success(`"${input.title}" added to ${collection}.`);
            return true;
        },
        [items, setItems]
    );

    const removeItem = useCallback(
        (id: string) => {
            const target = items.find((item) => item.id === id);
            setItems((prev) => prev.filter((item) => item.id !== id));
            if (target) {
                toast.success(
                    `"${target.title}" removed from ${target.collection}.`
                );
            }
        },
        [items, setItems]
    );

    const moveItem = useCallback(
        (id: string, toCollection: CollectionName) => {
            const target = items.find((item) => item.id === id);
            if (!target) return;

            if (target.collection === toCollection) {
                toast("Item is already in this collection.");
                return;
            }

            const duplicate = items.some(
                (item) =>
                    item.sourceId === target.sourceId &&
                    item.collection === toCollection
            );

            if (duplicate) {
                toast.error(
                    `"${target.title}" already exists in ${toCollection}.`
                );
                return;
            }

            setItems((prev) =>
                prev.map((item) =>
                    item.id === id
                        ? { ...item, collection: toCollection }
                        : item
                )
            );

            toast.success(`"${target.title}" moved to ${toCollection}.`);
        },
        [items, setItems]
    );

    const value = useMemo(
        () => ({
            items,
            addItem,
            removeItem,
            moveItem,
            isInCollection,
        }),
        [items, addItem, removeItem, moveItem, isInCollection]
    );

    return (
        <CollectionContext.Provider value={value}>
            {children}
        </CollectionContext.Provider>
    );
}

export function useCollection() {
    const context = useContext(CollectionContext);

    if (!context) {
        throw new Error(
            "useCollection must be used within a CollectionProvider"
        );
    }

    return context;
}