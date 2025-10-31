export interface Stock {
    id: string;
    symbol: string;
    name: string;
    price: number;
    change: number;
    changePercent: number;
    volume: number;
    marketCap: number;
    lastUpdated: string;
}

export interface StockPrice {
    symbol: string;
    price: number;
    change: number;
    changePercent: number;
    lastUpdated: string;
}

export interface SearchResult {
    symbol: string;
    name: string;
    exchange: string;
    type: string;
}

export interface StockDetail extends Stock {
    exchange: string;
    currency: string;
    sector: string;
    industry: string;
    description: string;
    website: string;
    employees: number;
    founded: string;
    headquarters: string;
    ceo: string;
    peRatio: number;
    eps: number;
    dividend: number;
    dividendYield: number;
    beta: number;
    fiftyTwoWeekHigh: number;
    fiftyTwoWeekLow: number;
    avgVolume: number;
}

export interface ChartData {
    timestamp: string;
    price: number;
    volume: number;
}

export interface NewsItem {
    id: string;
    title: string;
    summary: string;
    url: string;
    source: string;
    publishedAt: string;
    imageUrl?: string;
}

export interface CompanyInfo {
    symbol: string;
    name: string;
    description: string;
    sector: string;
    industry: string;
    website: string;
    headquarters: string;
    employees: number;
    founded: string;
    ceo: string;
}

export interface WatchlistItem {
    id: string;
    symbol: string;
    name: string;
    price: number;
    change: number;
    changePercent: number;
    addedAt: string;
}

export interface WatchlistSummary {
    totalValue: number;
    totalChange: number;
    totalChangePercent: number;
    itemCount: number;
}

export interface MarketIndex {
    symbol: string;
    name: string;
    price: number;
    change: number;
    changePercent: number;
    lastUpdated: string;
}

export interface TopMover {
    symbol: string;
    name: string;
    price: number;
    change: number;
    changePercent: number;
    volume: number;
    type: 'gainer' | 'loser';
}

export interface SectorPerformance {
    sector: string;
    changePercent: number;
    marketCap: number;
    stocks: Array<{
        symbol: string;
        name: string;
        changePercent: number;
    }>;
}

// API Request/Response Types
export interface StockSearchRequest {
    q: string;
    limit?: number;
}

export interface StockSearchResponse {
    results: SearchResult[];
}

export interface StockHistoryRequest {
    symbol: string;
    period: '1D' | '5D' | '1M' | '3M' | '6M' | '1Y' | '5Y';
}

export interface StockHistoryResponse {
    symbol: string;
    period: string;
    data: ChartData[];
}

export interface AddToWatchlistRequest {
    symbol: string;
}

export interface RemoveFromWatchlistRequest {
    symbol: string;
}
