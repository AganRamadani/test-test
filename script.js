const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("animate");
  });
});
document.querySelectorAll(".fade-in, .slide-up, .zoom-in").forEach(el => observer.observe(el));



function addToCart(id){
  const product = products.find(p => p.id === id);
  if (product) {
    cart.push(product);
    displayCart();
  }
}

function removeItem(index){
  cart.splice(index, 1);
  displayCart();
}

function displayCart(){
  const container = document.getElementById("cart-items");
  if (!container) return;
  container.innerHTML = cart.map((item, i) => `
    <div>${item.name} - ${item.price} MKD 
      <button onclick="removeItem(${i})">❌</button>
    </div>
  `).join("");
}

function toggleOrderForm() {
  const form = document.getElementById("order-form");
  const summary = document.getElementById("order-summary");
  if (!form || !summary) return;
  
  summary.value = cart.map(p => `${p.name} - ${p.price} MKD`).join("\n") + 
                  `\n\nTotal: ${cart.reduce((sum, p) => sum + p.price, 0)} MKD`;
  form.style.display = form.style.display === "none" ? "block" : "none";
}

loadProducts();
