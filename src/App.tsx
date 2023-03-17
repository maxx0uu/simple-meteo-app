import axios from "axios";
import { useEffect, useRef, useState } from "react";

function App() {
	const [currentDatas, setCurrentDatas] = useState<any>();
	const [forecastDatas, setForecastDatas] = useState<any>();
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
				setCurrentDatas(response.data);
			})
			.catch(function (error) {
				console.error(error);
			});
	}, [inputValue]);

	useEffect(() => {
		axios({
			method: "GET",
			url: "https://weatherapi-com.p.rapidapi.com/forecast.json",
			params: { q: "London", days: "3" },
			headers: {
				"X-RapidAPI-Key": "6a1c209b8emsh40c965a8ac542a4p1550ddjsne21fa643eb04",
				"X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
			},
		})
			.then(function (response) {
				setForecastDatas(response.data);
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
			<main className="h-screen relative flex justify-center items-center overflow-hidden">
				<div className="bg-white rounded-2xl bg-opacity-20 w-80 border border-white border-opacity-30 shadow-xl px-4 py-6">
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
					{currentDatas && forecastDatas ? (
						<div className="flex flex-col justify-center text-center py-4 gap-4 text-lg">
							<h2 className="text-2xl font-semibold">
								{currentDatas.location.name}
							</h2>
							<div className="flex justify-center items-start temp-font">
								<p className="text-9xl font-bold text-blue-600">
									{currentDatas.current.temp_c}
								</p>
								<div className="bg-white rounded-full h-12 aspect-square p-2 flex justify-center items-center mt-5">
									<span className="text-lg text-black font-semibold">°C</span>
								</div>
							</div>
							<p>
								<span className="font-semibold">Vent:</span>{" "}
								{currentDatas.current.wind_kph + " km/h "}
								<span className="font-semibold">
									{currentDatas.current.wind_dir}
								</span>
							</p>
							<div className="flex flex-col justify-center items-center">
								<div className="h-20 flex justify-center items-center aspect-square overflow-hidden">
									<img
										src={currentDatas.current.condition.icon}
										alt={currentDatas.current.condition.text}
									/>
								</div>
							</div>
							<div className="relative bg-blue-600 rounded-xl h-24 px-2 flex items-center gap-2">
								{forecastDatas.forecast.forecastday.map((day: any) => {
									const date = day.date.split("-");
									let month = "";
									switch (date[1]) {
										case "01":
											month = "janvier";
											break;
										case "02":
											month = "février";
											break;
										case "03":
											month = "mars";
											break;
										case "04":
											month = "avril";
											break;
										case "05":
											month = "mai";
											break;
										case "06":
											month = "juin";
											break;
										case "07":
											month = "juillet";
											break;
										case "08":
											month = "août";
											break;
										case "09":
											month = "septembre";
											break;
										case "10":
											month = "octobre";
											break;
										case "11":
											month = "novembre";
											break;
										case "12":
											month = "décembre";
											break;
									}
									const newDate = date[2] + " " + month;

									return (
										<div className="border bg-white bg-opacity-60 w-1/3 h-32 rounded-xl flex flex-col justify-center items-center text-center next-days">
											<p>{newDate}</p>
											<p>{day.day.avgtemp_c}°C</p>
											<img
												src={day.day.condition.icon}
												alt={day.day.condition.text}
												className="w-14 aspect-square"
											/>
										</div>
									);
								})}
							</div>
						</div>
					) : (
						<p>Loading...</p>
					)}
				</div>
				<img
					src="/esaias-tan-6TXtIhu1k4A-unsplash.webp"
					alt="Natural background"
					className="absolute blur-sm -z-10 w-screen h-screen scale-125"
				/>
			</main>
		</>
	);
}

export default App;
