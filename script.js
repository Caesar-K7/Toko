// ================= DATA =================
const products = [
  {
    id: 1,
    name: "Hoodie Hitam",
    price: 150000,
    image: "img/hoodie.jpg",
    desc: "Hoodie premium bahan fleece tebal dan nyaman.",
    stock: 10
  },
  {
    id: 2,
    name: "Kaos Oversize",
    price: 90000,
    image: "img/kaos.jpg",
    desc: "Kaos oversized nyaman untuk sehari-hari.",
    stock: 15
  },
  { id: 3, name: "Celana Cargo", price: 120000, image: "img/celana.jpg", desc: "Celana cargo berkualitas tinggi", stock: 10 },
  { id: 4, name: "Topi", price: 50000, image: "img/topi.jpg", desc: "Topi premium dengan harga terjangkau", stock: 5 },
  { id: 5, name: "Jaket Denim", price: 200000, image: "img/jaket.jpg", desc:"Jaket denim yang stylish", stock: 13 }
];

let cart = [];

// ================= DOM =================
const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const totalEl = document.getElementById("total");

// ================= MODAL MODULE =================
const Modal = {
  el: document.getElementById("modal"),
  img: document.getElementById("modal-img"),
  name: document.getElementById("modal-name"),
  desc: document.getElementById("modal-desc"),
  stock: document.getElementById("modal-stock"),
  closeBtn: document.getElementById("closeModal"),

  init() {
    this.closeBtn.addEventListener("click", () => this.close());

    window.addEventListener("click", (e) => {
      if (e.target === this.el) this.close();
    });
  },

  open(product) {
    this.el.classList.remove("hidden");

    this.img.src = product.image;
    this.name.textContent = product.name;
    this.desc.textContent = product.desc;
    this.stock.textContent = `Stok: ${product.stock}`;
  },

  close() {
    this.el.classList.add("hidden");
  }
};

// ================= FORMAT =================
function formatRupiah(number) {
  return number.toLocaleString("id-ID");
}

// ================= PRODUCT =================
function renderProducts() {
  productList.innerHTML = "";

  products.forEach(product => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <img src="${product.image}" class="product-img">
      <h3>${product.name}</h3>
      <p>Rp ${formatRupiah(product.price)}</p>
      <button>Tambah</button>
    `;

    // klik gambar → modal
    card.querySelector(".product-img")
      .addEventListener("click", () => Modal.open(product));

    // tambah cart
    card.querySelector("button")
      .addEventListener("click", () => addToCart(product.id));

    productList.appendChild(card);
  });
}

// ================= CART =================
function addToCart(id) {
  const product = products.find(p => p.id === id);
  cart.push(product);
  renderCart();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  renderCart();
}

function renderCart() {
  cartList.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    const el = document.createElement("div");
    el.classList.add("cart-item");

    el.innerHTML = `
      <span>${item.name} - Rp ${formatRupiah(item.price)}</span>
      <button class="minus-btn">−</button>
    `;

    el.querySelector(".minus-btn")
      .addEventListener("click", () => removeFromCart(index));

    cartList.appendChild(el);

    total += item.price;
  });

  totalEl.textContent = formatRupiah(total);
}

// ================= INIT =================
document.addEventListener("DOMContentLoaded", () => {
  renderProducts();
  renderCart();
  Modal.init();
});

function checkout() {
  if (cart.length === 0) {
    alert("Keranjang kosong!");
    return;
  }

  const payment = document.querySelector('input[name="payment"]:checked').value;
  const shipping = document.querySelector('input[name="shipping"]:checked').value;

  let paymentMsg = "";
  let shippingMsg = "";

  // PAYMENT
  switch(payment) {
    case "transfer":
      paymentMsg = "Transfer Bank: BCA 123-456-789";
      break;
    case "dana":
      paymentMsg = "DANA: 0812-3456-7890";
      break;
    case "ovo":
      paymentMsg = "OVO: 0812-3456-7890";
      break;
    case "gopay":
      paymentMsg = "GoPay: 0812-3456-7890";
      break;
    case "cod":
      paymentMsg = "Bayar di tempat (COD)";
      break;
  }

  // SHIPPING
  switch(shipping) {
    case "jne":
      shippingMsg = "JNE dipilih (1-3 hari)";
      break;
    case "jnt":
      shippingMsg = "J&T dipilih (1-2 hari)";
      break;
    case "sicepat":
      shippingMsg = "SiCepat dipilih (1-2 hari)";
      break;
  }

  document.getElementById("status").classList.remove("hidden");

  document.getElementById("status").innerHTML = `
    ✅ Checkout Berhasil <br><br>
    💳 ${paymentMsg} <br>
    🚚 ${shippingMsg}
  `;

  cart = [];
  renderCart();
}