(function() {
    const subButton = document.querySelector('#newsletter button');
    const input = document.querySelector('#newsletter input');
    const defaultMessage = input.validationMessage;
    const database = firebase.database();

    subButton.addEventListener("click", function () {
        if (input.className == 'revealed') {
            if (input.value.length == 0) {
                input.setCustomValidity("Please, fill this field with your data");
                input.reportValidity();
                return;
            }
            if (input.checkValidity()) {
                database.ref('/users/').once('value', function(e){
                    let users = e.exportVal();
                    let ok = true;
                    for (let id in users) {
                        if (users[id].email == input.value) ok = false;
                    }
                    if (ok) {
                        database.ref('/users/').push({email: input.value});
                        // tell that user was accepted
                    } else {
                        input.setCustomValidity("This email address is already subscribed to our newsletter");
                        input.reportValidity();
                    }
                });
            } else {
                input.setCustomValidity(defaultMessage);
                input.reportValidity();
            }
        } else {
            input.classList.add('revealed');
            input.focus();
            subButton.innerHTML = 'Submit';
        }
    });

    input.addEventListener("keyup", function(e) {
        if (e.keyCode == 13) {
            subButton.click();
        }
    });
})();