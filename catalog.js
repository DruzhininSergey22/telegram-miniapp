let allProducts = [];

document.addEventListener("DOMContentLoaded", () => {
  fetch("/telegram-miniapp/products.json")
    .then((res) => res.json())
    .then((data) => {
      allProducts = data;
      renderAllProducts(data);
    });

  // Назначаем фильтры
  document.getElementById("colorFilter")?.addEventListener("change", applyFilters);
  document.getElementById("memoryFilter")?.addEventListener("change", applyFilters);
});

// Отображение товаров в блоках брендов
function renderAllProducts(products) {
  const brands = ["Apple", "Samsung", "Xiaomi"];

  brands.forEach((brand) => {
    const brandContainer = document.querySelector(`#${brand} .row`);
    if (!brandContainer) return;

    const productsForBrand = products.filter((p) => p.brand === brand);
    renderProductBlock(brandContainer, productsForBrand);
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

// Рендер карточек в конкретный контейнер
function renderProductBlock(container, products) {
  container.innerHTML = ""; // очистка

  products.forEach((p) => {
    const card = `
      <div class="col-lg-4 col-md-6 column_card_catalog">
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
      </div>`;
    container.innerHTML += card;
  });

  if (products.length === 0) {
    container.innerHTML = `<p class="text-muted">Нет товаров</p>`;
  }
}
