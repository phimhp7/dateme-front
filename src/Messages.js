import React, { useState, useEffect } from "react";
import logo from "./ASSETS/Logo.png";
import "./App.css";
import { Link } from "react-router-dom";
import { FaHeart, FaHeartBroken } from "react-icons/fa";
import axios from "axios";

function MessageDisplayer() {
	const [matches, setMatches] = useState([]);
	const [message, setMessage] = useState("");
	const [photo, setPhoto] = useState("");
	const [fruit, setFruit] = useState("");
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedMatchId, setSelectedMatchId] = useState(null);
	const isConnected = sessionStorage.getItem("token") ? true : false;

	useEffect(() => {
		const fetchMessages = async () => {
			try {
				const userId = sessionStorage.getItem("number");
				const response = await axios.get(
					`${process.env.REACT_APP_BACKEND_URL}/getmessages/${userId}`,
					{}
				);
				setMatches(response.data.messages);
			} catch (error) {
				console.error("Error fetching messages:", error);
			}
		};

		if (isConnected) {
			fetchMessages();
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

	const handleApproveMatch = async (matchId, approve) => {
		try {
			const response = await axios.put(
				`${
					process.env.REACT_APP_BACKEND_URL
				}/approvematch/${sessionStorage.getItem("number")}`,
				{
					id_crush: matchId,
					approve: approve,
				}
			);
			if (response.status === 200) {
				setMatches(matches.filter((match) => match.id !== matchId));
			}
		} catch (error) {
			console.error("Error approving match:", error);
		}
	};
	return (
		<div>
			<header className="mt-10 mb-24 flex flex-col justify-center items-center">
				<Link className="w-2/5" to="/">
					<img src={logo} alt="logo" />
				</Link>
			</header>
			{isConnected ? (
				<div className="flex flex-col">
					<h1 className="text-center text-3xl font-upandaway mb-8">
						Vos messages
					</h1>
					<div className="flex justify-center mt-8">
						<div className="w-5/6 h-72 max-w-lg mx-auto overflow-y-auto flex space-x-4">
							{matches.map((match, index) => (
								<div
									key={index}
									className="flex-shrink-0 w-4/5 h-full bg-white shadow-md rounded-lg p-4 flex flex-col justify-between"
								>
									<div className="items-center flex flex-col gap-8">
										<div>
											<p className="text-2xl rounded-full ">
												Num : {match.id}
											</p>
										</div>
										<div>
											<p className="text-lg text-center">
												{match.message}
											</p>
										</div>
									</div>
									<div className="flex justify-around mt-1">
										<button
											className="bg-green-500 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-full flex items-center"
											onClick={() =>
												handleApproveMatch(
													match.id,
													"yes"
												)
											}
										>
											<FaHeart className="" />
										</button>
										<button
											className="bg-red-500 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-full flex items-center"
											onClick={() =>
												handleApproveMatch(
													match.id,
													"no"
												)
											}
										>
											<FaHeartBroken className="" />
										</button>
									</div>
								</div>
							))}
						</div>
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

export default MessageDisplayer;
