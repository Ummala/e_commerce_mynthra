// ===== PRODUCT DATA =====
const allProducts = [
  {
    id: 1,
    brand: "Roadster",
    name: "Men Slim Fit Casual Shirt",
    category: "Men",
    price: 799,
    mrp: 1999,
    discount: 60,
    rating: 4.3,
    reviews: 12480,
    image: "https://images.unsplash.com/photo-1602810316693-3667c854239a?w=400&h=500&fit=crop",
    sizes: ["S", "M", "L", "XL", "XXL"],
    selectedSize: "M"
  },
  {
    id: 2,
    brand: "ONLY",
    name: "Women Floral Wrap Midi Dress",
    category: "Women",
    price: 1299,
    mrp: 2999,
    discount: 57,
    rating: 4.5,
    reviews: 8765,
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=500&fit=crop",
    sizes: ["XS", "S", "M", "L"],
    selectedSize: "S"
  },
  {
    id: 3,
    brand: "Puma",
    name: "Men Running Shoes EvoKNIT",
    category: "Footwear",
    price: 2499,
    mrp: 4999,
    discount: 50,
    rating: 4.4,
    reviews: 21034,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=500&fit=crop",
    sizes: ["6", "7", "8", "9", "10", "11"],
    selectedSize: "9"
  },
  {
    id: 4,
    brand: "H&M",
    name: "Women High-Waist Skinny Jeans",
    category: "Women",
    price: 1799,
    mrp: 3499,
    discount: 49,
    rating: 4.2,
    reviews: 15623,
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400&h=500&fit=crop",
    sizes: ["26", "28", "30", "32", "34"],
    selectedSize: "28"
  },
  {
    id: 5,
    brand: "US Polo Assn.",
    name: "Men Polo Neck T-Shirt",
    category: "Men",
    price: 999,
    mrp: 1999,
    discount: 50,
    rating: 4.3,
    reviews: 9854,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop",
    sizes: ["S", "M", "L", "XL"],
    selectedSize: "L"
  },
  {
    id: 6,
    brand: "Lakme",
    name: "9 to 5 Weightless Mousse Foundation",
    category: "Accessories",
    price: 449,
    mrp: 799,
    discount: 44,
    rating: 4.1,
    reviews: 34521,
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=500&fit=crop",
    sizes: ["One Size"],
    selectedSize: "One Size"
  },
  {
    id: 7,
    brand: "Allen Solly",
    name: "Boys Slim Fit Chinos",
    category: "Kids",
    price: 899,
    mrp: 1799,
    discount: 50,
    rating: 4.0,
    reviews: 4321,
    image: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=400&h=500&fit=crop",
    sizes: ["4Y", "6Y", "8Y", "10Y", "12Y"],
    selectedSize: "8Y"
  },
  {
    id: 8,
    brand: "Fossil",
    name: "Men Chronograph Watch",
    category: "Accessories",
    price: 5999,
    mrp: 11995,
    discount: 50,
    rating: 4.6,
    reviews: 7812,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=500&fit=crop",
    sizes: ["One Size"],
    selectedSize: "One Size"
  },
  {
    id: 9,
    brand: "Nike",
    name: "Women Air Max Running Shoes",
    category: "Footwear",
    price: 5499,
    mrp: 7995,
    discount: 31,
    rating: 4.7,
    reviews: 18976,
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&h=500&fit=crop",
    sizes: ["4", "5", "6", "7", "8"],
    selectedSize: "6"
  },
  {
    id: 10,
    brand: "Levis",
    name: "Men 511 Slim Fit Jeans",
    category: "Men",
    price: 2499,
    mrp: 3999,
    discount: 38,
    rating: 4.4,
    reviews: 29045,
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=500&fit=crop",
    sizes: ["28", "30", "32", "34", "36"],
    selectedSize: "32"
  }
];

// ===== STATE =====
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
let displayedProducts = [...allProducts];
let appliedCoupon = null;

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  renderProducts(allProducts);
  updateBadges();
});

// ===== RENDER PRODUCTS =====
function renderProducts(products) {
  const grid = document.getElementById('productsGrid');
  if (!grid) return;

  if (products.length === 0) {
    grid.innerHTML = '<div class="empty-state" style="grid-column:1/-1;text-align:center;padding:4rem;"><i class="fa fa-search" style="font-size:3rem;color:#eee;"></i><p style="margin-top:1rem;color:#94969f;">No products found</p></div>';
    return;
  }

  grid.innerHTML = products.map(p => {
    const inWishlist = wishlist.some(w => w.id === p.id);
    const inCart = cart.some(c => c.id === p.id);
    return `
      <div class="product-card" id="product-${p.id}">
        <div class="product-image-wrap">
          <img src="${p.image}" alt="${p.brand} - ${p.name}" loading="lazy" />
          <button class="wishlist-btn ${inWishlist ? 'active' : ''}" onclick="toggleWishlist(${p.id}, event)" title="${inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}">
            <i class="fa${inWishlist ? 's' : 'r'} fa-heart"></i>
          </button>
          <span class="discount-tag">${p.discount}% OFF</span>
        </div>
        <div class="product-info">
          <div class="brand-name">${p.brand}</div>
          <div class="product-name">${p.name}</div>
          <div class="price-wrap">
            <span class="current-price">₹${p.price.toLocaleString()}</span>
            <span class="original-price">₹${p.mrp.toLocaleString()}</span>
            <span class="discount-pct">(${p.discount}% OFF)</span>
          </div>
          <div class="product-rating">
            <span class="rating-badge"><i class="fa fa-star"></i> ${p.rating}</span>
            <span>${p.reviews.toLocaleString()} ratings</span>
          </div>
          <button class="add-to-cart-btn ${inCart ? 'added' : ''}" onclick="addToCart(${p.id})" id="cartBtn-${p.id}">
            ${inCart ? '<i class="fa fa-check"></i> Added to Bag' : '<i class="fa fa-shopping-bag"></i> Add to Bag'}
          </button>
        </div>
      </div>`;
  }).join('');
}

// ===== ADD TO CART =====
function addToCart(id) {
  const product = allProducts.find(p => p.id === id);
  const existing = cart.find(c => c.id === id);

  if (existing) {
    // already in cart, go to cart
    showPage('cart');
    return;
  }

  cart.push({ ...product, qty: 1 });
  saveCart();
  updateBadges();
  renderProducts(displayedProducts);

  // Update btn
  const btn = document.getElementById(`cartBtn-${id}`);
  if (btn) {
    btn.classList.add('added');
    btn.innerHTML = '<i class="fa fa-check"></i> Added to Bag';
  }

  showToast(`${product.brand} added to bag!`);
}

// ===== TOGGLE WISHLIST =====
function toggleWishlist(id, e) {
  e.stopPropagation();
  const product = allProducts.find(p => p.id === id);
  const idx = wishlist.findIndex(w => w.id === id);

  if (idx > -1) {
    wishlist.splice(idx, 1);
    showToast('Removed from wishlist');
  } else {
    wishlist.push(product);
    showToast(`${product.brand} added to wishlist!`);
  }

  saveWishlist();
  updateBadges();
  renderProducts(displayedProducts);

  // Re-render wishlist if open
  if (document.getElementById('wishlistPage').style.display !== 'none') {
    renderWishlist();
  }
}

// ===== RENDER CART =====
function renderCart() {
  const cartItems = document.getElementById('cartItems');
  const cartCount = document.getElementById('cartCount');

  if (cart.length === 0) {
    cartItems.innerHTML = `
      <div class="empty-state" style="text-align:center;padding:4rem;">
        <i class="fa fa-shopping-bag" style="font-size:4rem;color:#eee;"></i>
        <p style="margin:1rem 0;color:#94969f;font-size:1.1rem;">Your bag is empty</p>
        <button class="hero-btn" style="background:#ff3f6c;color:#fff;" onclick="showHome()">Start Shopping</button>
      </div>`;
    cartCount.textContent = 0;
    updatePriceSummary();
    return;
  }

  cartCount.textContent = cart.length;

  cartItems.innerHTML = cart.map(item => `
    <div class="cart-item" id="cartItem-${item.id}">
      <img src="${item.image}" class="cart-item-img" alt="${item.name}" />
      <div class="cart-item-details">
        <div class="brand">${item.brand}</div>
        <div class="name">${item.name}</div>
        <div class="cart-item-size">Size: ${item.selectedSize}</div>
        <div class="cart-item-price">
          ₹${(item.price * item.qty).toLocaleString()}
          <span class="orig">₹${(item.mrp * item.qty).toLocaleString()}</span>
          <span class="disc">${item.discount}% off</span>
        </div>
        <div class="qty-controls">
          <button class="qty-btn" onclick="changeQty(${item.id}, -1)">−</button>
          <span class="qty-display">${item.qty}</span>
          <button class="qty-btn" onclick="changeQty(${item.id}, 1)">+</button>
          <span style="font-size:0.8rem;color:#94969f;margin-left:0.5rem;">Qty</span>
        </div>
        <button class="remove-btn" onclick="removeFromCart(${item.id})">
          <i class="fa fa-trash"></i> Remove
        </button>
      </div>
    </div>`).join('');

  updatePriceSummary();
}

// ===== CHANGE QUANTITY =====
function changeQty(id, delta) {
  const item = cart.find(c => c.id === id);
  if (!item) return;
  item.qty = Math.max(1, Math.min(10, item.qty + delta));
  saveCart();
  renderCart();
}

// ===== REMOVE FROM CART =====
function removeFromCart(id) {
  cart = cart.filter(c => c.id !== id);
  saveCart();
  updateBadges();
  renderCart();
  renderProducts(displayedProducts);
  showToast('Item removed from bag');
}

// ===== PRICE SUMMARY =====
function updatePriceSummary() {
  const totalMRP = cart.reduce((sum, i) => sum + (i.mrp * i.qty), 0);
  const totalPrice = cart.reduce((sum, i) => sum + (i.price * i.qty), 0);
  let discount = totalMRP - totalPrice;
  let couponDiscount = 0;

  if (appliedCoupon === 'SAVE10') couponDiscount = Math.round(totalPrice * 0.1);
  if (appliedCoupon === 'FLAT200') couponDiscount = 200;

  const finalPrice = totalPrice - couponDiscount + 20; // +20 platform fee
  const savings = totalMRP - finalPrice + (appliedCoupon ? couponDiscount : 0);

  document.getElementById('summaryCount').textContent = cart.reduce((s, i) => s + i.qty, 0);
  document.getElementById('summaryMRP').textContent = `₹${totalMRP.toLocaleString()}`;
  document.getElementById('summaryDiscount').textContent = `-₹${(discount + couponDiscount).toLocaleString()}`;
  document.getElementById('totalAmount').innerHTML = `<strong>₹${finalPrice.toLocaleString()}</strong>`;
  document.getElementById('deliveryCharge').textContent = totalPrice > 499 ? 'FREE' : '₹49';
  const savingsEl = document.getElementById('savingsInfo');
  if (cart.length > 0) {
    savingsEl.textContent = `🎉 You will save ₹${(discount + couponDiscount).toLocaleString()} on this order`;
    savingsEl.style.display = 'block';
  } else {
    savingsEl.style.display = 'none';
  }

  // Update billing summary too
  updateBillingSummary(totalMRP, totalPrice, couponDiscount, finalPrice);
}

// ===== BILLING SUMMARY =====
function updateBillingSummary(totalMRP, totalPrice, couponDiscount, finalPrice) {
  const summaryItems = document.getElementById('billingSummaryItems');
  if (summaryItems) {
    summaryItems.innerHTML = cart.map(item => `
      <div class="summary-item">
        <img src="${item.image}" alt="${item.name}" />
        <div class="summary-item-info">
          <div class="b">${item.brand}</div>
          <div class="n">${item.name}</div>
          <div class="n">Size: ${item.selectedSize} | Qty: ${item.qty}</div>
          <div class="p">₹${(item.price * item.qty).toLocaleString()}</div>
        </div>
      </div>`).join('');
  }

  const disc = (totalMRP - totalPrice) + couponDiscount;
  if (document.getElementById('billSubtotal')) document.getElementById('billSubtotal').textContent = `₹${totalMRP.toLocaleString()}`;
  if (document.getElementById('billDiscount')) document.getElementById('billDiscount').textContent = `-₹${disc.toLocaleString()}`;
  if (document.getElementById('billTotal')) document.getElementById('billTotal').innerHTML = `<strong>₹${finalPrice.toLocaleString()}</strong>`;
}

// ===== COUPON =====
function applyCoupon() {
  const code = document.getElementById('couponCode').value.trim().toUpperCase();
  const msg = document.getElementById('couponMsg');

  if (code === 'SAVE10') {
    appliedCoupon = 'SAVE10';
    msg.style.color = '#03a685';
    msg.textContent = '✓ Coupon applied! Extra 10% off';
    updatePriceSummary();
  } else if (code === 'FLAT200') {
    appliedCoupon = 'FLAT200';
    msg.style.color = '#03a685';
    msg.textContent = '✓ Coupon applied! Flat ₹200 off';
    updatePriceSummary();
  } else if (code === '') {
    msg.style.color = '#ff3f6c';
    msg.textContent = 'Please enter a coupon code';
  } else {
    appliedCoupon = null;
    msg.style.color = '#ff3f6c';
    msg.textContent = '✗ Invalid coupon code';
  }
}

// ===== WISHLIST =====
function renderWishlist() {
  const grid = document.getElementById('wishlistGrid');
  const count = document.getElementById('wishlistCount');
  const empty = document.getElementById('emptyWishlist');

  count.textContent = wishlist.length;

  if (wishlist.length === 0) {
    grid.innerHTML = '';
    empty.style.display = 'block';
    return;
  }

  empty.style.display = 'none';
  grid.innerHTML = wishlist.map(p => {
    const inCart = cart.some(c => c.id === p.id);
    return `
      <div class="product-card">
        <div class="product-image-wrap">
          <img src="${p.image}" alt="${p.name}" loading="lazy" />
          <button class="wishlist-btn active" onclick="toggleWishlist(${p.id}, event)">
            <i class="fas fa-heart"></i>
          </button>
          <span class="discount-tag">${p.discount}% OFF</span>
        </div>
        <div class="product-info">
          <div class="brand-name">${p.brand}</div>
          <div class="product-name">${p.name}</div>
          <div class="price-wrap">
            <span class="current-price">₹${p.price.toLocaleString()}</span>
            <span class="original-price">₹${p.mrp.toLocaleString()}</span>
          </div>
          <button class="add-to-cart-btn ${inCart ? 'added' : ''}" onclick="addToCart(${p.id})">
            ${inCart ? '<i class="fa fa-check"></i> Added to Bag' : '<i class="fa fa-shopping-bag"></i> Move to Bag'}
          </button>
        </div>
      </div>`;
  }).join('');
}

// ===== PLACE ORDER =====
function placeOrder(e) {
  e.preventDefault();
  const name = document.getElementById('firstName').value + ' ' + document.getElementById('lastName').value;
  const city = document.getElementById('city').value;
  const orderId = 'MYN' + Date.now().toString().slice(-8).toUpperCase();

  document.getElementById('orderMsg').textContent = `Hey ${name}! Your order is confirmed and will be delivered to ${city}.`;
  document.getElementById('orderId').textContent = orderId;
  document.getElementById('successModal').style.display = 'flex';

  // Clear cart
  cart = [];
  saveCart();
  updateBadges();
}

function goHome() {
  document.getElementById('successModal').style.display = 'none';
  showHome();
}

// ===== NAVIGATION =====
function showPage(page) {
  // Hide all
  document.getElementById('homePage').style.display = 'none';
  document.getElementById('productsSection').style.display = 'none';
  document.getElementById('cartPage').style.display = 'none';
  document.getElementById('billingPage').style.display = 'none';
  document.getElementById('wishlistPage').style.display = 'none';

  if (page === 'cart') {
    document.getElementById('cartPage').style.display = 'block';
    renderCart();
    window.scrollTo(0, 0);
  } else if (page === 'billing') {
    if (cart.length === 0) {
      showToast('Your bag is empty!');
      showPage('cart');
      return;
    }
    document.getElementById('billingPage').style.display = 'block';
    updatePriceSummary();
    window.scrollTo(0, 0);
  } else if (page === 'wishlist') {
    document.getElementById('wishlistPage').style.display = 'block';
    renderWishlist();
    window.scrollTo(0, 0);
  }
}

function showHome() {
  document.getElementById('homePage').style.display = 'block';
  document.getElementById('productsSection').style.display = 'block';
  document.getElementById('cartPage').style.display = 'none';
  document.getElementById('billingPage').style.display = 'none';
  document.getElementById('wishlistPage').style.display = 'none';
  window.scrollTo(0, 0);
}

function scrollToProducts() {
  document.getElementById('productsSection').scrollIntoView({ behavior: 'smooth' });
}

// ===== FILTER & SORT =====
function filterByCategory(cat, event) {
  // Update pills
  document.querySelectorAll('.pill').forEach(p => p.classList.remove('active'));
  if (event && event.target) event.target.classList.add('active');

  if (cat === 'all') {
    displayedProducts = [...allProducts];
    document.getElementById('sectionTitle').textContent = 'All Products';
  } else {
    displayedProducts = allProducts.filter(p => p.category === cat);
    document.getElementById('sectionTitle').textContent = cat;
  }
  renderProducts(displayedProducts);
}

function filterProducts() {
  const query = document.getElementById('searchInput').value.toLowerCase();
  if (query.length === 0) {
    displayedProducts = [...allProducts];
  } else {
    displayedProducts = allProducts.filter(p =>
      p.brand.toLowerCase().includes(query) ||
      p.name.toLowerCase().includes(query) ||
      p.category.toLowerCase().includes(query)
    );
    document.getElementById('sectionTitle').textContent = `Results for "${query}"`;
  }
  renderProducts(displayedProducts);
}

function sortProducts(val) {
  let sorted = [...displayedProducts];
  if (val === 'low') sorted.sort((a, b) => a.price - b.price);
  else if (val === 'high') sorted.sort((a, b) => b.price - a.price);
  else if (val === 'discount') sorted.sort((a, b) => b.discount - a.discount);
  renderProducts(sorted);
}

// ===== BADGES =====
function updateBadges() {
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  document.getElementById('cartBadge').textContent = cartCount;
  document.getElementById('wishlistBadge').textContent = wishlist.length;
}

// ===== SAVE TO LOCALSTORAGE =====
function saveCart() { localStorage.setItem('cart', JSON.stringify(cart)); }
function saveWishlist() { localStorage.setItem('wishlist', JSON.stringify(wishlist)); }

// ===== TOAST =====
function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2500);
}
