import { Link } from 'react-router-dom';
import { Clock, X } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface RecentSearch {
    symbol: string;
    name: string;
    timestamp: string;
}

interface RecentSearchesProps {
    searches?: RecentSearch[];
    onRemove?: (symbol: string) => void;
    onClear?: () => void;
}

export const RecentSearches = ({ searches = [], onRemove, onClear }: RecentSearchesProps) => {
    if (!searches.length) {
        return (
            <Card>
                <CardHeader className='pb-3'>
                    <CardTitle className='text-base flex items-center gap-2'>
                        <Clock className='h-4 w-4' />
                        Recent Searches
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className='text-sm text-muted-foreground text-center py-4'>No recent searches</div>
                </CardContent>
            </Card>
        );
    }

    const formatTimeAgo = (timestamp: string) => {
        const now = new Date();
        const searchTime = new Date(timestamp);
        const diffInMinutes = Math.floor((now.getTime() - searchTime.getTime()) / (1000 * 60));

        if (diffInMinutes < 1) return 'Just now';
        if (diffInMinutes < 60) return `${diffInMinutes}m ago`;

        const diffInHours = Math.floor(diffInMinutes / 60);
        if (diffInHours < 24) return `${diffInHours}h ago`;

        const diffInDays = Math.floor(diffInHours / 24);
        return `${diffInDays}d ago`;
    };

    return (
        <Card>
            <CardHeader className='pb-3'>
                <div className='flex items-center justify-between'>
                    <CardTitle className='text-base flex items-center gap-2'>
                        <Clock className='h-4 w-4' />
                        Recent Searches
                    </CardTitle>
                    {searches.length > 0 && onClear && (
                        <Button
                            variant='ghost'
                            size='sm'
                            onClick={onClear}
                            className='text-xs'
                        >
                            Clear all
                        </Button>
                    )}
                </div>
            </CardHeader>
            <CardContent>
                <div className='space-y-2'>
                    {searches.slice(0, 8).map(search => (
                        <div
                            key={`${search.symbol}-${search.timestamp}`}
                            className='flex items-center justify-between gap-3 p-2 rounded-lg border border-transparent hover:border-border hover:bg-muted/30 transition-colors group'
                        >
                            <Link
                                to={`/stock/${search.symbol}`}
                                className='flex-1 min-w-0'
                            >
                                <div className='flex items-center gap-3'>
                                    <Badge
                                        variant='outline'
                                        className='font-mono'
                                    >
                                        {search.symbol}
                                    </Badge>
                                    <div className='min-w-0 flex-1'>
                                        <div className='text-sm font-medium text-foreground truncate'>
                                            {search.name}
                                        </div>
                                        <div className='text-xs text-muted-foreground'>
                                            {formatTimeAgo(search.timestamp)}
                                        </div>
                                    </div>
                                </div>
                            </Link>

                            {onRemove && (
                                <Button
                                    variant='ghost'
                                    size='sm'
                                    onClick={() => onRemove(search.symbol)}
                                    className='opacity-0 group-hover:opacity-100 transition-opacity p-1 h-auto'
                                >
                                    <X className='h-3 w-3' />
                                </Button>
                            )}
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};
