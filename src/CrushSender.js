import React, { useState } from "react";
import logo from "./ASSETS/Logo.png";
import "./App.css";
import { Link, useNavigate } from "react-router-dom";

function CrushSender() {
	const navigate = useNavigate();

	const handleFormSubmit = (e) => {
		e.preventDefault();
		navigate("/");
	};

	return (
		<div>
			<header className="mt-10 mb-24 flex justify-center items-center">
				<Link className="w-2/5" to="/">
					<img src={logo} alt="logo" />
				</Link>
			</header>
			<form className="w-3/4 mx-auto" onSubmit={handleFormSubmit}>
				<div className="mb-20">
					<label
						htmlFor="id"
						className="block mb-2 text-2xl text-center font-medium text-gray-900 dark:text-white font-upandaway"
					>
						Le numéro de bracelet de votre crush
					</label>
					<input
						type="id"
						id="id"
						className=" text-center font-upandaway bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						placeholder="001"
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
						type="message"
						id="message"
						className="bg-gray-50 border font-upandaway border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
					/>
				</div>
				<button
					type="submit"
					className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
				>
					Envoyer
				</button>
			</form>
		</div>
	);
}

export default CrushSender;
