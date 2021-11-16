//Contentful
const client = contentful.createClient({
	space: "2imdgvtwfj4o",
	accessToken: "p8CzPxkV--xG2FT22ceTx6Myeflq9wiqUzdrmmjlGqU"
});
//RestDB
const APIKEY = '6028a9575ad3610fb5bb5fe3';
const APIKEY2 = '617ffebf63fbb2763ab02509'
console.log(client);
// variables
const cartBtn = document.querySelector(".cart-btn");
const closeCartBtn = document.querySelector(".close-cart");
const checkoutCartBtn = document.querySelector(".checkout-cart");
const userPoints = document.querySelector(".cart-totalpoint");
const cartDOM = document.querySelector(".cart");
const cartOverlay = document.querySelector(".cart-overlay");
const cartItems = document.querySelector(".cart-items");
const cartTotal = document.querySelector(".cart-total");
const cartPoint = document.querySelector(".cart-point");
const cartContent = document.querySelector(".cart-content");
const productsDOM = document.querySelector(".products-center");
let cart = [];
let totalPoints = 0;
if (parseFloat(localStorage['points']) > 0) {
	totalPoints = parseFloat(localStorage['points']);
}
let pointEarned = 0;

//* ---------------------- Retrieve Account Details ---------------------- *//
var loginStatus = sessionStorage.getItem("loginStatus");

//* ---------------------- shop.html JS ---------------------- *//
class Products {
	async getProducts() {
		try {
			let contentful = await client.getEntries({
				content_type: "shopificationProducts"
			});
			let products = contentful.items;
			products = products.map(item => {
				const {
					title,
					price
				} = item.fields;
				const {
					id
				} = item.sys;
				const image = item.fields.image.fields.file.url;
				return {
					title,
					price,
					id,
					image
				};
			});
			console.log(products);
			return products;
		} catch (error) {
			console.log(error);
		}
	}
}
// ui
class UI {
	displayProducts(products) {
		let result = "";
		products.forEach(product => {
			result += `
            <!-- single product -->
                <article class="product">
                <div class="img-container">
                    <img
                    src=${product.image}
                    alt="product"
                    class="product-img"
                    />
                    <button class="bag-btn" data-id=${product.id}>
                    <i class="fa fa-shopping-cart"></i>
                    add to bag
                    </button>
                </div>
                <h3>${product.title}</h3>
                <h4>$${product.price}</h4>
                </article>
                <!-- end of single product -->
            `;
		});
		try {
			productsDOM.innerHTML = result;
		} catch {
			console.log("This page isn't the product page, product script will not be executed.");
		}
	}
	getBagButtons() {
		const buttons = [...document.querySelectorAll(".bag-btn")];
		buttons.forEach(button => {
			let id = button.dataset.id;
			let inCart = cart.find(item => item.id === id);
			if (inCart) {
				button.innerText = "In Cart";
				button.disabled = true;
			} else {
				button.addEventListener("click", event => {
					// disable button
					event.target.innerText = "In Bag";
					event.target.disabled = true;
					// add to cart
					let cartItem = {
						...Storage.getProduct(id),
						amount: 1
					};
					cart = [...cart, cartItem];
					Storage.saveCart(cart);
					// add to DOM
					this.setCartValues(cart);
					this.addCartItem(cartItem);
					this.showCart();
				});
			}
		});
	}
	setCartValues(cart) {
		let tempTotal = 0;
		let itemsTotal = 0;
		let pointTotal = 0;
		cart.map(item => {
			tempTotal += item.price * item.amount;
			itemsTotal += item.amount;
			pointTotal += tempTotal * 0.15;
			pointEarned = pointTotal;
		});
		cartTotal.innerText = parseFloat(tempTotal.toFixed(2));
		cartPoint.innerHTML = parseFloat(pointTotal.toFixed(0));
		if (isNaN(parseFloat(localStorage['points']))) {
			userPoints.innerHTML = 0;
		} else {
			userPoints.innerHTML = parseFloat(localStorage['points']);
		}
		cartItems.innerText = itemsTotal;
	}
	addCartItem(item) {
		const div = document.createElement("div");
		div.classList.add("cart-item");
		div.innerHTML = `<!-- cart item -->
            <!-- item image -->
            <img src=${item.image} alt="product" />
            <!-- item info -->
            <div>
            <h4>${item.title}</h4>
            <h5>$${item.price}</h5>
            <span class="remove-item" data-id=${item.id}>remove</span>
            </div>
            <!-- item functionality -->
            <div>
                <i class="fa fa-chevron-up" data-id=${item.id}></i>
            <p class="item-amount">
                ${item.amount}
            </p>
                <i class="fa fa-chevron-down" data-id=${item.id}></i>
            </div>
        <!-- cart item -->
    `;
		cartContent.appendChild(div);
	}
	showCart() {
		cartOverlay.classList.add("transparentBcg");
		cartDOM.classList.add("showCart");
	}
	setupAPP() {
		cart = Storage.getCart();
		this.setCartValues(cart);
		this.populateCart(cart);
		cartBtn.addEventListener("click", this.showCart);
		closeCartBtn.addEventListener("click", this.hideCart);
	}
	populateCart(cart) {
		cart.forEach(item => this.addCartItem(item));
	}
	hideCart() {
		cartOverlay.classList.remove("transparentBcg");
		cartDOM.classList.remove("showCart");
	}
	cartLogic() {
		checkoutCartBtn.addEventListener("click", () => {
			this.checkOutCart();
		});
		cartContent.addEventListener("click", event => {
			if (event.target.classList.contains("remove-item")) {
				let removeItem = event.target;
				let id = removeItem.dataset.id;
				cart = cart.filter(item => item.id !== id);
				console.log(cart);
				this.setCartValues(cart);
				Storage.saveCart(cart);
				cartContent.removeChild(removeItem.parentElement.parentElement);
				const buttons = [...document.querySelectorAll(".bag-btn")];
				buttons.forEach(button => {
					if (parseInt(button.dataset.id) === id) {
						button.disabled = false;
						button.innerHTML = `<i class="fa fa-shopping-cart"></i>add to bag`;
					}
				});
			} else if (event.target.classList.contains("fa-chevron-up")) {
				let addAmount = event.target;
				let id = addAmount.dataset.id;
				let tempItem = cart.find(item => item.id === id);
				tempItem.amount = tempItem.amount + 1;
				Storage.saveCart(cart);
				this.setCartValues(cart);
				addAmount.nextElementSibling.innerText = tempItem.amount;
			} else if (event.target.classList.contains("fa-chevron-down")) {
				let lowerAmount = event.target;
				let id = lowerAmount.dataset.id;
				let tempItem = cart.find(item => item.id === id);
				tempItem.amount = tempItem.amount - 1;
				if (tempItem.amount > 0) {
					Storage.saveCart(cart);
					this.setCartValues(cart);
					lowerAmount.previousElementSibling.innerText = tempItem.amount;
				} else {
					cart = cart.filter(item => item.id !== id);
					// console.log(cart);
					this.setCartValues(cart);
					Storage.saveCart(cart);
					cartContent.removeChild(lowerAmount.parentElement.parentElement);
					const buttons = [...document.querySelectorAll(".bag-btn")];
					buttons.forEach(button => {
						if (parseInt(button.dataset.id) === id) {
							button.disabled = false;
							button.innerHTML = `<i class="fa fa-shopping-cart"></i>add to bag`;
						}
					});
				}
			}
		});
	}
	checkOutCart() {
		// console.log(this);
		cart = [];
		this.setCartValues(cart);
		Storage.saveCart(cart, totalPoints);
		if (cartContent.children.length < 1 || cartContent.children.length == undefined) {
			alert("There are no item in cart.")
		} else {
			alert("Order has been placed! You've earned " + pointEarned.toFixed(0) + " points.");
			totalPoints += pointEarned;
			userPoints.innerHTML = parseFloat(totalPoints.toFixed(0));
			Storage.savePoint(cart, totalPoints.toFixed(0));
		}
		const buttons = [...document.querySelectorAll(".bag-btn")];
		buttons.forEach(button => {
			button.disabled = false;
			button.innerHTML = `<i class="fa fa-shopping-cart"></i>add to bag`;
		});
		while (cartContent.children.length > 0) {
			cartContent.removeChild(cartContent.children[0]);
		}
		this.hideCart();
	}
}
class Storage {
	static saveProducts(products) {
		localStorage.setItem("products", JSON.stringify(products));
	}
	static getProduct(id) {
		let products = JSON.parse(localStorage.getItem("products"));
		return products.find(product => product.id === id);
	}
	static saveCart(cart) {
		localStorage.setItem("cart", JSON.stringify(cart));

		let userId = sessionStorage.getItem("userId");
		let username = sessionStorage.getItem("username");
		let password = sessionStorage.getItem("password");

		/* ------------------- Add to cart database if logged in ------------------- */
		if(loginStatus == "loggedIn"){
			let jsondata = {
                "username": username,
                "password": password,
				"cart": JSON.stringify(cart),
            };
			console.log(userId);

			var settings = {
				"async": true,
			"crossDomain": true,
			"url": `https://savetheearth-c589.restdb.io/rest/registered-accounts/${userId}`,
			"method": "PUT",
			"headers": {
				"content-type": "application/json",
				"x-apikey": APIKEY2,
				"cache-control": "no-cache"
			},
			"processData": false,
			"data": JSON.stringify(jsondata)
			}

			$.ajax(settings).done(function (response) {
				console.log("test1");
				console.log(response);
			});
		}
	}
	static getCart() {
		if(loginStatus == "loggedIn" && sessionStorage.getItem("cart").length != 0){
			return JSON.parse(sessionStorage.getItem("cart"));
		}
		else{
			return localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [];
		}
	}
	static savePoint(cart, totalPoints) {
		console.log(cart);

		localStorage.setItem("cart", JSON.stringify(cart));
		
	}
}
document.addEventListener("DOMContentLoaded", () => {
	const ui = new UI();
	const products = new Products();
	ui.setupAPP();
	// get all products
	products.getProducts().then(products => {
		ui.displayProducts(products);
		Storage.saveProducts(products);
	}).then(() => {
		ui.getBagButtons();
		ui.cartLogic();
	});
});
//* ---------------------- end of shop.html JS ---------------------- *//

//* ---------------------- loading JS ---------------------- *//
/**setTimeout(function () {
	document.getElementById("lottie-loading-container").style.display = "none"
}, 3000);**/
//* ---------------------- end of loading JS ---------------------- *//