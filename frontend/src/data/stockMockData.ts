import type {
    Stock,
    StockDetail,
    SearchResult,
    ChartData,
    NewsItem,
    WatchlistItem,
    MarketIndex,
    TopMover,
    SectorPerformance,
    StockSearchResponse,
    StockHistoryResponse
} from '@/types/stock';

export const mockStocks: Stock[] = [
    {
        id: '1',
        symbol: 'AAPL',
        name: 'Apple Inc.',
        price: 182.52,
        change: 2.45,
        changePercent: 1.36,
        volume: 45678900,
        marketCap: 2847000000000,
        lastUpdated: new Date().toISOString()
    },
    {
        id: '2',
        symbol: 'MSFT',
        name: 'Microsoft Corporation',
        price: 378.85,
        change: -3.21,
        changePercent: -0.84,
        volume: 23456789,
        marketCap: 2810000000000,
        lastUpdated: new Date().toISOString()
    },
    {
        id: '3',
        symbol: 'GOOGL',
        name: 'Alphabet Inc.',
        price: 142.56,
        change: 5.67,
        changePercent: 4.14,
        volume: 34567890,
        marketCap: 1780000000000,
        lastUpdated: new Date().toISOString()
    },
    {
        id: '4',
        symbol: 'AMZN',
        name: 'Amazon.com Inc.',
        price: 156.78,
        change: -1.23,
        changePercent: -0.78,
        volume: 28901234,
        marketCap: 1640000000000,
        lastUpdated: new Date().toISOString()
    },
    {
        id: '5',
        symbol: 'TSLA',
        name: 'Tesla Inc.',
        price: 248.42,
        change: 12.34,
        changePercent: 5.23,
        volume: 67890123,
        marketCap: 790000000000,
        lastUpdated: new Date().toISOString()
    }
];

export const mockTrendingStocks: Stock[] = mockStocks.slice(0, 3);

export const mockSearchResults: SearchResult[] = [
    { symbol: 'AAPL', name: 'Apple Inc.', exchange: 'NASDAQ', type: 'stock' },
    { symbol: 'MSFT', name: 'Microsoft Corporation', exchange: 'NASDAQ', type: 'stock' },
    { symbol: 'GOOGL', name: 'Alphabet Inc.', exchange: 'NASDAQ', type: 'stock' },
    { symbol: 'AMZN', name: 'Amazon.com Inc.', exchange: 'NASDAQ', type: 'stock' },
    { symbol: 'TSLA', name: 'Tesla Inc.', exchange: 'NASDAQ', type: 'stock' }
];

export const mockStockDetail: StockDetail = {
    ...mockStocks[0],
    exchange: 'NASDAQ',
    currency: 'USD',
    sector: 'Technology',
    industry: 'Consumer Electronics',
    description:
        'Apple Inc. designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and accessories worldwide.',
    website: 'https://www.apple.com',
    employees: 164000,
    founded: '1976',
    headquarters: 'Cupertino, California',
    ceo: 'Tim Cook',
    peRatio: 28.5,
    eps: 6.4,
    dividend: 0.96,
    dividendYield: 0.53,
    beta: 1.2,
    fiftyTwoWeekHigh: 199.62,
    fiftyTwoWeekLow: 164.08,
    avgVolume: 52000000
};

export const mockChartData: ChartData[] = Array.from({ length: 30 }, (_, i) => ({
    timestamp: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString(),
    price: 180 + Math.random() * 20 - 10,
    volume: 40000000 + Math.random() * 20000000
}));

export const mockNewsItems: NewsItem[] = [
    {
        id: '1',
        title: 'Apple Reports Strong Q4 Earnings',
        summary: 'Apple Inc. reported better-than-expected quarterly earnings driven by strong iPhone sales.',
        url: 'https://example.com/news/1',
        source: 'Financial News',
        publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        imageUrl: 'https://via.placeholder.com/300x200'
    },
    {
        id: '2',
        title: 'New Product Launch Expected',
        summary: 'Industry analysts expect Apple to announce new products in the coming quarter.',
        url: 'https://example.com/news/2',
        source: 'Tech Tribune',
        publishedAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
        imageUrl: 'https://via.placeholder.com/300x200'
    }
];

export const mockWatchlistItems: WatchlistItem[] = mockStocks.slice(0, 3).map(stock => ({
    id: stock.id,
    symbol: stock.symbol,
    name: stock.name,
    price: stock.price,
    change: stock.change,
    changePercent: stock.changePercent,
    addedAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString()
}));

export const mockMarketIndices: MarketIndex[] = [
    {
        symbol: 'SPX',
        name: 'S&P 500',
        price: 4456.78,
        change: 15.43,
        changePercent: 0.35,
        lastUpdated: new Date().toISOString()
    },
    {
        symbol: 'IXIC',
        name: 'NASDAQ',
        price: 13845.12,
        change: -23.67,
        changePercent: -0.17,
        lastUpdated: new Date().toISOString()
    },
    {
        symbol: 'DJI',
        name: 'Dow Jones',
        price: 34567.89,
        change: 45.23,
        changePercent: 0.13,
        lastUpdated: new Date().toISOString()
    }
];

export const mockTopMovers: TopMover[] = [
    {
        symbol: 'TSLA',
        name: 'Tesla Inc.',
        price: 248.42,
        change: 12.34,
        changePercent: 5.23,
        volume: 67890123,
        type: 'gainer'
    },
    {
        symbol: 'NVDA',
        name: 'NVIDIA Corporation',
        price: 445.67,
        change: 18.92,
        changePercent: 4.44,
        volume: 45123789,
        type: 'gainer'
    },
    {
        symbol: 'META',
        name: 'Meta Platforms Inc.',
        price: 289.34,
        change: -8.45,
        changePercent: -2.84,
        volume: 34567123,
        type: 'loser'
    }
];

export const mockSectorPerformance: SectorPerformance[] = [
    {
        sector: 'Technology',
        changePercent: 1.25,
        marketCap: 12500000000000,
        stocks: [
            { symbol: 'AAPL', name: 'Apple Inc.', changePercent: 1.36 },
            { symbol: 'MSFT', name: 'Microsoft Corporation', changePercent: -0.84 }
        ]
    },
    {
        sector: 'Healthcare',
        changePercent: 0.67,
        marketCap: 5600000000000,
        stocks: [
            { symbol: 'JNJ', name: 'Johnson & Johnson', changePercent: 0.45 },
            { symbol: 'PFE', name: 'Pfizer Inc.', changePercent: 0.89 }
        ]
    }
];

export const mockSearchResponse: StockSearchResponse = {
    results: mockSearchResults
};

export const mockHistoryResponse: StockHistoryResponse = {
    symbol: 'AAPL',
    period: '1M',
    data: mockChartData
};
