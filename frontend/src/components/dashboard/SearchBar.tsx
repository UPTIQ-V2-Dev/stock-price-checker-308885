import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, TrendingUp } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useDebounce } from '@/hooks/useDebounce';
import { useStockSearch } from '@/hooks/useStocks';
import { formatStockSymbol } from '@/lib/stockUtils';

interface SearchBarProps {
    placeholder?: string;
    onSearch?: (symbol: string) => void;
}

export const SearchBar = ({ placeholder = 'Search stocks...', onSearch }: SearchBarProps) => {
    const [query, setQuery] = useState('');
    const [showResults, setShowResults] = useState(false);
    const debouncedQuery = useDebounce(query, 300);
    const navigate = useNavigate();
    const searchRef = useRef<HTMLDivElement>(null);

    const { data: searchResults, isLoading } = useStockSearch(
        { q: debouncedQuery, limit: 8 },
        debouncedQuery.length >= 1
    );

    // Close search results when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setShowResults(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Show results when query changes and has results
    useEffect(() => {
        if (debouncedQuery.length >= 1 && searchResults?.results?.length) {
            setShowResults(true);
        } else {
            setShowResults(false);
        }
    }, [debouncedQuery, searchResults]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setQuery(value);
    };

    const handleResultClick = (symbol: string) => {
        const formattedSymbol = formatStockSymbol(symbol);
        setQuery('');
        setShowResults(false);

        if (onSearch) {
            onSearch(formattedSymbol);
        } else {
            navigate(`/stock/${formattedSymbol}`);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            const formattedSymbol = formatStockSymbol(query.trim());
            setQuery('');
            setShowResults(false);

            if (onSearch) {
                onSearch(formattedSymbol);
            } else {
                navigate(`/stock/${formattedSymbol}`);
            }
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Escape') {
            setShowResults(false);
        }
    };

    return (
        <div
            ref={searchRef}
            className='relative w-full max-w-md'
        >
            <form
                onSubmit={handleSubmit}
                className='relative'
            >
                <Search className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
                <Input
                    type='text'
                    placeholder={placeholder}
                    value={query}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    onFocus={() => debouncedQuery.length >= 1 && searchResults?.results?.length && setShowResults(true)}
                    className='pl-10 pr-20'
                />
                <Button
                    type='submit'
                    size='sm'
                    className='absolute right-1 top-1/2 h-7 -translate-y-1/2 px-3'
                    disabled={!query.trim()}
                >
                    Search
                </Button>
            </form>

            {/* Search Results Dropdown */}
            {showResults && (
                <Card className='absolute top-full mt-1 w-full border shadow-lg z-50 bg-background'>
                    {isLoading ? (
                        <div className='p-4 text-center text-sm text-muted-foreground'>Searching...</div>
                    ) : searchResults?.results?.length ? (
                        <div className='max-h-80 overflow-y-auto'>
                            {searchResults.results.map(result => (
                                <button
                                    key={result.symbol}
                                    onClick={() => handleResultClick(result.symbol)}
                                    className='w-full px-4 py-3 text-left hover:bg-muted/50 focus:bg-muted/50 focus:outline-none border-b border-border last:border-b-0 transition-colors'
                                >
                                    <div className='flex items-center gap-3'>
                                        <div className='flex h-8 w-8 items-center justify-center rounded-full bg-primary/10'>
                                            <TrendingUp className='h-4 w-4 text-primary' />
                                        </div>
                                        <div>
                                            <div className='font-medium text-sm'>{result.symbol}</div>
                                            <div className='text-xs text-muted-foreground line-clamp-1'>
                                                {result.name}
                                            </div>
                                        </div>
                                        <div className='ml-auto text-xs text-muted-foreground'>{result.exchange}</div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    ) : (
                        <div className='p-4 text-center text-sm text-muted-foreground'>
                            No results found for "{debouncedQuery}"
                        </div>
                    )}
                </Card>
            )}
        </div>
    );
};
