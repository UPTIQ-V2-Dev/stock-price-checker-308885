import { Routes, Route } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { DashboardPage } from '@/pages/DashboardPage';
import { StockDetailPage } from '@/pages/StockDetailPage';
import { WatchlistPage } from '@/pages/WatchlistPage';
import { MarketPage } from '@/pages/MarketPage';

export const App = () => {
    return (
        <Routes>
            <Route
                path='/'
                element={<AppLayout />}
            >
                <Route
                    index
                    element={<DashboardPage />}
                />
                <Route
                    path='stock/:symbol'
                    element={<StockDetailPage />}
                />
                <Route
                    path='watchlist'
                    element={<WatchlistPage />}
                />
                <Route
                    path='market'
                    element={<MarketPage />}
                />
            </Route>
        </Routes>
    );
};
