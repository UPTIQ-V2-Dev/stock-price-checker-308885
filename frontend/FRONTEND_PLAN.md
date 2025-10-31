# Stock Price Check App - Technical Implementation Plan

## Tech Stack

- **React 19** with TypeScript
- **Vite** for build tooling
- **shadcn/ui** components
- **Tailwind CSS v4** for styling
- **React Router DOM** for navigation
- **TanStack Query** for data fetching
- **Axios** for API calls
- **Recharts** for data visualization
- **Zod** for validation

## Application Architecture

### 1. Dashboard Page (`/`)

**Components:**

- `SearchBar` - Stock symbol input with autocomplete
- `StockCard` - Display individual stock information
- `StockGrid` - Grid layout for multiple stocks
- `RecentSearches` - List of recently searched stocks

**Utils:**

- `formatCurrency()` - Format price values
- `calculatePercentageChange()` - Calculate price change percentage
- `validateStockSymbol()` - Validate stock symbol format

**Types:**

- `Stock` - Stock data interface
- `StockPrice` - Price information interface
- `SearchResult` - Search autocomplete result

**API Endpoints:**

- `GET /api/stocks/search?q={symbol}` - Search stocks
- `GET /api/stocks/{symbol}/price` - Get current stock price
- `GET /api/stocks/trending` - Get trending stocks

### 2. Stock Detail Page (`/stock/:symbol`)

**Components:**

- `StockHeader` - Stock name, symbol, current price
- `PriceChart` - Interactive price chart with time ranges
- `StockMetrics` - Key financial metrics
- `CompanyInfo` - Basic company information
- `NewsSection` - Related news articles

**Utils:**

- `formatTimeRange()` - Format chart time periods
- `processChartData()` - Transform API data for charts
- `formatMarketCap()` - Format large numbers

**Types:**

- `StockDetail` - Detailed stock information
- `ChartData` - Chart data points
- `NewsItem` - News article interface
- `CompanyInfo` - Company details

**API Endpoints:**

- `GET /api/stocks/{symbol}` - Get detailed stock info
- `GET /api/stocks/{symbol}/history?period={range}` - Historical data
- `GET /api/stocks/{symbol}/news` - Related news

### 3. Watchlist Page (`/watchlist`)

**Components:**

- `WatchlistTable` - Table of watched stocks
- `AddToWatchlistButton` - Add stock to watchlist
- `WatchlistSummary` - Portfolio overview
- `SortableTableHeader` - Sortable table columns

**Utils:**

- `calculatePortfolioValue()` - Total watchlist value
- `sortWatchlistData()` - Sort stocks by various criteria
- `exportWatchlist()` - Export watchlist data

**Types:**

- `WatchlistItem` - Watchlist entry
- `WatchlistSummary` - Portfolio metrics
- `SortOption` - Sorting configuration

**API Endpoints:**

- `GET /api/watchlist` - Get user's watchlist
- `POST /api/watchlist` - Add stock to watchlist
- `DELETE /api/watchlist/{symbol}` - Remove from watchlist

### 4. Market Overview Page (`/market`)

**Components:**

- `MarketIndices` - Major market indices (S&P 500, NASDAQ, DOW)
- `MarketHeatmap` - Visual sector performance
- `TopMovers` - Biggest gainers/losers
- `MarketNews` - General market news

**Utils:**

- `calculateIndexChange()` - Index movement calculations
- `groupByPerformance()` - Group stocks by performance
- `formatMarketTime()` - Market hours formatting

**Types:**

- `MarketIndex` - Market index data
- `TopMover` - Top gainer/loser data
- `SectorPerformance` - Sector data

**API Endpoints:**

- `GET /api/market/indices` - Market indices data
- `GET /api/market/sectors` - Sector performance
- `GET /api/market/movers` - Top gainers/losers

## Common/Shared Components

### Layout Components

- `AppLayout` - Main application layout
- `Header` - Navigation header with search
- `Sidebar` - Navigation sidebar (if needed)
- `Footer` - Application footer

### UI Components (shadcn/ui based)

- `LoadingSpinner` - Loading states
- `ErrorBoundary` - Error handling
- `PriceDisplay` - Standardized price formatting
- `ChangeIndicator` - Price change indicator with colors
- `TimeRangeSelector` - Chart time range buttons

### Hooks

- `useStockPrice()` - Real-time stock price updates
- `useWatchlist()` - Watchlist management
- `useLocalStorage()` - Local storage for recent searches
- `useDebounce()` - Debounced search input

### Services

- `stockApi.ts` - Stock data API calls
- `watchlistService.ts` - Watchlist CRUD operations
- `marketDataService.ts` - Market data fetching
- `cacheService.ts` - Data caching logic

### Utils

- `constants.ts` - API URLs, default values
- `dateUtils.ts` - Date formatting utilities
- `numberUtils.ts` - Number/currency formatting
- `colorUtils.ts` - Color coding for price changes

### Types

- `api.ts` - API response types
- `common.ts` - Shared interface definitions
- `chart.ts` - Chart-related types

## Routing Structure

```
/ - Dashboard (search and overview)
/stock/:symbol - Individual stock details
/watchlist - User's watchlist
/market - Market overview
```

## Data Flow

1. **Search** → API call → Display results → Navigate to detail
2. **Real-time updates** → WebSocket/polling → Update UI
3. **Watchlist management** → Local state + API sync
4. **Historical data** → API call → Chart rendering

## Performance Considerations

- Implement data caching with TanStack Query
- Lazy load chart components
- Debounce search inputs
- Virtual scrolling for large lists
- Optimize re-renders with React.memo

## Error Handling

- Global error boundary
- API error states
- Loading states for all data fetching
- Offline state handling
- Rate limiting awareness
