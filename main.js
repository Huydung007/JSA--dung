init()

function init() {
    getProductAPI()
}

async function getProductAPI() {
    let data = await fetch('data.json')
        .then(response => response.json())
        .then(json => json)
    console.log(data)
    loadProducts(data)
}

let product_area = document.getElementById("product-area")

function loadProducts(data) {
    for (let i = 0; i < data.length; i++) {
        let output = `
        <div class="card" style="width: 18rem; margin: 20px;">
            <img src="${data[i].image}" alt="..." width="100%">
            <div class="card-body">
                <h6 class="card-title">${data[i].name}</h6>
                <h5><span class="product-price">${data[i].price}đ</span></h5>
                <button class="btn btn-primary" onclick="addProduct(event)">Mua ngay!</button>
            </div>
        </div>`
        product_area.innerHTML += output
    }
}

function searchProduct() {
    let search_input = document.getElementById("searchbar").value
    search_input = search_input.toLowerCase()
    let product_titles = document.getElementsByClassName("card-title") // array
    let products = document.getElementsByClassName("card")

    for (let i = 0; i < products.length; i++) {
        // let title = product_titles[i].toUpperCase()
        if (product_titles[i].innerText.toLowerCase().includes(search_input)) {
            products[i].style.display = 'block'
        }
        else {
            products[i].style.display = 'none'
        }
    }
}

let id = 0
let total = 0
let cartbody = document.getElementById("cart-body")
let cartTotal = document.getElementById("total-price")

let cartBtn = document.getElementById("cart-btn")
let cartWrapper = document.getElementById("cart-wrapper")
cartBtn.addEventListener("click", () => {
    cartWrapper.classList.toggle("cart-on")
})

let addProduct = (event) => {
    let name = event.target.parentElement.childNodes[0].innerText
    let price = event.target.parentElement.childNodes[1].innerText
    id += 1
    total += parseInt(price)
    let output = `<tr>
        <td>${id}</td>
        <td>${name}</td>
        <td>${price}</td>
    </tr>`
    cartbody.innerHTML += output
    cartTotal.innerHTML = total
}

let users = []

function register() {
    // khai báo dom lấy dữ liệu nhập vào
    let username = document.getElementById('username').value
    let email = document.getElementById('email').value
    let pw = document.getElementById('pw').value
    let confirmed_pw = document.getElementById('confirmed-pw').value

    // tạo object chứa dữ liệu nhập vào
    let user = {
        name: username,
        email: email,
        pw: pw,
        confirmed_pw: confirmed_pw
    }
    // push object user vaof trong array
    users.push(user)
    // chuyển đổi object thành JSON string và lưu lên local Storage

    localStorage.setItem("users", JSON.stringify(users))

    // xóa thông tin đã nhập
    // document.getElementById('fname-input').value = ""
    // document.getElementById('lname-input').value = ""
    // document.getElementById('email-input').value = ""
    // document.getElementById('password-input').value = ""
}

function checkInputVAlue(value1, value2) {
    if (value1 == value2) {
        return true
    }
    return false
}

function login() {
    let email_input = document.getElementById('login-email-input').value
    let password_input = document.getElementById('login-password-input').value
    let userStorage = JSON.parse(localStorage.getItem('users'))

    for (let i = 0; i < userStorage.length; i++) {
        if (checkInputVAlue(email_input, userStorage[i].email)) {
            if (checkInputVAlue(password_input, userStorage[i].password)) {
                alert('Đăng nhập thành công!')
                return
            } else {
                alert('vui lòng nhập đúng mật khẩu')
                return
            }
        } else {
            alert('Không tìm thấy địa chỉ email')
            return
        }
    }
}