import React, { useState, useEffect } from "react";
import logo from "./ASSETS/Logo.png";
import "./App.css";
import { Link } from "react-router-dom";
import axios from "axios";

function MatchDisplayer() {
	const [matches, setMatches] = useState([]);
	const [message, setMessage] = useState("");
	const [isModalOpen, setIsModalOpen] = useState(false);
	const isConnected = localStorage.getItem("token") ? true : false;
	const [count, setCount] = useState(0);

	useEffect(() => {
		const fetchMatches = async () => {
			try {
				const response = await axios.get(
					`${
						process.env.REACT_APP_BACKEND_URL
					}/getmatches/${localStorage.getItem("number")}`
				);
				setMatches(response.data.matches);
				if (count === 0) {
					console.log(response.data.matches);
					setCount(1);
				}
			} catch (error) {
				console.error(
					"There was an error fetching the matches!",
					error
				);
			}
		};

		fetchMatches();
	});

	const handleButtonClick = (msg) => {
		setMessage(msg);
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
	};

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
			<header className="mt-10 mb-24 flex justify-center items-center">
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
						<table className="min-w-full border-collapse">
							<tbody>
								{matches.map((match, index) => (
									<tr key={index}>
										<td className="px-4 py-8 border text-center">
											{match.id}
										</td>
										<td className="px-4 py-2 border text-center">
											{getEmoji(match.options)}
										</td>
										<td className="border px-4 py-2 text-center">
											<button
												className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
												onClick={() =>
													handleButtonClick(
														match.message
													)
												}
											>
												Afficher le message
											</button>
										</td>
									</tr>
								))}
							</tbody>
						</table>

						{isModalOpen && (
							<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
								<div className="bg-white p-8 rounded shadow-lg relative">
									<button
										className="absolute top-0 right-0 mt-2 mr-2 text-gray-500 hover:text-gray-700"
										onClick={closeModal}
									>
										×
									</button>
									<p>{message}</p>
								</div>
							</div>
						)}
					</div>
				</div>
			) : (
				<div className="flex flex-col gap-6 items-center justify-center pt-28">
					<p className="text-2xl">Vous êtes déconnectés</p>
					<Link
						to="/register"
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
