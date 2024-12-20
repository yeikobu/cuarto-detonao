import { atom } from 'nanostores';

// Definimos el tipo CartItem
export interface CartItem {
    title: string;
    quantity: number;
    photo?: string; // URL de la foto (opcional)
    message?: string; // Mensaje del usuario (opcional)
}

// Creamos la tienda (store) para almacenar los items del carrito
// Cargamos el estado inicial desde Local Storage, si existe
const savedCart = localStorage.getItem('cart');
export const cartItems = atom<CartItem[]>(savedCart ? JSON.parse(savedCart) : []);

// Función para guardar el estado en el Local Storage
function saveCartToLocalStorage(cart: CartItem[]) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Función para agregar o actualizar un ítem en el carrito
export function addCartItem(item: CartItem) {
    const currentCart = cartItems.get();
    const existingItem = currentCart.find(cartItem => cartItem.title === item.title);

    if (existingItem) {
        existingItem.quantity = item.quantity;
        if (item.photo) existingItem.photo = item.photo; // Guardar la foto
        if (item.message) existingItem.message = item.message; // Guardar el mensaje
    } else {
        currentCart.push(item);
    }

    cartItems.set([...currentCart]); // Actualizamos el estado global
    saveCartToLocalStorage(currentCart); // Guardamos el carrito en Local Storage
}

// Función para limpiar el carrito
export function clearCart() {
    cartItems.set([]); // Limpiar el estado global
    localStorage.removeItem('cart'); // Limpiar el Local Storage
}

//actualizar el carrito
export function updateCart(newCart: CartItem[]) {
    cartItems.set(newCart);
    saveCartToLocalStorage(newCart);
}