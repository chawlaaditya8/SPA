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

function search(e) {
    const result = [];
    var endpoint = 'http://api.tvmaze.com/search/shows?q=' + searchBox.value.replace(' ', '+');
    fetch(endpoint)
        .then(blob => blob.json())
        .then(data => result.push(...data))
        .then(() => {
            var html = result.map(r => {
                const image = r.show.image ? r.show.image.medium : '';
                return `
                <li onclick="showSingle(${r.show.id})">
                    <img src="${image}">
                    <div class="description">
                        <span class="name">${r.show.name}</span><br>
                        <span class="summary">${r.show.summary}</span>
                    </div>
                </li>
            `;
            }).join('');
            resultContainer.innerHTML = html;
    });
}