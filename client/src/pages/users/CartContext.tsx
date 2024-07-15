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
    removeFromCart: (id: number) => void;
    updateQuantity: (id: number, quantity: number) => void;
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
        console.log('Cart Items:', cartItems); // Thêm dòng này để kiểm tra
    };

    const getTotalItems = () => {
        return cartItems.reduce((total, product) => total + product.quantity, 0);
    };

    const removeFromCart = (id: number) => {
        setCartItems((prevItems) => prevItems.filter(item => item.id !== id));
    };

    const updateQuantity = (id: number, quantity: number) => {
        setCartItems((prevItems) =>
            prevItems.map(item =>
                item.id === id
                    ? { ...item, quantity: quantity }
                    : item
            )
        );
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, getTotalItems, removeFromCart, updateQuantity }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
