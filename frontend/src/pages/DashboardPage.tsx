import { useEffect } from 'react';
import { SearchBar } from '@/components/dashboard/SearchBar';
import { StockGrid } from '@/components/dashboard/StockGrid';
import { RecentSearches } from '@/components/dashboard/RecentSearches';
import { useTrendingStocks } from '@/hooks/useStocks';
import { useRecentSearches } from '@/hooks/useLocalStorage';

export const DashboardPage = () => {
    const { data: trendingStocks, isLoading: isLoadingTrending, error: trendingError } = useTrendingStocks();

    const { recentSearches, addRecentSearch, removeRecentSearch, clearRecentSearches } = useRecentSearches();

    const handleSearch = (symbol: string) => {
        // Add to recent searches when a search is performed
        // In a real app, you might want to get the full company name from the API
        const mockName = `${symbol} Company`; // This would come from your search result
        addRecentSearch(symbol, mockName);
    };

    // Set document title
    useEffect(() => {
        document.title = 'Stock Tracker - Dashboard';
    }, []);

    return (
        <div className='space-y-8'>
            {/* Page Header */}
            <div className='space-y-4'>
                <div>
                    <h1 className='text-4xl font-bold tracking-tight text-foreground'>Stock Market Dashboard</h1>
                    <p className='text-lg text-muted-foreground'>Track and analyze stock performance in real-time</p>
                </div>

                {/* Search Section */}
                <div className='flex flex-col sm:flex-row gap-4 items-start'>
                    <SearchBar
                        placeholder='Search stocks by symbol or company name...'
                        onSearch={handleSearch}
                    />
                </div>
            </div>

            {/* Main Content Grid */}
            <div className='grid gap-8 lg:grid-cols-4'>
                {/* Main Content - Trending Stocks */}
                <div className='lg:col-span-3 space-y-6'>
                    <div>
                        <div className='flex items-center justify-between mb-6'>
                            <h2 className='text-2xl font-semibold text-foreground'>Trending Stocks</h2>
                            <div className='text-sm text-muted-foreground'>Updated in real-time</div>
                        </div>

                        <StockGrid
                            stocks={trendingStocks}
                            isLoading={isLoadingTrending}
                            error={trendingError}
                            showAddToWatchlist={true}
                            emptyMessage='No trending stocks available at the moment'
                        />
                    </div>
                </div>

                {/* Sidebar */}
                <div className='lg:col-span-1 space-y-6'>
                    <RecentSearches
                        searches={recentSearches}
                        onRemove={removeRecentSearch}
                        onClear={clearRecentSearches}
                    />
                </div>
            </div>
        </div>
    );
};
