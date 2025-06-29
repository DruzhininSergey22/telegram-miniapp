document.addEventListener("DOMContentLoaded", () => {
  const product = JSON.parse(localStorage.getItem("selectedProduct"));
  if (!product) return;

  document.querySelector(".main-product-img").src = product.image;
  document.querySelector(".main-product-img").alt = product.name;
  document.querySelector(".product-title").textContent = product.name;
  document.querySelector(".product-price").textContent = `${product.price.toLocaleString()} ₽`;

  // При необходимости можешь рендерить кнопки памяти и цвета отсюда
});
