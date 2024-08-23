import React, { useState, useEffect } from "react";
import logo from "./ASSETS/Logo.png";
import "./App.css";
import { Link } from "react-router-dom";
import axios from "axios";
import moment from "moment"; // You'll need to install this for date formatting

function MatchDisplayer() {
	const [matches, setMatches] = useState([]);
	const isConnected = sessionStorage.getItem("token") ? true : false;

	useEffect(() => {
		const fetchMatches = async () => {
			try {
				const response = await axios.get(
					`${
						process.env.REACT_APP_BACKEND_URL
					}/getmatches/${sessionStorage.getItem("number")}`
				);
				setMatches(response.data.matches);
			} catch (error) {
				console.error(
					"There was an error fetching the matches!",
					error
				);
			}
			console.log(matches);
		};

		if (isConnected) {
			fetchMatches();
		}
	}, [isConnected]);

	const getEmoji = (option) => {
		switch (option.toLowerCase()) {
			case "charo":
				return "🍑";
			case "peut-etre":
				return "🍉";
			case "serieuse":
				return "🍓";
			default:
				return "";
		}
	};

	return (
		<div>
			<header className="mt-10 mb-10 flex flex-col justify-center items-center">
				<Link className="w-2/5" to="/">
					<img src={logo} alt="logo" />
				</Link>
			</header>
			{isConnected ? (
				<div className="flex flex-col">
					<h1 className="text-center text-3xl font-upandaway mb-8">
						Vos matchs
					</h1>
					<div className="flex justify-center mt-8">
						<div className="w-5/6 h-72 max-w-lg mx-auto overflow-y-auto flex space-x-4">
							{matches.map((match, index) => (
								<div
									key={index}
									className="flex-shrink-0 w-4/5 h-full bg-white shadow-md rounded-lg p-4 flex flex-col justify-between"
								>
									<div className="items-center flex flex-col gap-5">
										<div>
											<p className="text-2xl rounded-full">
												Num : {match.id}
											</p>
											<p className="text-sm text-center mt-10">
												Son fruit :
											</p>
											<p className="text-4xl text-center">
												{getEmoji(match.options)}
											</p>
										</div>
										<div className="text-center mt-16">
											{match.message ? (
												<p className="text-base">
													Vous avez envoyé :{" "}
													{match.message}
												</p>
											) : (
												<p className="text-lg">
													Vous avez matché à :{" "}
													{moment(
														match.matchTime
													).format("HH:mm")}
												</p>
											)}
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
					<div className="flex flex-col justify-center mt-8">
						<p className="text-center text-l">
							Rappel sur les fruits:
						</p>
						<p className="text-center text-l mt-2">🍑 : Charo</p>
						<p className="text-center text-l mt-px">
							🍉 : Peut-être
						</p>
						<p className="text-center text-l mt-px">
							🍓 : Sérieuse
						</p>
					</div>
				</div>
			) : (
				<div className="flex flex-col gap-6 items-center justify-center pt-28">
					<p className="text-2xl">Vous êtes déconnectés</p>
					<Link
						to="/login"
						className="bg-black bg-opacity-90 text-white font-bold py-8 px-12 rounded-2xl"
					>
						<p className="text-2xl font-upandaway">Se connecter</p>
					</Link>
				</div>
			)}
		</div>
	);
}

export default MatchDisplayer;
