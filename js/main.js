// Varsayılan içerikler
let services = [], products = [], blogs = [];

// LocalStorage’dan yükle
function loadData(){
  services = JSON.parse(localStorage.getItem('servicesData')||'[]');
  products = JSON.parse(localStorage.getItem('productsData')||'[]');
  blogs = JSON.parse(localStorage.getItem('blogsData')||'[]');
}

// Render fonksiyonu
function renderSection(containerId, items){
  const container=document.getElementById(containerId);
  container.innerHTML='';
  items.forEach((item,index)=>{
    const el=document.createElement('div');
    el.className='card';
    el.innerHTML=`<img src="${item.image}" alt="${item.title}"><h3>${item.title}</h3><p>${item.desc||''}</p>`;
    container.appendChild(el);
  });
}

// Sayfa yüklenince
window.addEventListener('load', ()=>{
  loadData();
  renderSection('services-container', services);
  renderSection('products-container', products);
  renderSection('blog-container', blogs);
});

let heroImages = [
  'images/hero1.png',
  'images/hero2.jpg',
  'images/hero3.jpg',
  'images/hero4.png',
  'images/hero5.png',
  'images/hero6.jpg'
];

let currentHero = 0;

function heroSlide() {
  const hero = document.querySelector('.hero::before'); // pseudo element çalışmaz, onu JS ile değiştiririz
  document.querySelector('.hero').style.backgroundImage = `url(${heroImages[currentHero]})`;
  currentHero = (currentHero + 1) % heroImages.length;
}

window.addEventListener('load', () => {
  heroSlide(); // ilk yüklemede göster
  setInterval(heroSlide, 1500); // 5 saniyede bir değiştir
});
