(function(){
    const images = document.querySelectorAll('figure img');
    let toHighlight = null;
    let highlighted = null;
    let stayHighlighted = false;
    let heightKeeper = null;
    for (let image of images) {
        image.addEventListener('click', function() {
            if (highlighted != this) {
                toHighlight = this;
            } else {
                stayHighlighted = true;
            }
        });
    }
    document.addEventListener('click', function() {
        if (toHighlight) {
            if (toHighlight != highlighted) {
                if (highlighted) {
                    highlighted.classList.remove('highlighted');
                    heightKeeper.remove();
                    heightKeeper = null;
                }
        
                heightKeeper = document.createElement('div');
                heightKeeper.style.height = toHighlight.height + "px";
                heightKeeper.style.marginBottom = '1.25em';
                heightKeeper.style.backgroundImage = 'url("'+toHighlight.src+'")';
                heightKeeper.style.backgroundSize = 'contain';
                heightKeeper.style.transition = 'filter 200ms ease';
                heightKeeper.style.filter = 'blur(1px)';
                setTimeout(function() {
                    heightKeeper.style.filter = 'blur(10px)';
                },0);
                // heightKeeper.style.filter = 'blur(0px)';
                toHighlight.insertAdjacentElement('afterend', heightKeeper);

                toHighlight.classList.add('highlighted');
                highlighted = toHighlight;
                toHighlight = null;
            }
        } else if (!stayHighlighted) {
            if (highlighted) {
                highlighted.classList.remove('highlighted');
                heightKeeper.remove();
                heightKeeper = null;
            }
            highlighted = null;
        }
        stayHighlighted = false;
    });
})();