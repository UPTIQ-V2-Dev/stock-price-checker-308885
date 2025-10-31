import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { stockApi } from '@/services/stockApi';
import { watchlistApi } from '@/services/watchlistApi';
import { marketApi } from '@/services/marketApi';
import type {
    StockSearchRequest,
    StockHistoryRequest,
    AddToWatchlistRequest,
    RemoveFromWatchlistRequest
} from '@/types/stock';

// Query keys
export const STOCK_QUERY_KEYS = {
    stocks: ['stocks'] as const,
    stock: (symbol: string) => ['stocks', symbol] as const,
    stockPrice: (symbol: string) => ['stocks', symbol, 'price'] as const,
    stockDetail: (symbol: string) => ['stocks', symbol, 'detail'] as const,
    stockHistory: (symbol: string, period: string) => ['stocks', symbol, 'history', period] as const,
    stockNews: (symbol: string) => ['stocks', symbol, 'news'] as const,
    search: (query: string) => ['stocks', 'search', query] as const,
    trending: () => ['stocks', 'trending'] as const,
    multiple: (symbols: string[]) => ['stocks', 'multiple', symbols.join(',')] as const,
    watchlist: () => ['watchlist'] as const,
    watchlistSummary: () => ['watchlist', 'summary'] as const,
    market: () => ['market'] as const,
    marketIndices: () => ['market', 'indices'] as const,
    marketMovers: () => ['market', 'movers'] as const,
    marketSectors: () => ['market', 'sectors'] as const
};

// Stock search hook
export const useStockSearch = (params: StockSearchRequest, enabled = true) => {
    return useQuery({
        queryKey: STOCK_QUERY_KEYS.search(params.q),
        queryFn: () => stockApi.searchStocks(params),
        enabled: enabled && params.q.length > 0,
        staleTime: 2 * 60 * 1000 // 2 minutes
    });
};

// Single stock price hook
export const useStockPrice = (symbol: string, enabled = true) => {
    return useQuery({
        queryKey: STOCK_QUERY_KEYS.stockPrice(symbol),
        queryFn: () => stockApi.getStockPrice(symbol),
        enabled: enabled && Boolean(symbol),
        refetchInterval: 30 * 1000, // Refetch every 30 seconds
        staleTime: 10 * 1000 // 10 seconds
    });
};

// Trending stocks hook
export const useTrendingStocks = () => {
    return useQuery({
        queryKey: STOCK_QUERY_KEYS.trending(),
        queryFn: () => stockApi.getTrendingStocks(),
        staleTime: 5 * 60 * 1000 // 5 minutes
    });
};

// Stock detail hook
export const useStockDetail = (symbol: string, enabled = true) => {
    return useQuery({
        queryKey: STOCK_QUERY_KEYS.stockDetail(symbol),
        queryFn: () => stockApi.getStockDetail(symbol),
        enabled: enabled && Boolean(symbol),
        staleTime: 10 * 60 * 1000 // 10 minutes
    });
};

// Stock history hook
export const useStockHistory = (params: StockHistoryRequest, enabled = true) => {
    return useQuery({
        queryKey: STOCK_QUERY_KEYS.stockHistory(params.symbol, params.period),
        queryFn: () => stockApi.getStockHistory(params),
        enabled: enabled && Boolean(params.symbol),
        staleTime: 5 * 60 * 1000 // 5 minutes
    });
};

// Stock news hook
export const useStockNews = (symbol: string, enabled = true) => {
    return useQuery({
        queryKey: STOCK_QUERY_KEYS.stockNews(symbol),
        queryFn: () => stockApi.getStockNews(symbol),
        enabled: enabled && Boolean(symbol),
        staleTime: 10 * 60 * 1000 // 10 minutes
    });
};

// Multiple stocks hook
export const useMultipleStocks = (symbols: string[], enabled = true) => {
    return useQuery({
        queryKey: STOCK_QUERY_KEYS.multiple(symbols),
        queryFn: () => stockApi.getMultipleStocks(symbols),
        enabled: enabled && symbols.length > 0,
        refetchInterval: 30 * 1000, // Refetch every 30 seconds
        staleTime: 10 * 1000 // 10 seconds
    });
};

// Watchlist hooks
export const useWatchlist = () => {
    return useQuery({
        queryKey: STOCK_QUERY_KEYS.watchlist(),
        queryFn: () => watchlistApi.getWatchlist(),
        staleTime: 2 * 60 * 1000 // 2 minutes
    });
};

export const useWatchlistSummary = () => {
    return useQuery({
        queryKey: STOCK_QUERY_KEYS.watchlistSummary(),
        queryFn: () => watchlistApi.getWatchlistSummary(),
        staleTime: 2 * 60 * 1000 // 2 minutes
    });
};

// Add to watchlist mutation
export const useAddToWatchlist = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (params: AddToWatchlistRequest) => watchlistApi.addToWatchlist(params),
        onSuccess: () => {
            // Invalidate watchlist queries
            queryClient.invalidateQueries({ queryKey: STOCK_QUERY_KEYS.watchlist() });
            queryClient.invalidateQueries({ queryKey: STOCK_QUERY_KEYS.watchlistSummary() });
        }
    });
};

// Remove from watchlist mutation
export const useRemoveFromWatchlist = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (params: RemoveFromWatchlistRequest) => watchlistApi.removeFromWatchlist(params),
        onSuccess: () => {
            // Invalidate watchlist queries
            queryClient.invalidateQueries({ queryKey: STOCK_QUERY_KEYS.watchlist() });
            queryClient.invalidateQueries({ queryKey: STOCK_QUERY_KEYS.watchlistSummary() });
        }
    });
};

// Market data hooks
export const useMarketIndices = () => {
    return useQuery({
        queryKey: STOCK_QUERY_KEYS.marketIndices(),
        queryFn: () => marketApi.getMarketIndices(),
        refetchInterval: 60 * 1000, // Refetch every minute
        staleTime: 30 * 1000 // 30 seconds
    });
};

export const useTopMovers = () => {
    return useQuery({
        queryKey: STOCK_QUERY_KEYS.marketMovers(),
        queryFn: () => marketApi.getTopMovers(),
        staleTime: 5 * 60 * 1000 // 5 minutes
    });
};

export const useSectorPerformance = () => {
    return useQuery({
        queryKey: STOCK_QUERY_KEYS.marketSectors(),
        queryFn: () => marketApi.getSectorPerformance(),
        staleTime: 10 * 60 * 1000 // 10 minutes
    });
};
