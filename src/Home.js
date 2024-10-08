import React from "react";
import logo from "./ASSETS/Logo.png";
import fraise from "./ASSETS/fraise.png";
import pasteque from "./ASSETS/pastèque.png";
import peche from "./ASSETS/pehce.png";
import { Link } from "react-router-dom";
import "./index.css";

function Home() {
	const isConnected = sessionStorage.getItem("token") ? true : false;
	const number = sessionStorage.getItem("number");

	return (
		<div className="">
			<header className="mt-12 md:mb-10 sm:mb-10 flex justify-center items-center">
				<img src={logo} className="w-3/4" alt="logo" />
			</header>
			{isConnected ? (
				<div>
					<div className="flex flex-col items-center justify-center md:pt3 sm:pt-px md:gap-16 sm:gap-20">
						<Link
							to="/crush"
							className="bg-white bg-opacity-85 text-red-600 font-bold py-8 px-12 rounded-2xl"
						>
							<p className="text-2xl font-upandaway">
								J'ai un crush
							</p>
						</Link>
						<Link
							to="/match"
							className="bg-black bg-opacity-90 text-white font-bold py-8 px-12 rounded-2xl"
						>
							<p className="text-2xl font-upandaway">
								Voir mes match(s)
							</p>
						</Link>
						<Link
							to="/messages"
							className="bg-emerald-500 bg-opacity-90 text-white font-bold py-8 px-12 rounded-2xl"
						>
							<p className="text-2xl font-upandaway">
								Mes messages
							</p>
						</Link>
					</div>
					<div className="">
						<image src={fraise} alt="fraise" className="w-4" />
					</div>
					<div className="flex flex-col md:gap-12 sm:gap-8 lg:gap-20 items-center justify-center">
						<div className="flex flex-row gap-2 items-center justify-center md:mt-5 sm:mt-5 lg:mt-16">
							<p className="text-2xl">Mon numéro:</p>
							<p className="text-3xl underline decoration-4 underline-offset-auto decoration-sky-500">
								{number}
							</p>
						</div>
						{/* <button
							className="bg-red-600 bg-opacity-70 text-white font-bold py-1 px-12 rounded-2xl"
							onClick={() => {
								localStorage.clear();
								window.location.reload();
							}}
						>
							Se deconnecter
						</button> */}
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

export default Home;
