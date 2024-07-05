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

function Register() {
	const navigate = useNavigate();
	const [user_choice, setUserChoice] = useState("");

	const changePassword = (e) => {
		e.preventDefault();
		const id = e.target[0].value;
		const password = e.target[1].value;
		const newPassword = e.target[2].value;
		axios
			.put(`${process.env.REACT_APP_BACKEND_URL}/updatepassword`, {
				id: id,
				id_pas: password,
				password: newPassword,
				choice: user_choice,
			})
			.then((res) => {
				sessionStorage.setItem("token", res.data.token);
				sessionStorage.setItem("number", res.data.bracelet.id);
				NotificationManager.success("Mot de passe changé avec succès");

				setTimeout(() => {
					navigate("/");
				}, 900);
			})
			.catch((err) => {
				if (err.response.status === 401) {
					NotificationManager.error("Mot de passe invalide");
					return;
				}
				if (err.response.status === 404) {
					NotificationManager.error("Bracelet non trouvé");
					return;
				}
				if (err.response.status === 400) {
					NotificationManager.error("Bracelet déjà enregistré");
					return;
				}
				NotificationManager.error(
					"Erreur lors du changement de mot de passe"
				);
			});
	};

	return (
		<div className="">
			<header className="mt-10 mb-16 md:mb-16 sm:mb-6 flex justify-center items-center">
				<img src={logo} className="w-2/5" alt="logo" />
			</header>
			<form className="w-fit mx-auto" onSubmit={changePassword}>
				<div className="mb-10 sm:mb-5">
					<label
						htmlFor="id"
						className="block mb-2 text-xl text-center font-medium text-black dark:text-black"
					>
						Votre numéro de bracelet
					</label>
					<input
						type="id"
						id="id"
						className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						placeholder="001"
						required
					/>
				</div>
				<div className="mb-10">
					<label
						htmlFor="password"
						className="block mb-2 text-xl text-center font-medium text-black dark:text-black"
					>
						Code de bracelet
					</label>
					<input
						type="id_password"
						id="id_password"
						className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						required
					/>
				</div>
				<div className="mb-10">
					<label
						htmlFor="password"
						className="block mb-2 text-xl text-center font-medium text-black dark:text-black"
					>
						Votre nouveau mot de passe
					</label>
					<input
						type="password"
						id="password"
						className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						autoComplete="new-password"
						required
					/>
				</div>
				<div className="mb-16">
					<label
						htmlFor="password"
						className="block mb-2 text-xl text-center font-medium text-black dark:text-black"
					>
						Votre choix
					</label>
					<select
						id="user_choice"
						onChange={(e) => setUserChoice(e.target.value)}
						className="bg-gray-50 border border-gray-300 text-gray-900 text-sm text-center rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						required
					>
						<option value="">Choisissez un fruit</option>
						<option value="charo">🍑 (Pas de schéma)</option>
						<option value="peut-etre">🍉 (Indécis)</option>
						<option value="serieuse">🍓 (Romantique)</option>
					</select>
				</div>
				<div className="mb-20 items-center">
					<button
						type="submit"
						className="ml-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
					>
						Changer son mot de passe
					</button>
				</div>
			</form>

			<NotificationContainer />
		</div>
	);
}

export default Register;
