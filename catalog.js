let allProducts = [];

document.addEventListener("DOMContentLoaded", () => {
  fetch("/telegram-miniapp/products.json")
    .then((res) => res.json())
    .then((data) => {
      allProducts = data;
      renderAllProducts(data);
    });

  document.getElementById("colorFilter")?.addEventListener("change", applyFilters);
  document.getElementById("memoryFilter")?.addEventListener("change", applyFilters);
});

// Рендер всех товаров по брендам
function renderAllProducts(products) {
  const brands = ["Apple", "Samsung", "Xiaomi"];

  brands.forEach((brand) => {
    const brandSection = document.getElementById(brand);
    if (!brandSection) return;

    // Удаляем все карточки
    brandSection.querySelectorAll(".column_card_catalog, .no-products-message").forEach(el => el.remove());

    const productsForBrand = products.filter((p) => p.brand === brand);
    renderProductBlock(brandSection, productsForBrand);
  });
}

// Применение фильтров
function applyFilters() {
  const selectedColor = document.getElementById("colorFilter").value;
  const selectedMemory = document.getElementById("memoryFilter").value;

  const filtered = allProducts.filter((p) => {
    return (!selectedColor || p.color === selectedColor) &&
           (!selectedMemory || p.memory === selectedMemory);
  });

  renderAllProducts(filtered);
}

// Рендер товаров в нужный блок
function renderProductBlock(container, products) {
  if (products.length === 0) {
    const empty = document.createElement("div");
    empty.className = "col-12 text-muted no-products-message";
    empty.textContent = "Нет товаров по фильтру";
    container.appendChild(empty);
    return;
  }

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

  // Подключение кнопок "Посмотреть"
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
