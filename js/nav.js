/* Nines Media — standard header behaviour */
(function () {
  var nav = document.querySelector('.nm-nav');
  if (!nav) return;
  var burger = nav.querySelector('.nm-burger');
  var menu = document.querySelector('.nm-mobile');
  // The homepage's main.js already toggles the menu; don't double-bind there.
  var mainJs = document.querySelector('script[src*="main.js"]');
  if (burger && menu && !mainJs) {
    burger.addEventListener('click', function () {
      var open = menu.classList.toggle('open');
      burger.classList.toggle('open', open);
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    menu.addEventListener('click', function (e) {
      if (e.target.closest('a')) { menu.classList.remove('open'); burger.classList.remove('open'); }
    });
  }
  if (!nav.classList.contains('nm-flow')) {
    var onScroll = function () { nav.classList.toggle('scrolled', window.scrollY > 20); };
    window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
  }
})();
