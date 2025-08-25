const adminPassword = "12345";
const adminToggle=document.getElementById('admin-toggle');
const adminPanel=document.getElementById('admin-panel');
const heroTitle=document.getElementById('hero-title');
const heroDesc=document.getElementById('hero-desc');

let currentTab='services';

adminToggle.addEventListener('click', ()=>{
  const pwd=prompt("Admin şifresini girin:");
  if(pwd===adminPassword){
    adminPanel.classList.toggle('show');
    if(adminPanel.classList.contains('show')) loadAdminPanel();
  }else alert("Yanlış şifre!");
});

// Admin panel yükle
function loadAdminPanel(){
  adminPanel.innerHTML=`
    <h3>Admin Panel</h3>
    <label>Hero Başlık:<input type="text" id="admin-hero-title" value="${heroTitle.innerText}"></label>
    <label>Hero Açıklama:<input type="text" id="admin-hero-desc" value="${heroDesc.innerText}"></label>
    <div class="admin-tabs">
      <button class="tab-btn active" data-tab="services">Hizmetler</button>
      <button class="tab-btn" data-tab="products">Ürünler</button>
      <button class="tab-btn" data-tab="blogs">Blog</button>
    </div>
    <div id="admin-content"></div>
  `;

  document.getElementById('admin-hero-title').addEventListener('input', e=>{ heroTitle.innerText=e.target.value; });
  document.getElementById('admin-hero-desc').addEventListener('input', e=>{ heroDesc.innerText=e.target.value; });

  document.querySelectorAll('.tab-btn').forEach(btn=>{
    btn.addEventListener('click', e=>{
      document.querySelectorAll('.tab-btn').forEach(b=>b.classList.remove('active'));
      e.target.classList.add('active');
      currentTab=e.target.dataset.tab;
      renderAdminContent();
    });
  });

  renderAdminContent();
}

// Admin içerik render
function renderAdminContent(){
  const content=document.getElementById('admin-content');
  content.innerHTML='';
  const data=currentTab==='services'?services:currentTab==='products'?products:blogs;

  // Liste
  data.forEach((item,index)=>{
    const el=document.createElement('div');
    el.className='admin-item';
    el.innerHTML=`<img src="${item.image}"><div>${item.title}</div>
      <button class="edit-btn">Düzenle</button>
      <button class="delete-btn">Sil</button>`;
    content.appendChild(el);

    // Sil
    el.querySelector('.delete-btn').addEventListener('click', ()=>{
      data.splice(index,1);
      saveData();
      renderAdminContent();
      renderAllSections();
    });

    // Düzenle
    el.querySelector('.edit-btn').addEventListener('click', ()=>{
      const newTitle=prompt("Başlık:",item.title);
      const newDesc=prompt("Açıklama:",item.desc||"");
      const newImage=prompt("Resim URL veya base64:",item.image);
      if(newTitle && newImage){
        item.title=newTitle;
        item.desc=newDesc;
        item.image=newImage;
        saveData();
        renderAdminContent();
        renderAllSections();
      }
    });
  });

  // Yeni ekleme
  const addBtn=document.createElement('button');
  addBtn.textContent="Yeni Ekle";
  addBtn.addEventListener('click', ()=>{
    const title=prompt("Başlık:");
    const desc=prompt("Açıklama:");
    const imageInput=document.createElement('input');
    imageInput.type='file';
    imageInput.addEventListener('change', e=>{
      const reader=new FileReader();
      reader.onload=function(evt){
        const imgData=evt.target.result;
        if(title && imgData){
          data.push({title,desc,image:imgData});
          saveData();
          renderAdminContent();
          renderAllSections();
        }
      }
      reader.readAsDataURL(e.target.files[0]);
    });
    imageInput.click();
  });
  content.appendChild(addBtn);
}

// LocalStorage kaydet
function saveData(){
  localStorage.setItem('servicesData',JSON.stringify(services));
  localStorage.setItem('productsData',JSON.stringify(products));
  localStorage.setItem('blogsData',JSON.stringify(blogs));
}

// Tüm bölümleri render et
function renderAllSections(){
  renderSection('services-container',services);
  renderSection('products-container',products);
  renderSection('blog-container',blogs);
}
