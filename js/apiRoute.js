const fetchData = async () => {
	const response = await fetch(
		"https://openapi.programming-hero.com/api/retro-forum/posts"
	);
	const data = await response.json();

	loading("block");
	displayData(data);
};

const latestDataLoad = async () => {
	const res = await fetch(
		"https://openapi.programming-hero.com/api/retro-forum/latest-posts"
	);
	const data = await res.json();

	loaderLetest("block");
	displayLatestData(data);
};

fetchData();
latestDataLoad();
