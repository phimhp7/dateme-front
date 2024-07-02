import React, { useState } from "react";
import logo from "./ASSETS/Logo.png";
import { Link } from "react-router-dom";
import "./index.css";

function Home() {
	const [buttonContent, setButtonContent] = useState("");
	const isConnected = true;
	const number = "001";
	return (
		<div className="">
			<header className="mt-12 mb-10 flex justify-center items-center">
				<img src={logo} className="w-3/4" alt="logo" />
			</header>
			{isConnected ? (
				<div>
					<div className="flex flex-col items-center justify-center pt-28 gap-28">
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

					<div className="flex flex-row gap-6 items-center justify-center pt-28">
						<p className="text-2xl">Mon numéro:</p>
						<p className="text-3xl underline decoration-4 underline-offset-auto decoration-sky-500">
							{number}
						</p>
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
