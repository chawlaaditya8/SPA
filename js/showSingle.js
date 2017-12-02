function showSingle(id) {
    var endpoint = 'https://api.tvmaze.com/shows/';
    var cast_endpoint = 'https://api.tvmaze.com/shows/'+ id + '/cast';
    fetch(cast_endpoint)
        .then(blob => blob.json())
        .then(cast => {
            
            var castHTML = cast.map((actor, index) => {
                return `
                <div class="cast-actor">
                    <img src="${actor.person.image.medium}">
                    <div class="cast-description">
                        <span class="cast-name">${actor.person.name}</span><br>
                        <span>as ${actor.character.name}</span><br>
                    </div>
                </div>
            `;
            }).join('');

            fetch(endpoint + id)
            .then(blob => blob.json())
            .then(data => {
                const image = data.image ? data.image.original : '';
                var schedule = data.schedule.days.join(', ');
                var genre = data.genres.join(' | ');
                var network = data.network ? data.network.name : '';
                var html = `
            <div class="single-show">
                <h1>${data.name}</h1>
            <div class="single-main">
                <div class="single-coalation">
                    <img class="single-image" src="${image}">
                    ${data.summary}
                </div>
                <div class="show-info">
                <h3>Show Info</h3>
                <b>Airs On:</b> ${network}<br>
                <b>Schedule:</b> ${schedule} at ${data.schedule.time} (${data.runtime} min)<br>
                <b>Status:</b> ${data.status}<br>
                <b>Language:</b> ${data.language}<br>
                <b>Show Type:</b> ${data.type}<br>
                <b>Genre:</b> ${genre}<br>
                </div>
            </div>
            <h2>Cast</h2>
            <div class="single-cast">
                ${castHTML}
            </div>
            </div>
            `;
            resultContainer.innerHTML = html;
            })
        })
}
