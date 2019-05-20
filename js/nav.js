(function() {
    const header = document.querySelector('nav a.header');
    header.addEventListener('click', function(e) {
        if (e.offsetX > this.offsetWidth) {
            if (header.parentElement.classList.contains('opened')) {
                header.parentElement.classList.remove('opened');
            } else {
                header.parentElement.classList.add('opened');
            }
            e.preventDefault();
            return false;
        }
    });
})();