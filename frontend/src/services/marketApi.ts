import { api } from '@/lib/api';
import { mockApiDelay } from '@/lib/utils';
import { mockMarketIndices, mockTopMovers, mockSectorPerformance } from '@/data/stockMockData';
import type { MarketIndex, TopMover, SectorPerformance } from '@/types/stock';

export const marketApi = {
    // Get market indices data
    getMarketIndices: async (): Promise<MarketIndex[]> => {
        if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
            console.log('--- MOCK API: getMarketIndices ---');
            await mockApiDelay();
            return mockMarketIndices;
        }

        const response = await api.get('/market/indices');
        return response.data;
    },

    // Get top gainers and losers
    getTopMovers: async (): Promise<TopMover[]> => {
        if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
            console.log('--- MOCK API: getTopMovers ---');
            await mockApiDelay();
            return mockTopMovers;
        }

        const response = await api.get('/market/movers');
        return response.data;
    },

    // Get sector performance
    getSectorPerformance: async (): Promise<SectorPerformance[]> => {
        if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
            console.log('--- MOCK API: getSectorPerformance ---');
            await mockApiDelay();
            return mockSectorPerformance;
        }

        const response = await api.get('/market/sectors');
        return response.data;
    }
};
