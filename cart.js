// ===== CARRITO GLOBAL =====
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let total = Number(localStorage.getItem("cartTotal")) || 0;

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
  localStorage.setItem("cartTotal", total);
}

function updateCartCount() {
  const el = document.getElementById("cart-count");
  if (el) el.textContent = cart.length;
}

function renderCart() {
  const items = document.getElementById("cart-items");
  const totalEl = document.getElementById("cart-total");
  if (!items || !totalEl) return;

  items.innerHTML = "";
  cart.forEach((item, i) => {
    items.innerHTML += `
      <li class="list-group-item d-flex justify-content-between align-items-center">
        ${item.name} - $${item.price}
        <button class="btn btn-sm btn-danger" onclick="removeFromCart(${i})">X</button>
      </li>
    `;
  });

  totalEl.textContent = total;
}

// ===== FUNCIONES GLOBALES =====
window.addToCart = function(name, price) {
  cart.push({ name, price: Number(price) });
  total += Number(price);
  saveCart();
  updateCartCount();
  renderCart();
};

window.removeFromCart = function(index) {
  total -= cart[index].price;
  cart.splice(index, 1);
  saveCart();
  updateCartCount();
  renderCart();
};

window.clearCart = function() {
  cart = [];
  total = 0;
  saveCart();
  updateCartCount();
  renderCart();
};

document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
  renderCart();
});
