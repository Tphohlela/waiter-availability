document.addEventListener('DOMContentLoaded', function () {
    let successMsgElem = document.querySelector('.success');

    if (successMsgElem.innerHTML !== '') {
        setTimeout(function () {
            successMsgElem.innerHTML = '';
        }, 3000);
    }
});
