import { useState, useCallback } from 'react';

/**
 * Custom hook for managing localStorage with TypeScript support
 */
export const useLocalStorage = <T>(key: string, initialValue: T) => {
    // Get from local storage then parse stored json or return initialValue
    const [storedValue, setStoredValue] = useState<T>(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.warn(`Error reading localStorage key "${key}":`, error);
            return initialValue;
        }
    });

    // Return a wrapped version of useState's setter function that persists the new value to localStorage
    const setValue = useCallback(
        (value: T | ((val: T) => T)) => {
            try {
                // Allow value to be a function so we have the same API as useState
                const valueToStore = value instanceof Function ? value(storedValue) : value;
                setStoredValue(valueToStore);
                window.localStorage.setItem(key, JSON.stringify(valueToStore));
            } catch (error) {
                console.warn(`Error setting localStorage key "${key}":`, error);
            }
        },
        [key, storedValue]
    );

    // Remove item from localStorage
    const removeValue = useCallback(() => {
        try {
            window.localStorage.removeItem(key);
            setStoredValue(initialValue);
        } catch (error) {
            console.warn(`Error removing localStorage key "${key}":`, error);
        }
    }, [key, initialValue]);

    return [storedValue, setValue, removeValue] as const;
};

// Hook specifically for managing recent searches
interface RecentSearch {
    symbol: string;
    name: string;
    timestamp: string;
}

export const useRecentSearches = () => {
    const [recentSearches, setRecentSearches, clearRecentSearches] = useLocalStorage<RecentSearch[]>(
        'recent-searches',
        []
    );

    const addRecentSearch = useCallback(
        (symbol: string, name: string) => {
            const newSearch: RecentSearch = {
                symbol: symbol.toUpperCase(),
                name,
                timestamp: new Date().toISOString()
            };

            setRecentSearches(prev => {
                // Remove any existing search for the same symbol
                const filtered = prev.filter(search => search.symbol !== newSearch.symbol);

                // Add new search to the beginning and limit to 10 items
                return [newSearch, ...filtered].slice(0, 10);
            });
        },
        [setRecentSearches]
    );

    const removeRecentSearch = useCallback(
        (symbol: string) => {
            setRecentSearches(prev => prev.filter(search => search.symbol !== symbol.toUpperCase()));
        },
        [setRecentSearches]
    );

    return {
        recentSearches,
        addRecentSearch,
        removeRecentSearch,
        clearRecentSearches
    };
};
