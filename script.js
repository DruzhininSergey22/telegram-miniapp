// табы комплектов
document.addEventListener("DOMContentLoaded", function () {
    const tabs = document.querySelectorAll(".bundle-tab");
    const tabContents = document.querySelectorAll(".bundle-tab-content");

    tabs.forEach(tab => {
        tab.addEventListener("click", function () {
            const target = this.getAttribute("data-tab");

            // Удаляем активные классы
            tabs.forEach(t => t.classList.remove("active"));
            tabContents.forEach(content => content.classList.remove("active"));

            // Добавляем активный класс к выбранной вкладке и контенту
            this.classList.add("active");
            document.getElementById(target).classList.add("active");
        });
    });
});