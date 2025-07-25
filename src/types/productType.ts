export type ProductType = {
    id: number;
    title: string;
    slug?: string;
    description: string;
    price: number;
    images: string[];
    category: Category;
    createdAt?: string;
    updatedAt?: string;
}

export type Category = {
    id: number;
    name: string;
    slug: string;
    image: string;
    createdAt: string;
    updatedAt: string;
}

export type CartItems = {
    id: number;
    title: string;
    description: string;
    price: number;
    thumbnail: string;
    category: string;
    quantity: number;
}

export type ProductDetailType = {
    id: number;
    title: string;
    description: string;
    price: number;
    images: string[];
    discountPercentage: number;
    stock: number;
    category: Category;
    reviews: Reviews[];
}

export type Reviews = {
    rating: number;
    comment: string;
    date: number;
    recieverName: string;
    reviewerEmail: string;
}