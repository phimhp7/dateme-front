import React, { useState } from "react";
import logo from "./ASSETS/Logo.png";
import "./App.css";
import "react-notifications/lib/notifications.css";
import {
	NotificationContainer,
	NotificationManager,
} from "react-notifications";

function Register() {
	const createNotification = (type) => {
		return () => {
			switch (type) {
				case "info":
					NotificationManager.info("Info message");
					break;
				case "success":
					NotificationManager.success(
						"Success message",
						"Title here",
						5000
					);
					break;
				case "warning":
					NotificationManager.warning(
						"Warning message",
						"Close after 3000ms",
						3000
					);
					break;
				case "error":
					NotificationManager.error(
						"Error message",
						"Click me!",
						5000,
						() => {
							alert("callback");
						}
					);
					break;
			}
		};
	};

	return (
		<div className="fixed">
			<header className="mt-10 mb-16 flex justify-center items-center">
				<img src={logo} className="w-2/5" alt="logo" />
			</header>
			<form
				className="w-fit mx-auto"
				onSubmit={createNotification("success")}
			>
				<div className="mb-10">
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
						type="id"
						id="id"
						className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						required
					/>
				</div>
				<div className="mb-20">
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
						required
					/>
				</div>
				<button
					type="submit"
					className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
				>
					Changer son mot de passe
				</button>
			</form>

			<NotificationContainer />
		</div>
	);
}

export default Register;
