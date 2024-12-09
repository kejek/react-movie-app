/* eslint-disable react/prop-types */
import {imageUrl} from "../constants.jsx"
import Details from "./Details.jsx";


function MovieCard({movie}) {
	return (
		<div>
			<div className="item">
				<img
					style={{ width: "200px" }}
					src={imageUrl + movie.poster_path}
				/>
				<h3 style={{ color: "white" }}>
					{movie.title}
				</h3>
				<Details movie={movie} />
				<br />
				<div>
					<input type="checkbox" id="owned" name="owned" />
					<label htmlFor="owned">&nbsp; Own this movie?</label>
				</div>
			</div>
		</div>
	);
}

export default MovieCard;