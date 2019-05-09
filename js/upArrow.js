(function() {
    const link = document.querySelector('a.up');
    const show = function() {
        if (window.scrollY >= 200) {
            link.classList.add('show');
        } else {
            link.classList.remove('show');
        }
    };
    window.addEventListener('scroll', show);
    show();
})();