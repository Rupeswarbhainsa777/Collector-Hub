import { useSearchParams } from "react-router-dom";
import { useDebounce } from "../hooks/useDebounce.ts";
import { useMemo } from "react";
import { fetchMarketplaceItems } from "../api/mockapis.ts";
import ProductCard from "../components/Marketplace/ProductCard.tsx";
import {useAsync} from "../hooks/useAsync.ts";
import SearchBar from "../components/common/SearchBar.tsx";
import EmptyState from "../components/common/EmptyState.tsx";


const MarketplacePage = () => {
    const [params, setParams] = useSearchParams();
    const { data: items, status, error, reload } = useAsync(fetchMarketplaceItems, []);

    const query = params.get('q') ?? '';
    const category = params.get('category') ?? 'All';
    const condition = params.get('condition') ?? 'All';
    const sort = params.get('sort') ?? 'newest';

    const debouncedQuery = useDebounce(query, 300);

    const updateParam = (key: string, value: string) => {
        const next = new URLSearchParams(params);
        if (!value || value === 'All') {
            next.delete(key);
        } else {
            next.set(key, value);
        }
        setParams(next, { replace: true });
    };

    const filteredItems = useMemo(() => {
        if (!items) {
            return [];
        }

        let result = items.filter((item) => {
            const matchesQuery = item.title
                .toLowerCase()
                .includes(debouncedQuery.toLowerCase().trim());

            const matchesCategory =
                category === "All" || item.category === category;

            const matchesCondition =
                condition === "All" || item.condition === condition;

            return matchesQuery && matchesCategory && matchesCondition;
        });

        result = [...result].sort((a, b) => {
            if (sort === "price-asc") {
                return a.price - b.price;
            } else if (sort === "price-desc") {
                return b.price - a.price;
            } else if (sort === "oldest") {
                return (
                    new Date(a.createdAt).getTime() -
                    new Date(b.createdAt).getTime()
                );
            } else {
                // newest (default)
                return (
                    new Date(b.createdAt).getTime() -
                    new Date(a.createdAt).getTime()
                );
            }
        });

        return result;
    }, [items, debouncedQuery, category, condition, sort]);

    const hasActiveFilters = query || category !== 'All' || condition !== 'All';

    return (
      <></>
    );
}
export default MarketplacePage;