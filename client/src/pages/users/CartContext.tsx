import React, { createContext, useState, useContext, ReactNode } from 'react';

interface Product {
    id: number;
    name: string;
    price: number;
    images: string;
    quantity: number;
}

interface CartContextProps {
    cartItems: Product[];
    addToCart: (product: Product) => void;
    getTotalItems: () => number;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [cartItems, setCartItems] = useState<Product[]>([]);

    const addToCart = (product: Product) => {
        setCartItems((prevItems) => {
            const existingProduct = prevItems.find(item => item.id === product.id);
            if (existingProduct) {
                return prevItems.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                return [...prevItems, { ...product, quantity: 1 }];
            }
        });
        console.log('Product added:', product); // Thêm dòng này để kiểm tra
    };

    const getTotalItems = () => {
        return cartItems.reduce((total, product) => total + product.quantity, 0);
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, getTotalItems }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    console.log('Cart context:', context); // Thêm dòng này để kiểm tra
    return context;
};
