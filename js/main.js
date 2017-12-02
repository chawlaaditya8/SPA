const searchBox = document.querySelector(".search-box");
const searchButton = document.querySelector(".search-button");
const resultContainer = document.querySelector('.result');

searchButton.addEventListener('click', search);
searchBox.addEventListener('keyup', handleEnter);


manageState();
function manageState(){
    if(getParameterByName('q')){
        searchBox.value = getParameterByName('q') || 'sherlock';
        search();
    } else if(getParameterByName('id')){
        const value = getParameterByName('id') || '335';
        showSingle('335');
    } else {
        searchBox.value = 'sherlock';
        search();
    }
}
