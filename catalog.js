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

// Отображение товаров по брендам
function renderAllProducts(products) {
  const brands = ["Apple", "Samsung", "Xiaomi"];
  let totalRendered = 0;

  // Удалить старые карточки и пересоздать
  brands.forEach((brand) => {
    const brandContainer = document.getElementById(brand);
    if (!brandContainer) return;

    const existingCards = brandContainer.querySelectorAll(".column_card_catalog");
    existingCards.forEach(el => el.remove());

    const productsForBrand = products.filter((p) => p.brand === brand);
    renderProductBlock(brandContainer, productsForBrand);
    totalRendered += productsForBrand.length;
  });

  // Удалить предыдущие сообщения "Нет товаров"
  document.querySelectorAll(".no-products-message").forEach(el => el.remove());

  if (totalRendered === 0) {
    const message = document.createElement("div");
    message.className = "text-muted no-products-message text-center py-4 w-100";
    message.textContent = "Нет товаров по фильтру";
    const catalog = document.querySelector(".second_section_index_catalog");
    catalog?.appendChild(message);
  }
}

// Фильтрация по цвету и памяти
function applyFilters() {
  const selectedColor = document.getElementById("colorFilter").value;
  const selectedMemory = document.getElementById("memoryFilter").value;

  const filtered = allProducts.filter((p) => {
    return (!selectedColor || p.color === selectedColor) &&
           (!selectedMemory || p.memory === selectedMemory);
  });

  renderAllProducts(filtered);
}

// Рендеринг карточек товара
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
          <button class="btn btn-primary btn-pm">Посмотреть</button>
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}
