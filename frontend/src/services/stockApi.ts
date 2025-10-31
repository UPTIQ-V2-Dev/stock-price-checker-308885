import { api } from '@/lib/api';
import { mockApiDelay } from '@/lib/utils';
import {
    mockStocks,
    mockTrendingStocks,
    mockSearchResponse,
    mockStockDetail,
    mockHistoryResponse,
    mockNewsItems
} from '@/data/stockMockData';
import type {
    Stock,
    StockDetail,
    StockSearchRequest,
    StockSearchResponse,
    StockHistoryRequest,
    StockHistoryResponse,
    NewsItem
} from '@/types/stock';

export const stockApi = {
    // Search stocks by symbol or name
    searchStocks: async (params: StockSearchRequest): Promise<StockSearchResponse> => {
        if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
            console.log('--- MOCK API: searchStocks ---', params);
            await mockApiDelay();

            // Filter mock results based on search query
            const filteredResults = mockSearchResponse.results.filter(
                stock =>
                    stock.symbol.toLowerCase().includes(params.q.toLowerCase()) ||
                    stock.name.toLowerCase().includes(params.q.toLowerCase())
            );

            return {
                results: filteredResults.slice(0, params.limit || 10)
            };
        }

        const response = await api.get('/stocks/search', { params });
        return response.data;
    },

    // Get current stock price
    getStockPrice: async (symbol: string): Promise<Stock> => {
        if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
            console.log('--- MOCK API: getStockPrice ---', symbol);
            await mockApiDelay();

            const stock = mockStocks.find(s => s.symbol === symbol.toUpperCase());
            if (!stock) {
                throw new Error(`Stock ${symbol} not found`);
            }
            return stock;
        }

        const response = await api.get(`/stocks/${symbol}/price`);
        return response.data;
    },

    // Get trending stocks
    getTrendingStocks: async (): Promise<Stock[]> => {
        if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
            console.log('--- MOCK API: getTrendingStocks ---');
            await mockApiDelay();
            return mockTrendingStocks;
        }

        const response = await api.get('/stocks/trending');
        return response.data;
    },

    // Get detailed stock information
    getStockDetail: async (symbol: string): Promise<StockDetail> => {
        if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
            console.log('--- MOCK API: getStockDetail ---', symbol);
            await mockApiDelay();

            // Return mock detail with the requested symbol
            return {
                ...mockStockDetail,
                symbol: symbol.toUpperCase(),
                name: mockStocks.find(s => s.symbol === symbol.toUpperCase())?.name || `${symbol} Company`
            };
        }

        const response = await api.get(`/stocks/${symbol}`);
        return response.data;
    },

    // Get historical stock data
    getStockHistory: async (params: StockHistoryRequest): Promise<StockHistoryResponse> => {
        if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
            console.log('--- MOCK API: getStockHistory ---', params);
            await mockApiDelay();

            return {
                ...mockHistoryResponse,
                symbol: params.symbol.toUpperCase(),
                period: params.period
            };
        }

        const response = await api.get(`/stocks/${params.symbol}/history`, {
            params: { period: params.period }
        });
        return response.data;
    },

    // Get stock news
    getStockNews: async (symbol: string): Promise<NewsItem[]> => {
        if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
            console.log('--- MOCK API: getStockNews ---', symbol);
            await mockApiDelay();
            return mockNewsItems;
        }

        const response = await api.get(`/stocks/${symbol}/news`);
        return response.data;
    },

    // Get multiple stock prices
    getMultipleStocks: async (symbols: string[]): Promise<Stock[]> => {
        if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
            console.log('--- MOCK API: getMultipleStocks ---', symbols);
            await mockApiDelay();

            return mockStocks.filter(stock => symbols.map(s => s.toUpperCase()).includes(stock.symbol));
        }

        const response = await api.post('/stocks/batch', { symbols });
        return response.data;
    }
};
