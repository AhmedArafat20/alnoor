/* ===== ضع هنا رابط اللوجو الخاص بك =====
   مثال عند رفع الموقع على استضافتك: "logo.png"
   أو ضع الصورة كـ data URI (base64).
   اتركه فارغاً ليظهر الشعار المؤقت. */
var LOGO_SRC = "\logo.jpeg";

/* ===== صور الأعمال: img1 إلى img10 =====
   ضع الصور بجانب ملف الموقع بالأسماء img1.jpg ... img10.jpg
   غيّر الامتداد هنا إذا كانت صورك png أو webp */
var IMG_EXT = "jpg";
var IMG_COUNT = 10;

(function(){
  if(LOGO_SRC){
    var h='<img src="'+LOGO_SRC+'" alt="شعار شركة النور">';
    document.getElementById('logoLink').innerHTML=h;
    document.getElementById('flogo').innerHTML=h;
  }
  var gal=document.getElementById('gal'),lb=document.getElementById('lb'),lbi=document.getElementById('lbi');
  for(var i=1;i<=IMG_COUNT;i++){(function(n){
    var src='img'+n+'.'+IMG_EXT;
    var b=document.createElement('button');b.type='button';b.setAttribute('aria-label','عرض الصورة '+n);
    var ph=document.createElement('div');ph.className='ph';ph.textContent='img'+n;
    var im=new Image();im.alt='من أعمال شركة النور '+n;im.loading='lazy';
    im.onload=function(){ph.remove()};
    im.onerror=function(){im.remove()};
    im.src=src;
    b.appendChild(ph);b.appendChild(im);
    b.addEventListener('click',function(){if(!im.parentNode)return;lbi.src=src;lbi.alt=im.alt;lb.classList.add('on')});
    gal.appendChild(b);
  })(i)}
  lb.addEventListener('click',function(){lb.classList.remove('on')});
  document.addEventListener('keydown',function(e){if(e.key==='Escape')lb.classList.remove('on')});

  var pages=['home','about','contact'];
  function show(){
    var h=(location.hash||'#home').slice(1);
    if(pages.indexOf(h)<0)h='home';
    pages.forEach(function(p){document.getElementById(p).classList.toggle('on',p===h)});
    document.querySelectorAll('nav a').forEach(function(a){a.classList.toggle('on',a.dataset.p===h)});
    window.scrollTo(0,0);
  }
  var mb=document.getElementById('menuBtn'),nv=document.getElementById('nav');
  function closeMenu(){nv.classList.remove('open');mb.setAttribute('aria-expanded','false')}
  mb.addEventListener('click',function(){var o=nv.classList.toggle('open');mb.setAttribute('aria-expanded',o?'true':'false')});
  nv.addEventListener('click',function(e){if(e.target.tagName==='A')closeMenu()});
  window.addEventListener('hashchange',function(){closeMenu();show()});
  show();
  document.getElementById('y').textContent=new Date().getFullYear();
  document.getElementById('f').addEventListener('submit',function(e){
    e.preventDefault();
    var d=new FormData(e.target);
    var t='السلام عليكم، أريد طلب خدمة من شركة النور\nالاسم: '+d.get('n')+'\nالجوال: '+d.get('p')+'\nالخدمة: '+d.get('s')+'\nالتفاصيل: '+(d.get('m')||'-');
    window.open('https://wa.me/966542929193?text='+encodeURIComponent(t),'_blank');
  });
})();
