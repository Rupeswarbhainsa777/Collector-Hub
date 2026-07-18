import type {Category, CollectionName} from "../types";


const TABS: CollectionName[] = ['Owned', 'Wishlist', 'Selling'];

const CATEGORIES: Category[] = [
    'Coins',
    'Stamps',
    'Trading Cards',
    'Comics',
    'Vintage Toys',
    'Watches',
    'Vinyl Records',
    'Sports Memorabilia',
];
const MyCollection = () =>{
    return(
        <h2>My Collection</h2>
    );
}
export default MyCollection;