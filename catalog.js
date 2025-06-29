function renderProductBlock(container, products) {
  products.forEach((p) => {
    const card = document.createElement("div");
    card.className = "col-lg-4 col-md-6 column_card_catalog";
    card.innerHTML = `
      <div class="product-card-catalog">
        <div class="product-header-catalog">
          <i class="far fa-heart favorite-icon"></i>
        </div>
        <img src="${p.image}" alt="${p.name}" class="product-img-catalog">
        <p class="product-name-catalog">${p.name}</p>
        <div class="product-footer-catalog">
          <span class="product-price-catalog">${p.price.toLocaleString()} ₽</span>
          <button class="btn btn-primary btn-pm view-product" data-id="${p.id}">Посмотреть</button>
        </div>
      </div>
    `;
    container.appendChild(card);
  });

  // Обработчик кнопок "Посмотреть"
  container.querySelectorAll(".view-product").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const productId = parseInt(btn.dataset.id);
      const product = allProducts.find(p => p.id === productId);
      if (product) {
        localStorage.setItem("selectedProduct", JSON.stringify(product));
        window.location.href = "/telegram-miniapp/pages/card.html";
      }
    });
  });
}
