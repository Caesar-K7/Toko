// ================= DATA =================
const products = [
  { id: 1, name: "Hoodie Hitam", price: 150000, image: "img/hoodie.jpg", desc: "Hoodie premium bahan fleece", stock: 10 },
  { id: 2, name: "Kaos Oversize", price: 90000, image: "img/kaos.jpg", desc: "Kaos nyaman berwarna hitam cocok untuk kegiatan sehari-hari", stock: 15 },
  { id: 3, name: "Celana Cargo", price: 120000, image: "img/celana.jpg", desc: "Celana keren vesatile", stock: 10 },
  { id: 4, name: "Topi", price: 50000, image: "img/topi.jpg", desc: "Topi branded stylish", stock: 5 },
  { id: 5, name: "Jaket Denim", price: 200000, image: "img/jaket.jpg", desc: "Jaket kece berbahan denim", stock: 13 }
];

let cart = [];

// ================= FORMAT =================
const formatRupiah = n => n.toLocaleString("id-ID");

// ================= MODAL =================
const Modal = {
  el: document.getElementById("modal"),

  open(p) {
    console.log(p);
    this.el.classList.remove("hidden");
    document.getElementById("modal-img").src = p.image;
    document.getElementById("modal-name").textContent = p.name;
    document.getElementById("modal-desc").textContent = p.desc;
    document.getElementById("modal-stock").textContent = `Stok: ${p.stock}`;
  },

  close() {
    this.el.classList.add("hidden");
  }
};

// ================= POPUP =================
function showPopup(msg) {
  document.getElementById("popup-text").innerHTML = msg;
  document.getElementById("popup").classList.remove("hidden");
}

function closePopup() {
  document.getElementById("popup").classList.add("hidden");
}

// ================= PRODUCTS =================
function renderProducts() {
  const list = document.getElementById("product-list");
  list.innerHTML = "";

  products.forEach(p => {
    const el = document.createElement("div");
    el.className = "card";

    el.innerHTML = `
      <img src="${p.image}" class="product-img">
      <h3>${p.name}</h3>
      <p>Rp ${formatRupiah(p.price)}</p>
      <button>Tambah</button>
    `;

    el.querySelector("img").onclick = () => Modal.open(p);
    el.querySelector("button").onclick = () => addToCart(p.id);

    list.appendChild(el);
  });
}

// ================= CART =================
function addToCart(id) {
  cart.push(products.find(p => p.id === id));
  renderCart();
}

function renderCart() {
  const list = document.getElementById("cart-list");
  let total = 0;

  list.innerHTML = "";

  cart.forEach((item, i) => {
    const el = document.createElement("div");
    el.className = "cart-item";

    el.innerHTML = `
      <span>${item.name} - Rp ${formatRupiah(item.price)}</span>
      <button class="minus-btn">−</button>
    `;

    el.querySelector("button").onclick = () => {
      cart.splice(i, 1);
      renderCart();
    };

    list.appendChild(el);
    total += item.price;
  });

  document.getElementById("total").textContent = formatRupiah(total);
}

// ================= CHECKOUT =================
function checkout() {
  if (cart.length === 0) {
    alert("Keranjang kosong!");
    return;
  }

  const payment = document.querySelector('input[name="payment"]:checked').value;
  const shipping = document.querySelector('input[name="shipping"]:checked').value;

  const paymentMap = {
    transfer: "Transfer Bank: BCA 123-456-789",
    dana: "DANA: 0812-3456-7890",
    ovo: "OVO: 0812-3456-7890",
    gopay: "GoPay: 0812-3456-7890",
    cod: "Bayar di tempat (COD)"
  };

  const shippingMap = {
    jne: "JNE (1-3 hari)",
    jnt: "J&T (1-2 hari)",
    sicepat: "SiCepat (1-2 hari)"
  };

  showPopup(`
    ${paymentMap[payment]} <br>
    ${shippingMap[shipping]}
  `);

  cart = [];
  renderCart();
}

// ================= INIT =================
document.addEventListener("DOMContentLoaded", () => {
  renderProducts();
  renderCart();

  document.getElementById("closeModal").onclick = () => Modal.close();

  window.onclick = e => {
    if (e.target.id === "modal") Modal.close();
    if (e.target.id === "popup") closePopup();
  };
});