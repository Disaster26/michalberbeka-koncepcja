(function(){
  var top=document.getElementById('top'),bg=document.getElementById('burger');
  function zamknij(){top.classList.remove('open');bg.setAttribute('aria-expanded','false');bg.setAttribute('aria-label','Otwórz menu');document.body.style.overflow=''}
  bg.addEventListener('click',function(){var o=top.classList.toggle('open');bg.setAttribute('aria-expanded',o);bg.setAttribute('aria-label',o?'Zamknij menu':'Otwórz menu');document.body.style.overflow=o?'hidden':''});
  document.querySelectorAll('.menu a').forEach(function(a){a.addEventListener('click',zamknij)});
  var tk=false;function sc(){if(tk)return;tk=true;requestAnimationFrame(function(){top.classList.toggle('sc',window.pageYOffset>8);tk=false})}addEventListener('scroll',sc,{passive:true});
  var links=[].slice.call(document.querySelectorAll('.menu a[href^="#"]:not(.btn)'));
  var mob=document.getElementById('mob'),cta=document.getElementById('hero-cta');
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){links.forEach(function(l){l.classList.toggle('on',l.getAttribute('href')==='#'+e.target.id)})}})},{rootMargin:'-45% 0px -50% 0px'});
    links.forEach(function(l){var t=document.querySelector(l.getAttribute('href'));if(t)io.observe(t)});io.observe(document.getElementById('start'));
    var poCta=false,przyForm=false;function mb(){mob.classList.toggle('widac',poCta&&!przyForm)}
    new IntersectionObserver(function(es){es.forEach(function(e){poCta=!e.isIntersecting&&e.boundingClientRect.top<0;mb()})}).observe(cta);
    new IntersectionObserver(function(es){es.forEach(function(e){przyForm=e.isIntersecting;mb()})},{threshold:.15}).observe(document.getElementById('form'));
    var m=document.getElementById('mapa');
    var mo=new IntersectionObserver(function(es){if(es[0].isIntersecting){var f=document.createElement('iframe');f.src=m.dataset.src;f.title='Mapa: Nysa';f.loading='lazy';f.referrerPolicy='no-referrer-when-downgrade';m.appendChild(f);mo.disconnect()}},{rootMargin:'300px'});mo.observe(m);
  }
  document.querySelectorAll('[data-tor]').forEach(function(tor){
    var down=false,sx=0,sl=0,moved=false;
    function step(){var k=tor.children[0];return k?k.getBoundingClientRect().width+parseFloat(getComputedStyle(tor).columnGap||0):300}
    tor.addEventListener('pointerdown',function(e){if(e.pointerType!=='mouse'||tor.scrollWidth<=tor.clientWidth+2)return;down=true;moved=false;sx=e.clientX;sl=tor.scrollLeft});
    addEventListener('pointermove',function(e){if(!down)return;var dx=e.clientX-sx;if(Math.abs(dx)>4){moved=true;tor.classList.add('drag')}tor.scrollLeft=sl-dx});
    addEventListener('pointerup',function(){if(!down)return;down=false;tor.classList.remove('drag');if(moved){var w=step();tor.scrollTo({left:Math.round(tor.scrollLeft/w)*w,behavior:'smooth'})}});
    tor.addEventListener('click',function(e){if(moved){e.preventDefault();e.stopPropagation();moved=false}},true);
    tor.addEventListener('dragstart',function(e){e.preventDefault()});
    var nav=document.querySelector('[data-nav="'+tor.id+'"]');
    function upd(){if(!nav)return;nav.style.visibility=tor.scrollWidth>tor.clientWidth+2?'visible':'hidden'}
    if(nav)nav.querySelectorAll('button').forEach(function(b){b.addEventListener('click',function(){tor.scrollBy({left:step()*(+b.dataset.k),behavior:'smooth'})})});
    addEventListener('load',function(){requestAnimationFrame(upd)});addEventListener('resize',upd);upd();
  });
  /* lightbox */
  var lb=document.getElementById('lb'),li=lb.querySelector('img'),lc=lb.querySelector('.lc'),bp=lb.querySelector('.p'),bn=lb.querySelector('.n'),grp=[],ix=0,ost=null;
  function pokaz(){var b=grp[ix];li.src=b.dataset.src;li.alt=b.querySelector('img').alt;lc.textContent=b.dataset.cap+(grp.length>1?'  ('+(ix+1)+'/'+grp.length+')':'');bp.hidden=bn.hidden=grp.length<2}
  function zl(){if(!lb.classList.contains('on'))return;lb.classList.remove('on');document.body.style.overflow='';if(ost)ost.focus()}
  document.querySelectorAll('button[data-src]').forEach(function(b){b.addEventListener('click',function(){var box=b.parentElement.closest('[data-lb]');grp=box?[].slice.call(box.querySelectorAll('button[data-src]')):[b];ix=grp.indexOf(b);ost=b;pokaz();lb.classList.add('on');document.body.style.overflow='hidden';lb.querySelector('.x').focus()})});
  lb.querySelector('.x').addEventListener('click',zl);
  lb.addEventListener('click',function(e){if(e.target===lb)zl()});
  bp.addEventListener('click',function(){ix=(ix-1+grp.length)%grp.length;pokaz()});
  bn.addEventListener('click',function(){ix=(ix+1)%grp.length;pokaz()});
  document.addEventListener('keydown',function(e){if(e.key==='Escape'){zamknij();zl()}if(!lb.classList.contains('on')||grp.length<2)return;if(e.key==='ArrowLeft')bp.click();if(e.key==='ArrowRight')bn.click()});
  var tx0=0;lb.addEventListener('touchstart',function(e){tx0=e.touches[0].clientX},{passive:true});lb.addEventListener('touchend',function(e){var d=e.changedTouches[0].clientX-tx0;if(Math.abs(d)>50&&grp.length>1)(d<0?bn:bp).click()});
  /* formularz pokazowy */
  var f=document.getElementById('form'),msg=document.getElementById('msg'),pl=document.getElementById('f-plik'),lista=document.getElementById('f-lista');
  pl.addEventListener('change',function(){lista.textContent=[].map.call(pl.files,function(x){return x.name}).join(', ')});
  f.addEventListener('submit',function(e){e.preventDefault();var ok=true;[].forEach.call(f.querySelectorAll('[required]'),function(i){var v=i.type==='checkbox'?(i.checked?'1':''):i.value.trim();var bad=!v||(i.type==='email'&&!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v));i.setAttribute('aria-invalid',bad);if(bad&&ok){ok=false;i.focus()}});if(!ok)return;msg.hidden=false;f.reset();lista.textContent='';msg.scrollIntoView({block:'nearest',behavior:'smooth'})});
  var r=document.getElementById('rok');if(r)r.textContent=new Date().getFullYear();
})();
