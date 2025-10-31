import { StockCard } from './StockCard';
import { Skeleton } from '@/components/ui/skeleton';
import type { Stock } from '@/types/stock';

interface StockGridProps {
    stocks?: Stock[];
    isLoading?: boolean;
    error?: Error | null;
    showAddToWatchlist?: boolean;
    emptyMessage?: string;
}

const StockCardSkeleton = () => (
    <div className='p-4 space-y-3 border rounded-lg'>
        <div className='flex items-start justify-between'>
            <div className='space-y-1'>
                <Skeleton className='h-6 w-16' />
                <Skeleton className='h-4 w-32' />
            </div>
        </div>
        <Skeleton className='h-8 w-24' />
        <div className='flex gap-2'>
            <Skeleton className='h-6 w-16' />
            <Skeleton className='h-6 w-16' />
        </div>
        <Skeleton className='h-3 w-20' />
    </div>
);

export const StockGrid = ({
    stocks,
    isLoading,
    error,
    showAddToWatchlist = false,
    emptyMessage = 'No stocks available'
}: StockGridProps) => {
    if (error) {
        return (
            <div className='text-center py-12'>
                <div className='text-red-600 dark:text-red-400 font-medium mb-2'>Failed to load stocks</div>
                <div className='text-sm text-muted-foreground'>
                    {error.message || 'An error occurred while fetching stock data'}
                </div>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className='grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                {Array.from({ length: 8 }).map((_, index) => (
                    <StockCardSkeleton key={index} />
                ))}
            </div>
        );
    }

    if (!stocks?.length) {
        return (
            <div className='text-center py-12'>
                <div className='text-muted-foreground'>{emptyMessage}</div>
            </div>
        );
    }

    return (
        <div className='grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            {stocks.map(stock => (
                <StockCard
                    key={stock.id}
                    stock={stock}
                    showAddToWatchlist={showAddToWatchlist}
                />
            ))}
        </div>
    );
};
