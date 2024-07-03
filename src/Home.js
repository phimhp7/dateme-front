import React, { useState } from "react";
import logo from "./ASSETS/Logo.png";
import { Link } from "react-router-dom";
import "./index.css";

function Home() {
	const [buttonContent, setButtonContent] = useState("");
	const isConnected = localStorage.getItem("token") ? true : false;
	//const isConnected = true;
	const number = localStorage.getItem("number");
	return (
		<div className="">
			<header className="mt-12 md:mb-10 sm:mb-1 flex justify-center items-center">
				<img src={logo} className="w-3/4" alt="logo" />
			</header>
			{isConnected ? (
				<div>
					<div className="flex flex-col items-center justify-center md:pt-10 sm:pt-3 md:gap-16 sm:gap-5">
						<Link
							to="/crush"
							className="bg-white bg-opacity-85 text-red-600 font-bold py-8 px-12 rounded-2xl"
						>
							<p
								onClick={() => setButtonContent("Coquine")}
								className="text-2xl font-upandaway"
							>
								J'ai un crush
							</p>
						</Link>
						<Link
							to="/crush"
							className="bg-black bg-opacity-90 text-white font-bold py-8 px-12 rounded-2xl"
						>
							<p
								onClick={() => setButtonContent("Coquine")}
								className="text-2xl font-upandaway"
							>
								Voir mes match(s)
							</p>
						</Link>
					</div>
					<div className="flex flex-col md:gap-12 sm:gap-8 lg:gap-20 items-center justify-center">
						<div className="flex flex-row gap-2 items-center justify-center md:mt-5 sm:mt-2 lg:mt-16">
							<p className="text-2xl">Mon numéro:</p>
							<p className="text-3xl underline decoration-4 underline-offset-auto decoration-sky-500">
								{number}
							</p>
						</div>
						<button
							className="bg-red-600 bg-opacity-70 text-white font-bold py-1 px-12 rounded-2xl"
							onClick={() => {
								localStorage.clear();
								window.location.reload();
							}}
						>
							Se deconnecter
						</button>
					</div>
				</div>
			) : (
				<div className="flex flex-col gap-6 items-center justify-center pt-28">
					<p className="text-2xl">Vous êtes déconnectés</p>
					<Link
						to="/register"
						className="bg-black bg-opacity-90 text-white font-bold py-8 px-12 rounded-2xl"
					>
						<p
							onClick={() => setButtonContent("Coquine")}
							className="text-2xl font-upandaway"
						>
							Se connecter
						</p>
					</Link>
				</div>
			)}
		</div>
	);
}

export default Home;
