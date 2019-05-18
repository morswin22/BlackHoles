(function() {
    const subButton = document.querySelector('#newsletter button');
    const input = document.querySelector('#newsletter input');
    const defaultMessage = input.validationMessage;
    const database = firebase.database();

    subButton.addEventListener("click", function () {
        if (input.classList.contains('revealed')) {
            if (input.value.length == 0) {
                input.setCustomValidity("Please, fill this field with your data");
                input.reportValidity();
                return;
            }
            if (input.checkValidity()) {
                input.parentElement.classList.add('loading');
                input.parentElement.classList.remove('failure');
                input.parentElement.classList.remove('success');
                database.ref('/users/').once('value', function(e){
                    let users = e.exportVal();
                    let ok = true;
                    for (let id in users) {
                        if (users[id].email == input.value) ok = false;
                    }
                    if (ok) {
                        database.ref('/users/').push({email: input.value});
                        input.parentElement.classList.remove('loading');
                        input.parentElement.classList.add('success');
                        // tell that user was accepted
                    } else {
                        input.setCustomValidity("This email address is already subscribed to our newsletter");
                        input.reportValidity();
                        input.parentElement.classList.remove('loading');
                        input.parentElement.classList.add('failure');
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