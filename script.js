// Datos iniciales
const drinks = {
  cocktails: [
    { name: "Mojito", price: 8.5 },
    { name: "Margarita", price: 9.0 },
    { name: "Piña Colada", price: 10.0 },
    { name: "Cosmopolitan", price: 11.0 },
    { name: "Old Fashioned", price: 12.0 },
  ],
  beers: [
    { name: "Heineken", price: 4.0 },
    { name: "Corona", price: 4.5 },
    { name: "Estrella Damm", price: 5.0 },
    { name: "Budweiser", price: 5.5 },
    { name: "Stella Artois", price: 6.0 },
  ],
  nonAlcoholic: [
    { name: "Limonada", price: 3.0 },
    { name: "Agua Mineral", price: 2.0 },
    { name: "Zumo de Naranja", price: 3.5 },
    { name: "Coca-Cola", price: 2.5 },
    { name: "Red Bull", price: 4.0 },
  ],
};

// Función para actualizar el precio
function updatePrice(drink) {
  const change = (Math.random() > 0.5 ? 1 : -1) * (Math.random() * 0.1); // Cambio aleatorio de ±0.1
  drink.price = parseFloat((drink.price + change).toFixed(2));
  return drink.price;
}

// Renderizar bebidas
function renderDrinks(category, containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = "";
  drinks[category].forEach((drink) => {
    const li = document.createElement("li");
    const priceClass = drink.price > drink.oldPrice ? "price-up" : "price-down";
    li.innerHTML = `
      ${drink.name}
      <span class="${priceClass}">
        €${drink.price} ${drink.price > drink.oldPrice ? "▲" : "▼"}
      </span>
    `;
    container.appendChild(li);
    drink.oldPrice = drink.price; // Guardar el precio anterior
  });
}

// Actualizar precios cada 2 minutos
setInterval(() => {
  Object.keys(drinks).forEach((category) => {
    drinks[category].forEach(updatePrice);
    renderDrinks(category, category === "cocktails" ? "cocktails" : category === "beers" ? "beers" : "non-alcoholic");
  });
}, 120000);

// Ticker inferior
function updateTicker() {
  const ticker = document.getElementById("ticker");
  ticker.innerHTML = "";
  Object.values(drinks).flat().forEach((drink) => {
    const priceClass = drink.price > drink.oldPrice ? "price-up" : "price-down";
    const span = document.createElement("span");
    span.className = priceClass;
    span.textContent = `${drink.name}: €${drink.price} ${drink.price > drink.oldPrice ? "▲" : "▼"} | `;
    ticker.appendChild(span);
  });
}

// Temporizador de crash
let countdownTime = 900; // 15 minutos en segundos
const countdownElement = document.getElementById("countdown");

function updateCountdown() {
  const minutes = Math.floor(countdownTime / 60);
  const seconds = countdownTime % 60;
  countdownElement.textContent = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  if (countdownTime <= 0) {
    alert("¡CRASH DEL MERCADO!");
    countdownTime = 900; // Reiniciar
  } else {
    countdownTime--;
  }
}

// Inicialización
Object.keys(drinks).forEach((category) => renderDrinks(category, category === "cocktails" ? "cocktails" : category === "beers" ? "beers" : "non-alcoholic"));
updateTicker();
setInterval(updateTicker, 5000); // Actualizar ticker cada 5 segundos
setInterval(updateCountdown, 1000); // Actualizar temporizador cada segundo