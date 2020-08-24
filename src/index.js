import "./style/style.css";

$('.search-button').on('click', function () {
    
    $.ajax({
        url: 'http://www.omdbapi.com/?i=tt3896198&apikey=133307c0&s=' + $('.input-keyword').val(),
        success: results => {
            const movies = results.Search;
            let cards = '';
        
            movies.forEach(m => {
                cards += showCards(m);
            });
            $('.movie-container').html(cards)
    
            // ketika tombol detail diklik
            $('.modal-detail-button').on('click', function () {
                $.ajax({
                    url: 'http://www.omdbapi.com/?apikey=133307c0&i=' + $(this).data('imdbid'),
                    success: m => {
                        console.log(m)
                        const movieDetail = showMovieDetail(m);
                        $('.modal-body').html(movieDetail);
                    },
                    error: (e) => {
                        alert(e.responseText);
                    }
                });
            })
        },
        error: (thrownError) => {
            alert(thrownError.responseText);
        }
    })

});




function showCards(m) {
    return `<div class="col-sm-12 col-md-4 col-lg-4 col-xl-3 my-3">
                <div class="card">
                    <img src="${m.Poster}" class="card-img-top" >
                    <div class="card-body">
                        <h5 class="card-title">${m.Title}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">${m.Year}</h6>
                        <a href="#" class="btn btn-primary modal-detail-button" data-toggle="modal" data-target="#movieDetailModal" data-imdbid="${m.imdbID}">Show Details</a>
                    </div>
                </div>
            </div>`
}

function showMovieDetail(m) {
    return `<div class="container-fluid">
    <div class="row">
        <div class="col-md-3">
            <img src="${m.Poster}" class="img-fluid">
        </div>
        <div class="col-md-12">
            <ul class="list-group">
                <li class="list-group-item"><h4> ${m.Title} ${m.Year}</h4></li>
                <li class="list-group-item"><strong>Genre : </strong> ${m.Genre}</li>
                <li class="list-group-item"><strong>Director : </strong> ${m.Director}</li>
                <li class="list-group-item"><strong> Actors : </strong> ${m.Actors}</li>
                <li class="list-group-item"><strong>Plot : </strong> <br> ${m.Plot}</li>                
            </ul>
        </div>
    </div>
</div>`
}

class footerKu extends HTMLElement{
    
    connectedCallback(){
        this.render();
    }

    render() {
        this.innerHTML = `&copy; 2020 by <strong>dodi</strong>. and special thanks to <strong>dicoding</strong>`
    }
    
    disconnectedCallback() {
        console.log("disconnected!");
    }
    
    
    adoptedCallback() {
        console.log("adopted!");
    }
};
customElements.define("footer-ku", footerKu);
