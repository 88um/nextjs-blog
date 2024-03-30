"use client"
import { Search, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { Input } from '../ui/input';
import { cn } from '@/lib/utils';

interface SearchBarProps {
}

const SearchBar: React.FC<SearchBarProps> = ({}) => {
    const searchParams = new URLSearchParams(window.location.search);
    const router = useRouter()
    const [searchInput, setSearchInput] = useState(searchParams.get('search') ?? '');
    const [hasSearch, setHasSearch] = useState(searchInput ? true : false)
 
    const onUpdateTag = (term: string) => {
        const searchParams = new URLSearchParams(window.location.search);
        if (term) {
          searchParams.set('search', term);
          setHasSearch(true);
        } else {
          searchParams.delete('search');
          setHasSearch(false);
        }
        const newPathname = `${window.location.pathname}?${searchParams.toString()}`;
        router.push(newPathname);
      };
      
  
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchInput(e.target.value);
    };
  
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      onUpdateTag(searchInput);
      //setSearchInput('');
    };
  
    const handleClearSearch = () => {
        setSearchInput('');
        onUpdateTag('');
      };
    
      return (
        <div className={cn("flex items-center px-5 h-[52px] w-[calc(100% - 26px)] rounded-md all-shadow md:mx-32 relative dark:bg-neutral-800", hasSearch && 'bg-[#e3e3e3]')}>
          <form onSubmit={handleSubmit} className="flex w-full items-center  text-stone-600 space-x-4">
            <Search />
            <input
              type="text"
              placeholder="Search for anything"
              value={searchInput}
              onChange={handleInputChange}
              className={cn("focus:outline-none flex h-10 w-full rounded-md bg-background dark:bg-neutral-800 px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50", hasSearch && 'bg-[#e3e3e3]')}
            />
            {hasSearch && (
              <button
                type="button"
                className="absolute top-0 right-2 mr-2 h-full flex items-center"
                onClick={handleClearSearch}
              >
                <X/>
              </button>
            )}
          </form>
        </div>
      );
    };
    
    export default SearchBar;