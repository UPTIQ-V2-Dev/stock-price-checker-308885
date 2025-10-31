import { Link } from 'react-router-dom';
import { TrendingUp, TrendingDown, Plus } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAddToWatchlist } from '@/hooks/useStocks';
import {
    formatCurrency,
    formatPercentageChange,
    formatVolume,
    getPriceChangeColor,
    getPriceChangeBgColor
} from '@/lib/stockUtils';
import type { Stock } from '@/types/stock';

interface StockCardProps {
    stock: Stock;
    showAddToWatchlist?: boolean;
}

export const StockCard = ({ stock, showAddToWatchlist = false }: StockCardProps) => {
    const addToWatchlist = useAddToWatchlist();

    const handleAddToWatchlist = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        addToWatchlist.mutate(
            { symbol: stock.symbol },
            {
                onSuccess: () => {
                    // Could show a toast notification here
                    console.log(`Added ${stock.symbol} to watchlist`);
                },
                onError: error => {
                    console.error('Failed to add to watchlist:', error);
                }
            }
        );
    };

    const changeIcon = stock.change >= 0 ? TrendingUp : TrendingDown;
    const ChangeIcon = changeIcon;

    return (
        <Link to={`/stock/${stock.symbol}`}>
            <Card className='group relative overflow-hidden transition-all duration-200 hover:shadow-md hover:-translate-y-1 cursor-pointer'>
                <CardContent className='p-4'>
                    {/* Header */}
                    <div className='flex items-start justify-between mb-3'>
                        <div>
                            <h3 className='font-semibold text-lg text-foreground group-hover:text-primary transition-colors'>
                                {stock.symbol}
                            </h3>
                            <p className='text-sm text-muted-foreground line-clamp-1'>{stock.name}</p>
                        </div>

                        {showAddToWatchlist && (
                            <Button
                                variant='ghost'
                                size='sm'
                                onClick={handleAddToWatchlist}
                                disabled={addToWatchlist.isPending}
                                className='opacity-0 group-hover:opacity-100 transition-opacity'
                            >
                                <Plus className='h-4 w-4' />
                            </Button>
                        )}
                    </div>

                    {/* Price */}
                    <div className='mb-3'>
                        <div className='text-2xl font-bold text-foreground'>{formatCurrency(stock.price)}</div>
                    </div>

                    {/* Change */}
                    <div className='flex items-center gap-2 mb-3'>
                        <Badge
                            variant='outline'
                            className={`flex items-center gap-1 ${getPriceChangeBgColor(stock.change)}`}
                        >
                            <ChangeIcon className='h-3 w-3' />
                            <span className={getPriceChangeColor(stock.change)}>
                                {formatCurrency(Math.abs(stock.change))}
                            </span>
                        </Badge>

                        <Badge
                            variant='outline'
                            className={getPriceChangeBgColor(stock.changePercent)}
                        >
                            <span className={getPriceChangeColor(stock.changePercent)}>
                                {formatPercentageChange(stock.changePercent)}
                            </span>
                        </Badge>
                    </div>

                    {/* Volume */}
                    <div className='text-xs text-muted-foreground'>Volume: {formatVolume(stock.volume)}</div>
                </CardContent>

                {/* Hover overlay */}
                <div className='absolute inset-0 bg-gradient-to-r from-primary/5 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none' />
            </Card>
        </Link>
    );
};
