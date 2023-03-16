import axios from "axios";
import { useEffect, useRef, useState } from "react";

function App() {
	const [datas, setDatas] = useState<any>();
	const [inputValue, setInputValue] = useState("Paris");
	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		axios({
			method: "GET",
			url: "https://weatherapi-com.p.rapidapi.com/current.json",
			params: { q: inputValue },
			headers: {
				"X-RapidAPI-Key": "6a1c209b8emsh40c965a8ac542a4p1550ddjsne21fa643eb04",
				"X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
			},
		})
			.then(function (response) {
				setDatas(response.data);
				console.log(response.data);
			})
			.catch(function (error) {
				console.error(error);
			});
	}, [inputValue]);

	const verifyInputContent = (e: any) => {
		if (inputRef.current?.value.trim()) {
			setInputValue(inputRef.current.value);
		}
	};

	return (
		<>
			<main className="h-screen relative flex justify-center items-center">
				<div className="bg-white rounded-2xl bg-opacity-20 h-3/5 w-80 border border-white border-opacity-30 shadow-xl px-4 py-6">
					<div className="flex flex-col justify-center gap-3">
						<input
							ref={inputRef}
							type="text"
							className="w-full text-xl rounded-md px-2 py-1"
						/>
						<button
							className="bg-blue-600 px-9 py-2 rounded-full mx-auto text-white font-bold"
							onClick={(e) => verifyInputContent(e)}
						>
							Rechercher
						</button>
					</div>
					{datas ? (
						<div className="flex flex-col justify-center text-center py-4 gap-4 text-lg">
							<h2 className="text-2xl font-semibold">{datas.location.name}</h2>
							<p>
								<span className="font-semibold">Temperature:</span>{" "}
								{datas.current.temp_c}°C
							</p>
							<p>
								<span className="font-semibold">Vent:</span>{" "}
								{datas.current.wind_kph + " " + datas.current.wind_dir}
							</p>
							<div className="flex flex-col justify-center items-center">
								<p>
									<span className="font-semibold">Condition:</span>{" "}
									{/* {datas.current.condition.text} */}
								</p>
								<img src={datas.current.condition.icon} alt="" />
							</div>
						</div>
					) : (
						<p>Loading...</p>
					)}
				</div>
				<img
					src="/esaias-tan-6TXtIhu1k4A-unsplash.webp"
					alt="Natural background"
					className="absolute inset-0 blur-md scale-105 -z-10"
				/>
			</main>
		</>
	);
}

export default App;
