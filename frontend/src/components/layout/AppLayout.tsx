import { Outlet } from 'react-router-dom';
import { AppHeader } from './AppHeader';

export const AppLayout = () => {
    return (
        <div className='min-h-screen bg-background'>
            <AppHeader />
            <main className='container max-w-screen-2xl py-6'>
                <Outlet />
            </main>
        </div>
    );
};
