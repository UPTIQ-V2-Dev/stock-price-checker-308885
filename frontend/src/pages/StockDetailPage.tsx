import { useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

export const StockDetailPage = () => {
    const { symbol } = useParams<{ symbol: string }>();

    useEffect(() => {
        if (symbol) {
            document.title = `Stock Tracker - ${symbol.toUpperCase()}`;
        }
    }, [symbol]);

    if (!symbol) {
        return (
            <Navigate
                to='/'
                replace
            />
        );
    }

    return (
        <div className='space-y-8'>
            <div className='flex items-center gap-4'>
                <Button
                    variant='ghost'
                    size='sm'
                    asChild
                >
                    <Link to='/'>
                        <ArrowLeft className='h-4 w-4 mr-1' />
                        Back to Dashboard
                    </Link>
                </Button>
            </div>

            <div>
                <h1 className='text-4xl font-bold tracking-tight text-foreground'>{symbol.toUpperCase()}</h1>
                <p className='text-lg text-muted-foreground mt-2'>Detailed stock analysis and information</p>
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
                        The detailed stock view for <strong>{symbol.toUpperCase()}</strong> is currently being
                        developed. Soon you'll be able to view:
                    </p>
                    <ul className='space-y-2 text-sm text-muted-foreground ml-6'>
                        <li className='flex items-start gap-2'>
                            <span className='text-primary'>•</span>
                            Real-time stock price and trading information
                        </li>
                        <li className='flex items-start gap-2'>
                            <span className='text-primary'>•</span>
                            Interactive price charts with multiple time ranges
                        </li>
                        <li className='flex items-start gap-2'>
                            <span className='text-primary'>•</span>
                            Key financial metrics and company information
                        </li>
                        <li className='flex items-start gap-2'>
                            <span className='text-primary'>•</span>
                            Related news articles and market analysis
                        </li>
                        <li className='flex items-start gap-2'>
                            <span className='text-primary'>•</span>
                            Historical performance data
                        </li>
                    </ul>

                    <div className='pt-4'>
                        <Button asChild>
                            <Link to='/'>Return to Dashboard</Link>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};
