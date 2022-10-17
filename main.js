const input = document.querySelector(".movie-input");
const div = document.querySelector(".movies-container");

input.addEventListener("keyup", (event) => {
	document.querySelector(".search-btn").addEventListener("click", () => {
		div.innerHTML = "";
		renderMovieHTML(event.target.value);
	})
})

function renderMovieHTML(value) {
	const title = value;
	fetch(`https://www.omdbapi.com/?i=tt3896198&apikey=811e5d95&s=${title}`)
		.then((res) => res.json())
		.then((data) => {
			
			for (let i=0; i < data.Search.length; i++){
				fetch(`https://www.omdbapi.com/?i=tt3896198&apikey=811e5d95&t=${data.Search[i].Title}`)
					.then((res1) => res1.json())
					.then((data1) => {
						const result = `
							<div class="movie">
								<div class="poster">
									<img src="${data1.Poster}" class="movie-poster-img">
								</div>
								
								<section class="main"> 
									<div class="movie-header">
										<h2 class="movie-title">${data1.Title}<h2>
										<p class="rating">⭐${data1.imdbRating}</p>
									</div>

									<div class="movie-info">
										<p class="runtime">${data1.Runtime}</p>
										<p class="genre">${data1.Genre}</p>
									</div>

									<p class="description">${data1.Plot}</p>
								</section>
							</div>
						`
						currentFilm = result;
						
						function checkRepetitions() {
							let answer = false;
							for (let i=0; i < data.Search.length; i++) {
								if (data.Search[i] === data1) {
									answer = true;
								}
							}
							
							return answer;
						}
						
						if (checkRepetitions()){
							console.log("Render " + i + " has failed")
						} else {
							div.innerHTML += result;
						}
					})
				}
					
			})
				
}
