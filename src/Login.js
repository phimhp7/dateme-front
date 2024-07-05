import React, { useState } from "react";
import logo from "./ASSETS/Logo.png";
import "./App.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "react-notifications/lib/notifications.css";
import {
	NotificationContainer,
	NotificationManager,
} from "react-notifications";

function Login() {
	const navigate = useNavigate();
	const [id, setId] = useState("");
	const [password, setPassword] = useState("");

	const handleLogin = (e) => {
		e.preventDefault();
		axios
			.post(`${process.env.REACT_APP_BACKEND_URL}/login`, {
				id: id,
				password: password,
			})
			.then((res) => {
				sessionStorage.setItem("token", res.data.token);
				sessionStorage.setItem("number", res.data.bracelet.id);
				NotificationManager.success("Connexion réussie");

				setTimeout(() => {
					navigate("/");
				}, 900);
			})
			.catch((err) => {
				console.error(err);
				NotificationManager.error("Erreur lors de la connexion");
			});
	};

	return (
		<div className="">
			<header className="mt-10 mb-16 md:mb-16 sm:mb-6 flex justify-center items-center">
				<img src={logo} className="w-2/5" alt="logo" />
			</header>
			<form className="w-fit mx-auto" onSubmit={handleLogin}>
				<div className="mb-10 sm:mb-5">
					<label
						htmlFor="id"
						className="block mb-2 text-xl text-center font-medium text-black dark:text-black"
					>
						Votre numéro de bracelet
					</label>
					<input
						type="text"
						id="id"
						className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						placeholder="001"
						value={id}
						onChange={(e) => setId(e.target.value)}
						required
					/>
				</div>
				<div className="mb-10">
					<label
						htmlFor="password"
						className="block mb-2 text-xl text-center font-medium text-black dark:text-black"
					>
						Mot de passe
					</label>
					<input
						type="password"
						id="password"
						className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</div>
				<div className="mb-20 mx-auto">
					<button
						type="submit"
						className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mx-auto"
					>
						Se connecter
					</button>
				</div>
				<div className="mb-20 mx-auto items-center">
					<p className="text-center mb-5 text-black dark:text-black">
						Vous n'avez pas enrregistré votre bracelet ?
					</p>
					<button
						type="button"
						onClick={() => navigate("/register")}
						className="text-white bg-gray-500 hover:bg-gray-500 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-gray-400 dark:hover:bg-gray-400 dark:focus:ring-green-800"
					>
						S'inscrire
					</button>
				</div>
			</form>

			<NotificationContainer />
		</div>
	);
}

export default Login;
