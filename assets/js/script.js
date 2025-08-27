'use strict';

// modal variables
const modal = document.querySelector('[data-modal]');
const modalCloseBtn = document.querySelector('[data-modal-close]');
const modalCloseOverlay = document.querySelector('[data-modal-overlay]');

// modal function
const modalCloseFunc = function () { modal.classList.add('closed') }

// modal eventListener
modalCloseOverlay.addEventListener('click', modalCloseFunc);
modalCloseBtn.addEventListener('click', modalCloseFunc);





// notification toast variables
const notificationToast = document.querySelector('[data-toast]');
const toastCloseBtn = document.querySelector('[data-toast-close]');

// notification toast eventListener
toastCloseBtn.addEventListener('click', function () {
  notificationToast.classList.add('closed');
});





// mobile menu variables
const mobileMenuOpenBtn = document.querySelectorAll('[data-mobile-menu-open-btn]');
const mobileMenu = document.querySelectorAll('[data-mobile-menu]');
const mobileMenuCloseBtn = document.querySelectorAll('[data-mobile-menu-close-btn]');
const overlay = document.querySelector('[data-overlay]');

for (let i = 0; i < mobileMenuOpenBtn.length; i++) {

  // mobile menu function
  const mobileMenuCloseFunc = function () {
    mobileMenu[i].classList.remove('active');
    overlay.classList.remove('active');
  }

  mobileMenuOpenBtn[i].addEventListener('click', function () {
    mobileMenu[i].classList.add('active');
    overlay.classList.add('active');
  });

  mobileMenuCloseBtn[i].addEventListener('click', mobileMenuCloseFunc);
  overlay.addEventListener('click', mobileMenuCloseFunc);

}





// accordion variables
const accordionBtn = document.querySelectorAll('[data-accordion-btn]');
const accordion = document.querySelectorAll('[data-accordion]');

for (let i = 0; i < accordionBtn.length; i++) {

  accordionBtn[i].addEventListener('click', function () {

    const clickedBtn = this.nextElementSibling.classList.contains('active');

    for (let i = 0; i < accordion.length; i++) {

      if (clickedBtn) break;

      if (accordion[i].classList.contains('active')) {

        accordion[i].classList.remove('active');
        accordionBtn[i].classList.remove('active');

      }

    }

    this.nextElementSibling.classList.toggle('active');
    this.classList.toggle('active');

  });

}

// Cart and Wishlist functionality
const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
const addToWishlistButtons = document.querySelectorAll('.add-to-wishlist-btn');

const cartCounters = document.querySelectorAll('.mobile-bottom-navigation .action-btn:nth-child(2) .count, .header-user-actions .action-btn:nth-child(3) .count');
const wishlistCounters = document.querySelectorAll('.mobile-bottom-navigation .action-btn:nth-child(4) .count, .header-user-actions .action-btn:nth-child(2) .count');

let cartCount = 0;
let wishlistCount = 0;

const updateCartCounter = () => {
  cartCounters.forEach(counter => {
    counter.textContent = cartCount;
  });
};

const updateWishlistCounter = () => {
  wishlistCounters.forEach(counter => {
    counter.textContent = wishlistCount;
  });
};

const showToast = (message) => {
  const toastContainer = document.body;
  const toast = document.createElement('div');
  toast.className = 'notification-toast';
  toast.style.position = 'fixed';
  toast.style.bottom = '20px';
  toast.style.right = '20px';
  toast.style.backgroundColor = 'var(--primary)';
  toast.style.color = 'var(--white)';
  toast.style.padding = '15px 20px';
  toast.style.borderRadius = 'var(--border-radius-md)';
  toast.style.boxShadow = '0 5px 10px hsla(0, 0%, 0%, 0.1)';
  toast.style.zIndex = '25';
  toast.style.transition = 'all 0.5s ease';
  toast.style.opacity = '0';
  toast.style.visibility = 'hidden';
  toast.style.transform = 'translateY(20px)';

  toast.innerHTML = `<p class="toast-message" style="margin: 0;">${message}</p>`;
  
  toastContainer.appendChild(toast);

  // Animate in
  setTimeout(() => {
    toast.style.opacity = '1';
    toast.style.visibility = 'visible';
    toast.style.transform = 'translateY(0)';
  }, 100);

  // Animate out and remove
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.visibility = 'hidden';
    toast.style.transform = 'translateY(20px)';
    setTimeout(() => {
      toast.remove();
    }, 500);
  }, 3000);
};

if (addToCartButtons) {
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            cartCount++;
            updateCartCounter();
            showToast('Product added to cart!');
        });
    });
}

if (addToWishlistButtons) {
    addToWishlistButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const icon = button.querySelector('ion-icon');
            if (icon.getAttribute('name') === 'heart-outline') {
            icon.setAttribute('name', 'heart');
            icon.style.color = 'var(--accent)';
            wishlistCount++;
            updateWishlistCounter();
            showToast('Added to wishlist!');
            } else {
            icon.setAttribute('name', 'heart-outline');
            icon.style.color = 'inherit';
            wishlistCount--;
            updateWishlistCounter();
            showToast('Removed from wishlist.');
            }
        });
    });
}


// Filter and Search functionality
const filterLinks = document.querySelectorAll('.sidebar-submenu-title');
const productGrid = document.querySelector('.product-grid');
const allProducts = productGrid ? Array.from(productGrid.querySelectorAll('.showcase')) : [];
const searchField = document.querySelector('.search-field');
const searchButton = document.querySelector('.search-btn');

const filterProducts = (category) => {
  allProducts.forEach(product => {
    const productCategory = product.querySelector('.showcase-category').textContent.trim().toLowerCase();
    const filterCategory = category.trim().toLowerCase();

    if (filterCategory === 'all' || productCategory === filterCategory) {
      product.style.display = 'block';
    } else {
      product.style.display = 'none';
    }
  });
};

const searchProducts = (searchTerm) => {
  const term = searchTerm.trim().toLowerCase();
  allProducts.forEach(product => {
    const productTitle = product.querySelector('.showcase-title').textContent.trim().toLowerCase();
    if (productTitle.includes(term)) {
      product.style.display = 'block';
    } else {
      product.style.display = 'none';
    }
  });
};

if (filterLinks) {
    filterLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const category = link.querySelector('.product-name').textContent;
            filterProducts(category);
        });
    });
}

if (searchButton) {
    searchButton.addEventListener('click', (e) => {
        e.preventDefault();
        searchProducts(searchField.value);
    });
}

if (searchField) {
    searchField.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
            searchProducts(searchField.value);
        }
        if (searchField.value.length === 0) {
            filterProducts('all');
        }
    });
}

const sidebarCategoryList = document.querySelector('.sidebar-category .sidebar-menu-category-list');
if (sidebarCategoryList) {
  const showAllLi = document.createElement('li');
  showAllLi.className = 'sidebar-menu-category';
  showAllLi.innerHTML = `<a href="#" class="sidebar-submenu-title" id="show-all-products" style="padding: 2px 0; display: block;"><p class="product-name" style="text-transform: capitalize;">Show All</p></a>`;
  sidebarCategoryList.insertAdjacentElement('afterbegin', showAllLi);
  
  const showAllButton = document.querySelector('#show-all-products');
  if (showAllButton) {
    showAllButton.addEventListener('click', (e) => {
        e.preventDefault();
        filterProducts('all');
    });
  }
}

// Newsletter subscription
const newsletterForm = document.querySelector('.newsletter form');
const newsletterContainer = document.querySelector('.newsletter');

if (newsletterForm) {
  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const emailField = newsletterForm.querySelector('.email-field');
    if (emailField && emailField.value) {
      newsletterContainer.innerHTML = `
        <div class="newsletter-header">
          <h3 class="newsletter-title">Thank You!</h3>
          <p class="newsletter-desc">You have successfully subscribed to our newsletter.</p>
        </div>
      `;
    }
  });
}
