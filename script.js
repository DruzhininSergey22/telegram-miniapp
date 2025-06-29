
document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".specs-tabs .tab");
  const contents = document.querySelectorAll(".specs-content .tab-content");

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      const target = tab.dataset.tab;

      // Удаляем active у всех табов и контента
      tabs.forEach(t => t.classList.remove("active"));
      contents.forEach(c => c.classList.remove("active"));

      // Активируем выбранные
      tab.classList.add("active");
      document.getElementById(target).classList.add("active");
    });
  });
});
