import { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BarChart3, TrendingUp } from 'lucide-react';

export const MarketPage = () => {
    useEffect(() => {
        document.title = 'Stock Tracker - Market Overview';
    }, []);

    return (
        <div className='space-y-8'>
            <div>
                <h1 className='text-4xl font-bold tracking-tight text-foreground flex items-center gap-3'>
                    <BarChart3 className='h-8 w-8' />
                    Market Overview
                </h1>
                <p className='text-lg text-muted-foreground mt-2'>
                    Get insights into overall market performance and trends
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
                        The market overview page is currently being developed. Soon you'll be able to view:
                    </p>
                    <ul className='space-y-2 text-sm text-muted-foreground ml-6'>
                        <li className='flex items-start gap-2'>
                            <span className='text-primary'>•</span>
                            Major market indices (S&P 500, NASDAQ, Dow Jones)
                        </li>
                        <li className='flex items-start gap-2'>
                            <span className='text-primary'>•</span>
                            Market heatmap with sector performance
                        </li>
                        <li className='flex items-start gap-2'>
                            <span className='text-primary'>•</span>
                            Top gainers and losers of the day
                        </li>
                        <li className='flex items-start gap-2'>
                            <span className='text-primary'>•</span>
                            Market news and analysis
                        </li>
                        <li className='flex items-start gap-2'>
                            <span className='text-primary'>•</span>
                            Economic indicators and market sentiment
                        </li>
                    </ul>
                </CardContent>
            </Card>
        </div>
    );
};
