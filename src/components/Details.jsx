/* eslint-disable react/prop-types */

const truncate = (string) => {
    return string.length > 100 ? string.substring(0, 99) + "..." : string;
}

function Details ({movie}) {
	return(
		<div>
			<p>{movie.release_date}</p>
			<p className="rating">
				Popularity: {movie.popularity}
			</p>
			<p>Overview: {truncate(movie.overview)}</p>
		</div>
	);
}

export default Details;