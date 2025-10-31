import { Link } from 'react-router-dom';
import { TrendingUp } from 'lucide-react';

export const AppHeader = () => {
    return (
        <header className='sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
            <div className='container flex h-14 max-w-screen-2xl items-center justify-between'>
                <Link
                    to='/'
                    className='flex items-center gap-2 font-bold text-xl'
                >
                    <TrendingUp className='h-6 w-6 text-primary' />
                    StockTracker
                </Link>

                <nav className='flex items-center gap-6'>
                    <Link
                        to='/'
                        className='text-sm font-medium text-foreground/60 transition-colors hover:text-foreground'
                    >
                        Dashboard
                    </Link>
                    <Link
                        to='/watchlist'
                        className='text-sm font-medium text-foreground/60 transition-colors hover:text-foreground'
                    >
                        Watchlist
                    </Link>
                    <Link
                        to='/market'
                        className='text-sm font-medium text-foreground/60 transition-colors hover:text-foreground'
                    >
                        Market
                    </Link>
                </nav>
            </div>
        </header>
    );
};
