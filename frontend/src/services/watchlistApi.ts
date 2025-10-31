import { api } from '@/lib/api';
import { mockApiDelay } from '@/lib/utils';
import { mockWatchlistItems } from '@/data/stockMockData';
import type { WatchlistItem, WatchlistSummary, AddToWatchlistRequest, RemoveFromWatchlistRequest } from '@/types/stock';

export const watchlistApi = {
    // Get user's watchlist
    getWatchlist: async (): Promise<WatchlistItem[]> => {
        if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
            console.log('--- MOCK API: getWatchlist ---');
            await mockApiDelay();
            return mockWatchlistItems;
        }

        const response = await api.get('/watchlist');
        return response.data;
    },

    // Add stock to watchlist
    addToWatchlist: async (params: AddToWatchlistRequest): Promise<WatchlistItem> => {
        if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
            console.log('--- MOCK API: addToWatchlist ---', params);
            await mockApiDelay();

            // Return a mock watchlist item
            const newItem: WatchlistItem = {
                id: Date.now().toString(),
                symbol: params.symbol.toUpperCase(),
                name: `${params.symbol} Company`,
                price: 100 + Math.random() * 200,
                change: Math.random() * 10 - 5,
                changePercent: Math.random() * 5 - 2.5,
                addedAt: new Date().toISOString()
            };

            return newItem;
        }

        const response = await api.post('/watchlist', params);
        return response.data;
    },

    // Remove stock from watchlist
    removeFromWatchlist: async (params: RemoveFromWatchlistRequest): Promise<void> => {
        if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
            console.log('--- MOCK API: removeFromWatchlist ---', params);
            await mockApiDelay();
            return;
        }

        await api.delete(`/watchlist/${params.symbol}`);
    },

    // Get watchlist summary
    getWatchlistSummary: async (): Promise<WatchlistSummary> => {
        if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
            console.log('--- MOCK API: getWatchlistSummary ---');
            await mockApiDelay();

            const items = mockWatchlistItems;
            const totalValue = items.reduce((sum, item) => sum + item.price, 0);
            const totalChange = items.reduce((sum, item) => sum + item.change, 0);

            return {
                totalValue,
                totalChange,
                totalChangePercent: totalValue > 0 ? (totalChange / totalValue) * 100 : 0,
                itemCount: items.length
            };
        }

        const response = await api.get('/watchlist/summary');
        return response.data;
    }
};
