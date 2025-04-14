const drinks = [
    { name: "Mojito", price: 6.50, prevPrice: 6.50 },
    { name: "Caipirinha", price: 7.00, prevPrice: 7.00 },
    { name: "Margarita", price: 8.00, prevPrice: 8.00 },
    { name: "Piña Colada", price: 7.50, prevPrice: 7.50 },
    { name: "Gin Tonic", price: 6.00, prevPrice: 6.00 },
    { name: "Cerveza Artesanal", price: 4.50, prevPrice: 4.50 },
    { name: "Sangría", price: 5.50, prevPrice: 5.50 },
    { name: "Tequila Sunrise", price: 7.20, prevPrice: 7.20 },
    { name: "Daiquiri", price: 6.80, prevPrice: 6.80 }
];

const container = document.getElementById('drinks-container');
const rollover = document.getElementById('rollover');

function renderDrinks() {
    container.innerHTML = '';
    drinks.forEach(drink => {
        const arrow = drink.price > drink.prevPrice ? '<span class="arrow-up">↑</span>' :
                     drink.price < drink.prevPrice ? '<span class="arrow-down">↓</span>' : '';
        const drinkElement = document.createElement('div');
        drinkElement.className = 'drink';
        drinkElement.innerHTML = `
            <h3>${drink.name}</h3>
            <p class="price">€${drink.price.toFixed(2)} ${arrow}</p>
            <button onclick="buyDrink('${drink.name}')">Comprar</button>
            <button onclick="sellDrink('${drink.name}')">Vender</button>
        `;
        container.appendChild(drinkElement);
    });
    updateRollover();
}

function updateRollover() {
    rollover.innerHTML = drinks.map(drink => 
        `<span>${drink.name} | €${drink.price.toFixed(2)}</span>`
    ).join('');
}

function buyDrink(name) {
    const drink = drinks.find(d => d.name === name);
    drink.prevPrice = drink.price;
    drink.price += Math.random() * 0.5; // Sube precio al comprar
    renderDrinks();
}

function sellDrink(name) {
    const drink = drinks.find(d => d.name === name);
    drink.prevPrice = drink.price;
    drink.price -= Math.random() * 0.5; // Baja precio al vender
    if (drink.price < 1) drink.price = 1; // Precio mínimo
    renderDrinks();
}

// Actualizar precios aleatoriamente cada 10 segundos
setInterval(() => {
    drinks.forEach(drink => {
        drink.prevPrice = drink.price;
        const change = (Math.random() - 0.5) * 0.5;
        drink.price = Math.max(1, drink.price + change);
    });
    renderDrinks();
}, 10000);

// Render inicial
renderDrinks();