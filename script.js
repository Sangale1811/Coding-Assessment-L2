async function fetchData() {
  try {
    const response = await fetch(
      "https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json"
    );
    const data = await response.json();
    return data.categories;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

function displayProducts(categoryName) {
  const category = document.getElementById(categoryName);
  const categoryData = categories.find(
    (cat) => cat.category_name.toLowerCase() === categoryName
  );

  if (categoryData) {
    category.innerHTML = "";

    categoryData.category_products.forEach((product, index) => {
      const productHTML = `
    <div class="collection-list">
      <div class="collection-img">
        <img src="${product.image}" alt="${product.title}" />
        ${
          product.badge_text
            ? `<div class="badge">${product.badge_text}</div>`
            : ""
        }
        <div class="product-info">
          <h3>${product.title}</h3>
          <ul class="vendor-info">
          <li>${product.vendor}</li>
      </ul>
      
        </div>
        <div class="price">
          <p class="rs">Rs ${product.price}.00</p>
          <span>${
            product.compare_at_price ? ` ${product.compare_at_price}.00` : ""
          }</span>
          ${product.compare_at_price ? `<p class="off">50% Off</p>` : ""}
        </div>
        <button class="btn">Add to cart</button>
      </div>
    </div>
  `;
      category.insertAdjacentHTML("beforeend", productHTML);
    });
  }
}

function openCategory(event, categoryName) {
  const tabcontent = document.getElementsByClassName("tabcontent");
  for (const tab of tabcontent) {
    tab.classList.remove("active");
  }
  const tablinks = document.getElementsByClassName("tablinks");
  for (const tablink of tablinks) {
    tablink.classList.remove("active");
  }
  document.getElementById(categoryName).classList.add("active");
  event.currentTarget.classList.add("active");

  if (document.getElementById(categoryName).innerHTML.trim() === "") {
    displayProducts(categoryName);
  }
}

let categories;
window.onload = async () => {
  categories = await fetchData();
  displayProducts("men");
};
