const fetchData = async () => {
    const response = await fetch('https://openapi.programming-hero.com/api/retro-forum/posts');
    const data = await response.json();

    displayData(data);
}

fetchData()