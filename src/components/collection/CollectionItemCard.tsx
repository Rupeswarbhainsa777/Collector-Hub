import type {CollectionItem, CollectionName} from "../../types";
import {useCollection} from "../../context/CollectionContext.tsx";
import Images from "../common/Images.tsx";
import {formatDate, formatPrice} from "../../utils/formatters.ts";
import {Badge} from "../common/Badge.tsx";


const ALL_COLLECTIONS: CollectionName[] = ['Owned', 'Wishlist', 'Selling'];

interface CollectionItemCardProps {
    item: CollectionItem;
}

const CollectionItemCard =({ item }: CollectionItemCardProps)=>{
    const { removeItem, moveItem } = useCollection();
    const otherCollections = ALL_COLLECTIONS.filter((c) => c !== item.collection);
    return (
        <div>
            <div>
                <Images src={item.image} alt={item.title}  />
            </div>
            <div>
                <div>
                <Badge>{item.category}</Badge>
                <span >{formatDate(item.dateAdded)}</span>
            </div>
                <h3 >{item.title}</h3>
                <p >Est. value: {formatPrice(item.estimatedValue)}</p>
                <div >
                    <select
                        aria-label={`Move ${item.title}`}
                        value=""
                        onChange={(e) => {
                            if (e.target.value) moveItem(item.id, e.target.value as CollectionName);
                            e.target.value = '';
                        }}
                    >
                        <option value="" disabled>
                            Move to...
                        </option>
                        {otherCollections.map((c) => (
                            <option key={c} value={c}>
                                {c}
                            </option>
                        ))}
                    </select>
                    <button
                        onClick={() => removeItem(item.id)}
                    >
                        Remove
                    </button>
                </div>
            </div>
        </div>
    );
}
export default CollectionItemCard;