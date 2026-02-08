const STOCK_KEY = 'productStock';

// ✅ helper guard
const isValidProductId = (productId) =>
  productId !== undefined && productId !== null;

// --------------------
// STORE
// --------------------
export const getStockStore = () => {
  return JSON.parse(localStorage.getItem(STOCK_KEY)) || {};
};

// --------------------
// GET STOCK (PERSISTENT)
// --------------------
export const getProductStock = (productId) => {
  if (!isValidProductId(productId)) return 0;

  const stockStore = getStockStore();

  if (stockStore[productId] !== undefined) {
    return stockStore[productId];
  }

  // generate ONCE
  const initialStock = Math.floor(Math.random() * 21); // 0–20
  stockStore[productId] = initialStock;

  localStorage.setItem(STOCK_KEY, JSON.stringify(stockStore));
  return initialStock;
};

// --------------------
// REDUCE STOCK
// --------------------
export const reduceProductStock = (productId, quantity) => {
  if (!isValidProductId(productId) || quantity <= 0) return;

  const stockStore = getStockStore();

  stockStore[productId] = Math.max(
    (stockStore[productId] ?? 0) - quantity,
    0
  );

  localStorage.setItem(STOCK_KEY, JSON.stringify(stockStore));
};

// --------------------
// INCREASE STOCK
// --------------------
export const increaseProductStock = (productId, amount) => {
  if (!isValidProductId(productId) || amount <= 0) return;

  const stockStore = getStockStore();
  const currentStock = stockStore[productId] ?? 0;

  stockStore[productId] = currentStock + amount;

  localStorage.setItem(STOCK_KEY, JSON.stringify(stockStore));
};


if (import.meta.env.DEV) {
    window.increaseProductStock = increaseProductStock;
    window.getProductStock = getProductStock;
  }