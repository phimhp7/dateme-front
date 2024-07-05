import React, { useState } from "react";
import logo from "./ASSETS/Logo.png";
import "./App.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "react-notifications/lib/notifications.css";
import {
	NotificationContainer,
	NotificationManager,
} from "react-notifications";

function CrushSender() {
	const navigate = useNavigate();
	const [id_crush, setIdCrush] = useState("");
	const [message, setMessage] = useState("");
	const isConnected = sessionStorage.getItem("token") ? true : false;

	const handleFormSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await axios
				.put(
					`${process.env.REACT_APP_BACKEND_URL}/sendmessage/${id_crush}`,
					{
						message,
						numero_client: sessionStorage.getItem("number"),
						token: sessionStorage.getItem("token"),
					}
				)
				.then((res) => {
					NotificationManager.success("Message envoyé avec succès");
				}, 900);
			navigate("/");
		} catch (error) {
			console.error("There was an error sending the message!", error);
			NotificationManager.error("Erreur lors de l'envoi du message");
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
				<form className="w-3/4 mx-auto" onSubmit={handleFormSubmit}>
					<div className="mb-20">
						<label
							htmlFor="id"
							className="block mb-2 text-2xl text-center font-medium text-gray-900 dark:text-white font-upandaway"
						>
							Le numéro de bracelet de votre crush
						</label>
						<input
							type="number"
							min={1}
							max={999}
							id="id"
							value={id_crush}
							onChange={(e) => setIdCrush(e.target.value)}
							className=" text-center font-upandaway bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
							placeholder="251"
							required
						/>
					</div>
					<div className="mb-20">
						<label
							htmlFor="password"
							className="block mb-2 text-2xl text-center font-medium text-gray-900 dark:text-white font-upandaway"
						>
							Un message pour votre crush
						</label>
						<input
							type="text"
							id="message"
							value={message}
							onChange={(e) => setMessage(e.target.value)}
							className="bg-gray-50 border font-upandaway border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
							required
						/>
					</div>
					<button
						type="submit"
						className="sm:ml-24 md:ml-24 lg:ml-28 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
					>
						Envoyer
					</button>
				</form>
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
			<NotificationContainer />
		</div>
	);
}

export default CrushSender;
