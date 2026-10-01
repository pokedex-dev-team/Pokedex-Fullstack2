const auth = document.getElementById("auth");
const loginForm = document.getElementById("login-form");
const registerForm = document.getElementById("register-form");
const loginTab = document.getElementById("login-tab");
const registerTab = document.getElementById("register-tab");
const authMessage = document.getElementById("auth-message");
const userSession = document.getElementById("user-session");
const sessionUser = document.getElementById("session-user");
const logoutButton = document.getElementById("logout-button");
const usersKey = "pokedurexUsuarios";
const sessionKey = "pokedurexSesion";

const getUsers = () => JSON.parse(localStorage.getItem(usersKey) || "[]");

const showMessage = (message, isError = true) => {
    authMessage.textContent = message;
    authMessage.classList.toggle("success", !isError);
};

const showLogin = () => {
    loginForm.classList.remove("hidden");
    registerForm.classList.add("hidden");
    loginTab.classList.add("active");
    registerTab.classList.remove("active");
    showMessage("");
};

const showRegister = () => {
    loginForm.classList.add("hidden");
    registerForm.classList.remove("hidden");
    loginTab.classList.remove("active");
    registerTab.classList.add("active");
    showMessage("");
};

const showApp = (user) => {
    auth.classList.add("hidden");
    document.querySelectorAll(".protected-content").forEach((element) => {
        element.classList.remove("hidden");
    });
    userSession.classList.remove("hidden");
    sessionUser.textContent = `Usuario: ${user.name}`;
};

const closeSession = () => {
    localStorage.removeItem(sessionKey);
    document.querySelectorAll(".protected-content").forEach((element) => {
        element.classList.add("hidden");
    });
    userSession.classList.add("hidden");
    auth.classList.remove("hidden");
    loginForm.reset();
    showLogin();
};

loginTab.addEventListener("click", showLogin);
registerTab.addEventListener("click", showRegister);

registerForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("register-name").value.trim();
    const email = document.getElementById("register-email").value.trim().toLowerCase();
    const password = document.getElementById("register-password").value;
    const users = getUsers();

    if (users.some((user) => user.email === email)) {
        showMessage("Ya existe una cuenta con ese correo.");
        return;
    }

    users.push({ name, email, password });
    localStorage.setItem(usersKey, JSON.stringify(users));
    registerForm.reset();
    showLogin();
    showMessage("Cuenta creada. Ya puedes iniciar sesión.", false);
});

loginForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const email = document.getElementById("login-email").value.trim().toLowerCase();
    const password = document.getElementById("login-password").value;
    const user = getUsers().find((item) => item.email === email && item.password === password);

    if (!user) {
        showMessage("Correo o contraseña incorrectos.");
        return;
    }

    localStorage.setItem(sessionKey, JSON.stringify(user));
    loginForm.reset();
    showApp(user);
});

logoutButton.addEventListener("click", closeSession);

const savedSession = JSON.parse(localStorage.getItem(sessionKey) || "null");

if (savedSession) {
    showApp(savedSession);
}

const pokemon = [
    ["Bulbasaur", ["Planta", "Veneno"], ["grass", "poison"]],
    ["Ivysaur", ["Planta", "Veneno"], ["grass", "poison"]],
    ["Venusaur", ["Planta", "Veneno"], ["grass", "poison"]],
    ["Charmander", ["Fuego"], ["fire"]],
    ["Charmeleon", ["Fuego"], ["fire"]],
    ["Charizard", ["Fuego", "Volador"], ["fire", "flying"]],
    ["Squirtle", ["Agua"], ["water"]],
    ["Wartortle", ["Agua"], ["water"]],
    ["Blastoise", ["Agua"], ["water"]],
    ["Caterpie", ["Bicho"], ["bug"]],
    ["Metapod", ["Bicho"], ["bug"]],
    ["Butterfree", ["Bicho", "Volador"], ["bug", "flying"]],
    ["Weedle", ["Bicho", "Veneno"], ["bug", "poison"]],
    ["Kakuna", ["Bicho", "Veneno"], ["bug", "poison"]],
    ["Beedrill", ["Bicho", "Veneno"], ["bug", "poison"]],
    ["Pidgey", ["Normal", "Volador"], ["normal", "flying"]],
    ["Pidgeotto", ["Normal", "Volador"], ["normal", "flying"]],
    ["Pidgeot", ["Normal", "Volador"], ["normal", "flying"]],
    ["Rattata", ["Normal"], ["normal"]],
    ["Raticate", ["Normal"], ["normal"]],
    ["Spearow", ["Normal", "Volador"], ["normal", "flying"]],
    ["Fearow", ["Normal", "Volador"], ["normal", "flying"]],
    ["Ekans", ["Veneno"], ["poison"]],
    ["Arbok", ["Veneno"], ["poison"]],
    ["Pikachu", ["Eléctrico"], ["electric"]],
    ["Raichu", ["Eléctrico"], ["electric"]],
    ["Sandshrew", ["Tierra"], ["ground"]],
    ["Sandslash", ["Tierra"], ["ground"]],
    ["Nidoran♀", ["Veneno"], ["poison"]],
    ["Nidorina", ["Veneno"], ["poison"]],
    ["Nidoqueen", ["Veneno", "Tierra"], ["poison", "ground"]],
    ["Nidoran♂", ["Veneno"], ["poison"]],
    ["Nidorino", ["Veneno"], ["poison"]],
    ["Nidoking", ["Veneno", "Tierra"], ["poison", "ground"]],
    ["Clefairy", ["Hada"], ["normal"]],
    ["Clefable", ["Hada"], ["normal"]],
    ["Vulpix", ["Fuego"], ["fire"]],
    ["Ninetales", ["Fuego"], ["fire"]],
    ["Jigglypuff", ["Normal", "Hada"], ["normal"]],
    ["Wigglytuff", ["Normal", "Hada"], ["normal"]],
    ["Zubat", ["Veneno", "Volador"], ["poison", "flying"]],
    ["Golbat", ["Veneno", "Volador"], ["poison", "flying"]],
    ["Oddish", ["Planta", "Veneno"], ["grass", "poison"]],
    ["Gloom", ["Planta", "Veneno"], ["grass", "poison"]],
    ["Vileplume", ["Planta", "Veneno"], ["grass", "poison"]],
    ["Paras", ["Bicho", "Planta"], ["bug", "grass"]],
    ["Parasect", ["Bicho", "Planta"], ["bug", "grass"]],
    ["Venonat", ["Bicho", "Veneno"], ["bug", "poison"]],
    ["Venomoth", ["Bicho", "Veneno"], ["bug", "poison"]],
    ["Diglett", ["Tierra"], ["ground"]],
    ["Dugtrio", ["Tierra"], ["ground"]],
    ["Meowth", ["Normal"], ["normal"]],
    ["Persian", ["Normal"], ["normal"]],
    ["Psyduck", ["Agua"], ["water"]],
    ["Golduck", ["Agua"], ["water"]],
    ["Mankey", ["Lucha"], ["fighting"]],
    ["Primeape", ["Lucha"], ["fighting"]],
    ["Growlithe", ["Fuego"], ["fire"]],
    ["Arcanine", ["Fuego"], ["fire"]],
    ["Poliwag", ["Agua"], ["water"]],
    ["Poliwhirl", ["Agua"], ["water"]],
    ["Poliwrath", ["Agua", "Lucha"], ["water", "fighting"]],
    ["Abra", ["Psíquico"], ["psychic"]],
    ["Kadabra", ["Psíquico"], ["psychic"]],
    ["Alakazam", ["Psíquico"], ["psychic"]],
    ["Machop", ["Lucha"], ["fighting"]],
    ["Machoke", ["Lucha"], ["fighting"]],
    ["Machamp", ["Lucha"], ["fighting"]],
    ["Bellsprout", ["Planta", "Veneno"], ["grass", "poison"]],
    ["Weepinbell", ["Planta", "Veneno"], ["grass", "poison"]],
    ["Victreebel", ["Planta", "Veneno"], ["grass", "poison"]],
    ["Tentacool", ["Agua", "Veneno"], ["water", "poison"]],
    ["Tentacruel", ["Agua", "Veneno"], ["water", "poison"]],
    ["Geodude", ["Roca", "Tierra"], ["rock", "ground"]],
    ["Graveler", ["Roca", "Tierra"], ["rock", "ground"]],
    ["Golem", ["Roca", "Tierra"], ["rock", "ground"]],
    ["Ponyta", ["Fuego"], ["fire"]],
    ["Rapidash", ["Fuego"], ["fire"]],
    ["Slowpoke", ["Agua", "Psíquico"], ["water", "psychic"]],
    ["Slowbro", ["Agua", "Psíquico"], ["water", "psychic"]],
    ["Magnemite", ["Eléctrico"], ["electric"]],
    ["Magneton", ["Eléctrico"], ["electric"]],
    ["Farfetch'd", ["Normal", "Volador"], ["normal", "flying"]],
    ["Doduo", ["Normal", "Volador"], ["normal", "flying"]],
    ["Dodrio", ["Normal", "Volador"], ["normal", "flying"]],
    ["Seel", ["Agua"], ["water"]],
    ["Dewgong", ["Agua", "Hielo"], ["water", "ice"]],
    ["Grimer", ["Veneno"], ["poison"]],
    ["Muk", ["Veneno"], ["poison"]],
    ["Shellder", ["Agua"], ["water"]],
    ["Cloyster", ["Agua", "Hielo"], ["water", "ice"]],
    ["Gastly", ["Fantasma", "Veneno"], ["ghost", "poison"]],
    ["Haunter", ["Fantasma", "Veneno"], ["ghost", "poison"]],
    ["Gengar", ["Fantasma", "Veneno"], ["ghost", "poison"]],
    ["Onix", ["Roca", "Tierra"], ["rock", "ground"]],
    ["Drowzee", ["Psíquico"], ["psychic"]],
    ["Hypno", ["Psíquico"], ["psychic"]],
    ["Krabby", ["Agua"], ["water"]],
    ["Kingler", ["Agua"], ["water"]],
    ["Voltorb", ["Eléctrico"], ["electric"]],
    ["Electrode", ["Eléctrico"], ["electric"]],
    ["Exeggcute", ["Planta", "Psíquico"], ["grass", "psychic"]],
    ["Exeggutor", ["Planta", "Psíquico"], ["grass", "psychic"]],
    ["Cubone", ["Tierra"], ["ground"]],
    ["Marowak", ["Tierra"], ["ground"]],
    ["Hitmonlee", ["Lucha"], ["fighting"]],
    ["Hitmonchan", ["Lucha"], ["fighting"]],
    ["Lickitung", ["Normal"], ["normal"]],
    ["Koffing", ["Veneno"], ["poison"]],
    ["Weezing", ["Veneno"], ["poison"]],
    ["Rhyhorn", ["Tierra", "Roca"], ["ground", "rock"]],
    ["Rhydon", ["Tierra", "Roca"], ["ground", "rock"]],
    ["Chansey", ["Normal"], ["normal"]],
    ["Tangela", ["Planta"], ["grass"]],
    ["Kangaskhan", ["Normal"], ["normal"]],
    ["Horsea", ["Agua"], ["water"]],
    ["Seadra", ["Agua"], ["water"]],
    ["Goldeen", ["Agua"], ["water"]],
    ["Seaking", ["Agua"], ["water"]],
    ["Staryu", ["Agua"], ["water"]],
    ["Starmie", ["Agua", "Psíquico"], ["water", "psychic"]],
    ["Mr. Mime", ["Psíquico", "Hada"], ["psychic", "normal"]],
    ["Scyther", ["Bicho", "Volador"], ["bug", "flying"]],
    ["Jynx", ["Hielo", "Psíquico"], ["ice", "psychic"]],
    ["Electabuzz", ["Eléctrico"], ["electric"]],
    ["Magmar", ["Fuego"], ["fire"]],
    ["Pinsir", ["Bicho"], ["bug"]],
    ["Tauros", ["Normal"], ["normal"]],
    ["Magikarp", ["Agua"], ["water"]],
    ["Gyarados", ["Agua", "Volador"], ["water", "flying"]],
    ["Lapras", ["Agua", "Hielo"], ["water", "ice"]],
    ["Ditto", ["Normal"], ["normal"]],
    ["Eevee", ["Normal"], ["normal"]],
    ["Vaporeon", ["Agua"], ["water"]],
    ["Jolteon", ["Eléctrico"], ["electric"]],
    ["Flareon", ["Fuego"], ["fire"]],
    ["Porygon", ["Normal"], ["normal"]],
    ["Omanyte", ["Roca", "Agua"], ["rock", "water"]],
    ["Omastar", ["Roca", "Agua"], ["rock", "water"]],
    ["Kabuto", ["Roca", "Agua"], ["rock", "water"]],
    ["Kabutops", ["Roca", "Agua"], ["rock", "water"]],
    ["Aerodactyl", ["Roca", "Volador"], ["rock", "flying"]],
    ["Snorlax", ["Normal"], ["normal"]],
    ["Articuno", ["Hielo", "Volador"], ["ice", "flying"]],
    ["Zapdos", ["Eléctrico", "Volador"], ["electric", "flying"]],
    ["Moltres", ["Fuego", "Volador"], ["fire", "flying"]],
    ["Dratini", ["Dragón"], ["dragon"]],
    ["Dragonair", ["Dragón"], ["dragon"]],
    ["Dragonite", ["Dragón", "Volador"], ["dragon", "flying"]],
    ["Mewtwo", ["Psíquico"], ["psychic"]],
    ["Mew", ["Psíquico"], ["psychic"]]
];

const pokedex = document.getElementById("pokedex");

pokemon.forEach((poke, index) => {
    const numero = index + 1;
    const nombre = poke[0];
    const tipos = poke[1];
    const clases = poke[2];
    const article = document.createElement("article");
    article.className = "pokemon";
    const numeroElemento = document.createElement("div");
    numeroElemento.className = "number";
    numeroElemento.textContent = "#" + String(numero).padStart(3, "0");
    const imageContainer = document.createElement("div");
    imageContainer.className = "image-container";
    const img = document.createElement("img");
    img.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-i/red-blue/transparent/${numero}.png`;
    img.alt = nombre;
    img.loading = "lazy";
    imageContainer.appendChild(img);
    const h3 = document.createElement("h3");
    h3.textContent = nombre;
    const types = document.createElement("div");
    types.className = "types";
    tipos.forEach((tipo, i) => {
        const span = document.createElement("span");
        span.className = `type ${clases[i]}`;
        span.textContent = tipo;
        types.appendChild(span);
    });
    article.appendChild(numeroElemento);
    article.appendChild(imageContainer);
    article.appendChild(h3);
    article.appendChild(types);
    pokedex.appendChild(article);
});
