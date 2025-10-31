import { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Bookmark, TrendingUp } from 'lucide-react';

export const WatchlistPage = () => {
    useEffect(() => {
        document.title = 'Stock Tracker - Watchlist';
    }, []);

    return (
        <div className='space-y-8'>
            <div>
                <h1 className='text-4xl font-bold tracking-tight text-foreground flex items-center gap-3'>
                    <Bookmark className='h-8 w-8' />
                    My Watchlist
                </h1>
                <p className='text-lg text-muted-foreground mt-2'>
                    Track your favorite stocks and monitor their performance
                </p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className='flex items-center gap-2'>
                        <TrendingUp className='h-5 w-5' />
                        Coming Soon
                        <Badge
                            variant='secondary'
                            className='ml-2'
                        >
                            In Development
                        </Badge>
                    </CardTitle>
                </CardHeader>
                <CardContent className='space-y-4'>
                    <p className='text-muted-foreground'>
                        The watchlist feature is currently being developed. Soon you'll be able to:
                    </p>
                    <ul className='space-y-2 text-sm text-muted-foreground ml-6'>
                        <li className='flex items-start gap-2'>
                            <span className='text-primary'>•</span>
                            Add stocks to your personal watchlist
                        </li>
                        <li className='flex items-start gap-2'>
                            <span className='text-primary'>•</span>
                            Monitor real-time price changes
                        </li>
                        <li className='flex items-start gap-2'>
                            <span className='text-primary'>•</span>
                            Get portfolio performance summaries
                        </li>
                        <li className='flex items-start gap-2'>
                            <span className='text-primary'>•</span>
                            Set up price alerts and notifications
                        </li>
                        <li className='flex items-start gap-2'>
                            <span className='text-primary'>•</span>
                            Export watchlist data
                        </li>
                    </ul>
                </CardContent>
            </Card>
        </div>
    );
};
