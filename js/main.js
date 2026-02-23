// =============================
// 📊 CONTADOR DE DESCARGAS
// =============================

document.addEventListener("DOMContentLoaded", () => {

    const cont1 = document.getElementById("cont1");
    const downloadButtons = document.querySelectorAll(".card button");

    let contador = parseInt(localStorage.getItem("descargas1")) || 0;

    if (cont1) cont1.textContent = contador;

    downloadButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            contador++;
            localStorage.setItem("descargas1", contador);
            if (cont1) cont1.textContent = contador;
        });
    });


    // =============================
    // 🔎 SISTEMA DE BÚSQUEDA
    // =============================

    const buscador = document.getElementById("buscador");
    const cards = document.querySelectorAll(".card");

    function filtrarCards() {
        const texto = buscador?.value.toLowerCase() || "";
        const categoriaActiva = document.querySelector(".cat-btn.active")?.dataset.cat;

        cards.forEach(card => {
            const contenido = card.textContent.toLowerCase();
            const categoriaCard = card.dataset.cat;

            const coincideBusqueda = contenido.includes(texto);
            const coincideCategoria =
                !categoriaActiva ||
                categoriaActiva === "todos" ||
                categoriaCard === categoriaActiva;

            if (coincideBusqueda && coincideCategoria) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });
    }

    if (buscador) {
        buscador.addEventListener("keyup", filtrarCards);
    }


    // =============================
    // 📂 FILTRO POR CATEGORÍAS
    // =============================

    const botonesCategoria = document.querySelectorAll(".cat-btn");

    botonesCategoria.forEach(boton => {
        boton.addEventListener("click", () => {

            // quitar active anterior
            botonesCategoria.forEach(b => b.classList.remove("active"));

            // activar actual
            boton.classList.add("active");

            filtrarCards();
        });
    });


    // =============================
    // 🍔 MENÚ HAMBURGUESA
    // =============================

    const hamburguesa = document.getElementById("hamburguesa");
    const menu = document.getElementById("menu");

    if (hamburguesa && menu) {
        hamburguesa.addEventListener("click", () => {
            menu.classList.toggle("active");
        });
    }


    // =============================
    // 🌙 DARK MODE
    // =============================

    const darkBtn = document.getElementById("darkBtn");

    // cargar estado guardado
    if (localStorage.getItem("darkMode") === "true") {
        document.body.classList.add("dark");
    }

    if (darkBtn) {
        darkBtn.addEventListener("click", () => {
            document.body.classList.toggle("dark");

            const modoActivo = document.body.classList.contains("dark");
            localStorage.setItem("darkMode", modoActivo);
        });
    }

});