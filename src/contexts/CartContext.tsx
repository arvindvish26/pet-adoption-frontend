import React, { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';
import { CartItem, Accessory } from '@/lib/mockData';
import { addCartItemApi, clearCartApi, getMyCartApi, removeCartItemApi, updateCartItemApi } from '@/lib/api';
import { useAuth } from './AuthContext';
import { useToast } from '@/hooks/use-toast';

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  total: number;
  cartId?: number | string | null;
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: Accessory }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'TOGGLE_CART' }
  | { type: 'OPEN_CART' }
  | { type: 'CLOSE_CART' }
  | { type: 'SET_FROM_BACKEND'; payload: { cartId: number | string; items: CartItem[] } };

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      
      if (existingItem) {
        const updatedItems = state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        return {
          ...state,
          items: updatedItems,
          total: calculateTotal(updatedItems),
        };
      }
      
      const newItems = [...state.items, { ...action.payload, quantity: 1 }];
      return {
        ...state,
        items: newItems,
        total: calculateTotal(newItems),
      };
    }
    
    case 'REMOVE_ITEM': {
      const filteredItems = state.items.filter(item => item.id !== action.payload);
      return {
        ...state,
        items: filteredItems,
        total: calculateTotal(filteredItems),
      };
    }
    
    case 'UPDATE_QUANTITY': {
      const updatedItems = state.items.map(item =>
        item.id === action.payload.id
          ? { ...item, quantity: Math.max(0, action.payload.quantity) }
          : item
      ).filter(item => item.quantity > 0);
      
      return {
        ...state,
        items: updatedItems,
        total: calculateTotal(updatedItems),
      };
    }
    
    case 'CLEAR_CART':
      return {
        ...state,
        items: [],
        total: 0,
      };
    
    case 'TOGGLE_CART':
      return {
        ...state,
        isOpen: !state.isOpen,
      };
    
    case 'OPEN_CART':
      return {
        ...state,
        isOpen: true,
      };
    
    case 'CLOSE_CART':
      return {
        ...state,
        isOpen: false,
      };
    
    case 'SET_FROM_BACKEND': {
      const total = calculateTotal(action.payload.items);
      return {
        ...state,
        items: action.payload.items,
        total,
        cartId: action.payload.cartId,
      };
    }
    
    default:
      return state;
  }
};

const calculateTotal = (items: CartItem[]): number => {
  return items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
};

interface CartContextType {
  state: CartState;
  addItem: (accessory: Accessory, onLoginRequired?: () => void) => Promise<void>;
  removeItem: (id: string) => Promise<void>;
  updateQuantity: (id: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    isOpen: false,
    total: 0,
    cartId: null,
  });
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();

  const mapBackendCartToState = (backendCart: any): { cartId: number | string; items: CartItem[] } => {
    const items: CartItem[] = (backendCart.cart_accessories || []).map((ci: any) => ({
      id: String(ci.accessory),
      name: ci.accessory_detail?.name || 'Accessory',
      category: 'Toys',
      price: Number(ci.accessory_detail?.price || 0),
      currency: ci.accessory_detail?.currency || 'INR',
      image: ci.accessory_detail?.image || '',
      description: ci.accessory_detail?.description || '',
      rating: 4.5,
      inStock: true,
      quantity: Number(ci.quantity || 1),
    }));
    return { cartId: backendCart.id, items };
  };

  // Initialize from backend cart if authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      // Clear cart if user is not authenticated
      dispatch({ type: 'CLEAR_CART' });
      return;
    }

    (async () => {
      try {
        const cart = await getMyCartApi();
        const mapped = mapBackendCartToState(cart);
        dispatch({ type: 'SET_FROM_BACKEND', payload: mapped });
      } catch (error) {
        console.error('Failed to load cart:', error);
        toast({
          title: "Error",
          description: "Failed to load your cart. Please try again.",
          variant: "destructive",
        });
      }
    })();
  }, [isAuthenticated, toast]);

  // Listen for logout events to clear cart
  useEffect(() => {
    const handleLogout = () => {
      dispatch({ type: 'CLEAR_CART' });
    };

    window.addEventListener('userLoggedOut', handleLogout);
    return () => window.removeEventListener('userLoggedOut', handleLogout);
  }, []);

  const addItem = async (accessory: Accessory, onLoginRequired?: () => void) => {
    // Check if user is authenticated
    if (!isAuthenticated) {
      toast({
        title: "Login Required",
        description: "Please login to add items to your cart.",
        variant: "destructive",
      });
      if (onLoginRequired) {
        onLoginRequired();
      }
      return;
    }

    try {
      // Ensure cart exists
      let cartId = state.cartId;
      if (!cartId) {
        const cart = await getMyCartApi();
        const mapped = mapBackendCartToState(cart);
        cartId = mapped.cartId;
        dispatch({ type: 'SET_FROM_BACKEND', payload: mapped });
      }
      const resp = await addCartItemApi(cartId!, { accessory_id: accessory.id, quantity: 1 });
      const mapped = mapBackendCartToState(resp.cart);
      dispatch({ type: 'SET_FROM_BACKEND', payload: mapped });
      
      toast({
        title: "Added to Cart!",
        description: `${accessory.name} has been added to your cart.`,
      });
    } catch (error) {
      console.error('Failed to add item to cart:', error);
      toast({
        title: "Error",
        description: "Failed to add item to cart. Please try again.",
        variant: "destructive",
      });
    }
  };

  const removeItem = async (id: string) => {
    if (!isAuthenticated) {
      toast({
        title: "Login Required",
        description: "Please login to manage your cart.",
        variant: "destructive",
      });
      return;
    }

    try {
      if (state.cartId) {
        // Need to find item_id from backend; not tracked in UI, so refetch cart
        const cart = await getMyCartApi();
        const item = (cart.cart_accessories || []).find((ci: any) => String(ci.accessory) === String(id));
        if (item) {
          const resp = await removeCartItemApi(state.cartId, { item_id: item.id });
          const mapped = mapBackendCartToState(resp.cart);
          dispatch({ type: 'SET_FROM_BACKEND', payload: mapped });
          
          toast({
            title: "Item Removed",
            description: "Item has been removed from your cart.",
          });
          return;
        }
      }
    } catch (error) {
      console.error('Failed to remove item from cart:', error);
      toast({
        title: "Error",
        description: "Failed to remove item from cart. Please try again.",
        variant: "destructive",
      });
    }
  };

  const updateQuantity = async (id: string, quantity: number) => {
    if (!isAuthenticated) {
      toast({
        title: "Login Required",
        description: "Please login to manage your cart.",
        variant: "destructive",
      });
      return;
    }

    try {
      if (state.cartId) {
        const cart = await getMyCartApi();
        const item = (cart.cart_accessories || []).find((ci: any) => String(ci.accessory) === String(id));
        if (item) {
          const resp = await updateCartItemApi(state.cartId, { item_id: item.id, quantity });
          const mapped = mapBackendCartToState(resp.cart);
          dispatch({ type: 'SET_FROM_BACKEND', payload: mapped });
          return;
        }
      }
    } catch (error) {
      console.error('Failed to update cart item quantity:', error);
      toast({
        title: "Error",
        description: "Failed to update item quantity. Please try again.",
        variant: "destructive",
      });
    }
  };

  const clearCart = async () => {
    if (!isAuthenticated) {
      toast({
        title: "Login Required",
        description: "Please login to manage your cart.",
        variant: "destructive",
      });
      return;
    }

    try {
      if (state.cartId) {
        await clearCartApi(state.cartId);
      }
      dispatch({ type: 'CLEAR_CART' });
      
      toast({
        title: "Cart Cleared",
        description: "All items have been removed from your cart.",
      });
    } catch (error) {
      console.error('Failed to clear cart:', error);
      toast({
        title: "Error",
        description: "Failed to clear cart. Please try again.",
        variant: "destructive",
      });
    }
  };

  const toggleCart = () => {
    dispatch({ type: 'TOGGLE_CART' });
  };

  const openCart = () => {
    dispatch({ type: 'OPEN_CART' });
  };

  const closeCart = () => {
    dispatch({ type: 'CLOSE_CART' });
  };

  const itemCount = state.items.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        state,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        toggleCart,
        openCart,
        closeCart,
        itemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};