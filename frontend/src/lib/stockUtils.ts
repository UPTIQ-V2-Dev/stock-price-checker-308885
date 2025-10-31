/**
 * Format currency values with proper locale formatting
 */
export const formatCurrency = (value: number, currency = 'USD'): string => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(value);
};

/**
 * Format large numbers with K, M, B, T suffixes
 */
export const formatLargeNumber = (value: number): string => {
    const absValue = Math.abs(value);

    if (absValue >= 1e12) {
        return `${(value / 1e12).toFixed(1)}T`;
    }
    if (absValue >= 1e9) {
        return `${(value / 1e9).toFixed(1)}B`;
    }
    if (absValue >= 1e6) {
        return `${(value / 1e6).toFixed(1)}M`;
    }
    if (absValue >= 1e3) {
        return `${(value / 1e3).toFixed(1)}K`;
    }

    return value.toFixed(0);
};

/**
 * Format market cap values
 */
export const formatMarketCap = (value: number): string => {
    return formatLargeNumber(value);
};

/**
 * Calculate percentage change between two values
 */
export const calculatePercentageChange = (current: number, previous: number): number => {
    if (previous === 0) return 0;
    return ((current - previous) / previous) * 100;
};

/**
 * Format percentage with proper sign and decimal places
 */
export const formatPercentage = (value: number, decimalPlaces = 2): string => {
    const sign = value >= 0 ? '+' : '';
    return `${sign}${value.toFixed(decimalPlaces)}%`;
};

/**
 * Format percentage change with color indication
 */
export const formatPercentageChange = (value: number): string => {
    return formatPercentage(value, 2);
};

/**
 * Get color class for price change indicators
 */
export const getPriceChangeColor = (change: number): string => {
    if (change > 0) return 'text-green-600 dark:text-green-400';
    if (change < 0) return 'text-red-600 dark:text-red-400';
    return 'text-muted-foreground';
};

/**
 * Get background color class for price change indicators
 */
export const getPriceChangeBgColor = (change: number): string => {
    if (change > 0) return 'bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800';
    if (change < 0) return 'bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800';
    return 'bg-muted/20 border-border';
};

/**
 * Validate stock symbol format
 */
export const validateStockSymbol = (symbol: string): boolean => {
    if (!symbol || typeof symbol !== 'string') return false;

    // Basic validation: 1-5 characters, letters only, uppercase
    const regex = /^[A-Z]{1,5}$/;
    return regex.test(symbol.toUpperCase());
};

/**
 * Format stock symbol to uppercase
 */
export const formatStockSymbol = (symbol: string): string => {
    return symbol.toUpperCase().trim();
};

/**
 * Format volume with proper locale formatting
 */
export const formatVolume = (volume: number): string => {
    return formatLargeNumber(volume);
};

/**
 * Format time range labels for charts
 */
export const formatTimeRange = (range: string): string => {
    const rangeMap: Record<string, string> = {
        '1D': '1 Day',
        '5D': '5 Days',
        '1M': '1 Month',
        '3M': '3 Months',
        '6M': '6 Months',
        '1Y': '1 Year',
        '5Y': '5 Years'
    };

    return rangeMap[range] || range;
};

/**
 * Calculate portfolio/watchlist total value
 */
export const calculatePortfolioValue = (items: Array<{ price: number; quantity?: number }>): number => {
    return items.reduce((total, item) => {
        const quantity = item.quantity || 1;
        return total + item.price * quantity;
    }, 0);
};

/**
 * Sort watchlist data by various criteria
 */
export const sortWatchlistData = <T extends { symbol: string; price: number; change: number; changePercent: number }>(
    data: T[],
    sortBy: 'symbol' | 'price' | 'change' | 'changePercent',
    order: 'asc' | 'desc' = 'desc'
): T[] => {
    const sorted = [...data].sort((a, b) => {
        const aVal: number | string = a[sortBy];
        const bVal: number | string = b[sortBy];

        if (typeof aVal === 'string') {
            return order === 'asc' ? aVal.localeCompare(bVal as string) : (bVal as string).localeCompare(aVal);
        }

        return order === 'asc' ? aVal - (bVal as number) : (bVal as number) - aVal;
    });

    return sorted;
};

/**
 * Format date for display
 */
export const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });
};

/**
 * Format time for display
 */
export const formatTime = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
    });
};

/**
 * Format date and time for display
 */
export const formatDateTime = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
};

/**
 * Check if market is open (basic US market hours check)
 */
export const isMarketOpen = (): boolean => {
    const now = new Date();
    const day = now.getDay(); // 0 = Sunday, 6 = Saturday
    const hour = now.getHours();

    // Basic check: Monday-Friday, 9:30 AM - 4:00 PM EST
    // This is a simplified check and doesn't account for holidays
    if (day === 0 || day === 6) return false; // Weekend
    if (hour < 9 || (hour === 9 && now.getMinutes() < 30)) return false; // Before 9:30 AM
    if (hour >= 16) return false; // After 4:00 PM

    return true;
};
