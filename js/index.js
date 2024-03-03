// TODO: Display all the data in the api or data source
function displayData(data) {
	const posts = data.posts;

	// FIXME: Handle errors when no data is available.
	if (posts.length > 0) {
		// target all the posts
		posts.forEach(function (post) {
			const postImage = post.image,
				isActive = post.isActive,
				postID = post.id,
				postCategory = post.category,
				postAuthor = post.author.name,
				postTitle = post.title,
				postBody = post.description,
				postComment = post.comment_count.toLocaleString(),
				postView = post.view_count.toLocaleString(),
				postTime = post.posted_time,
				cardsSection = document.getElementById("cardsSection"),
				postCard = document.createElement("div");

			postCard.setAttribute("id", postID);
			postCard.classList.add("cards", "grid", "grid-cols-12", "gap-6");

			postCard.innerHTML = `
                    <div class="col-span-1 relative">
                        <img src=" ${postImage} " alt="" />
                        <div id='active_${postID}'
                            class="success absolute -top-2 -right-2 bg-active"
                            ></div>
                        </div>

                        <div class="col-span-11 divide-y divide-dashed">
                            <div>
                                <div class="flex flex-col lg:flex-row gap-2 lg:gap-5 mb-2">
                                    <h1
                                        class="text-sm font-medium inter text-[#12132DCC]"
                                    >
                                        # ${postCategory}
                                    </h1>

                                    <p
                                        class="text-sm font-medium inter text-[#12132DCC]"
                                    >
                                        Author: ${postAuthor}
                                    </p>
                                </div>

                                <div class="mb-3">
                                    <h1 id='title_${postID}'
                                        class="text-[#12132D] font-bold text-lg lg:text-xl"
                                    >
                                        ${postTitle}
                                    </h1>
                                </div>

                                <div class="mb-5">
                                    <p
                                        class="text-[#12132D99] leading-7 font-medium inter text-sm lg:text-[16px]"
                                    >
                                        ${postBody}
                                    </p>
                                </div>
                            </div>

                            <div class="pt-5 flex justify-between">
                                <div class="flex gap-6 items-center">
                                    <div
                                        class="flex gap-3 items-center justify-center"
                                    >
                                        <img
                                            width="28px"
                                            height="28px"
                                            src="./images/comment.png"
                                            alt=""
                                        />
                                        <p
                                            class="text-[#12132D99] inter text-[16px]"
                                        >
                                            ${postComment}
                                        </p>
                                    </div>

                                    <div
                                        class="flex gap-3 items-center justify-center"
                                    >
                                        <img
                                            width="28px"
                                            height="28px"
                                            src="./images/read.png"
                                            alt=""
                                        />
                                        <p id='postView_${postID}'
                                            class="text-[#12132D99] inter text-[16px]"
                                        >
                                            ${postView}
                                        </p>
                                    </div>

                                    <div
                                        class="flex gap-3 items-center justify-center"
                                    >
                                        <img
                                            width="28px"
                                            height="28px"
                                            src="./images/clock.png"
                                            alt=""
                                        />
                                        <p
                                            class="text-[#12132D99] inter text-[16px]"
                                        >
                                            ${postTime} min
                                        </p>
                                    </div>
                                </div>

                                <div>
                                    <button onclick="markAsRead(${postID})">
                                        <img
                                            src="./images/email.png"
                                            alt=""
                                        />
                                    </button>
                                </div>
                            </div>
                        </div>
        `;
			cardsSection.appendChild(postCard);

			// TODO: Show the active state of the cards
			if (isActive) {
				document
					.getElementById(`active_${postID}`)
					.classList.add("bg-active");
			} else {
				document
					.getElementById(`active_${postID}`)
					.classList.remove("bg-active");
				document
					.getElementById(`active_${postID}`)
					.classList.add("bg-inActive");
			}
		});

		// Loading off when data is available
		loading("none");

		// Unhide the error message when data is available
		document.getElementById("errorMessage").classList.remove("error");
		document.getElementById("errorMessage").classList.add("hidden");
	} else {
		// TODO: display the error message and loading is off
		loading("none");
		document.getElementById("errorMessage").classList.add("error");
		document.getElementById("errorMessage").classList.remove("hidden");
	}
}

// =================================================================================================
// =================================================================================================

let readCount = 1;
function markAsRead(id) {
	// Target the title and viewCount which post is clicked
	const postTitle = document.getElementById(`title_${id}`).innerText;
	const postView = document.getElementById(`postView_${id}`).innerText;
	const readField = document.getElementById("readField");
	const div = document.createElement("div");

	div.classList.add("bg-white", "mt-4", "rounded-2xl", "p-4");
	div.innerHTML = `
                <div class="flex justify-between">
                    <h1
                        class="text-[#12132D] w-[70%] text-[16px] font-semibold"
                    >
                        ${postTitle}
                    </h1>

                    <div class="flex gap-1 items-center">
                        <img
                            src="./images/read.png"
                            alt=""
                        />
                        <p
                            class="text-[#12132D99] font-normal text-[16px] inter"
                        >
                            ${postView}
                        </p>
                    </div>
                </div>
    `;
	readField.appendChild(div);

	// Mark the post as read
	const read = document.getElementById("readCountDown");
	read.innerText = readCount;
	readCount++;
}

// =================================================================================================
// =================================================================================================

// TODO: Display the latest data in the document from the api
function displayLatestData(posts) {
	const latestPosts = document.getElementById("latestPosts");

	// Target all the latest post
	for (const post of posts) {
		const image = post.cover_image,
			profilePicture = post.profile_image,
			title = post.title,
			discription = post.description,
			name = post.author.name,
			designations = post.author.designation,
			dates = post.author.posted_date,
			div = document.createElement("div");
		let designation = "";
		let date = "";

		// TODO: Handle the error when designation is not available
		if (designations) {
			designation = designations;
		} else {
			designation = "Unknown";
		}

		// TODO: Handle the error when date is not available
		if (dates) {
			date = dates;
		} else {
			date = "No publish date";
		}

		// Displaying the latest post
		div.classList.add(
			"card",
			"border-2",
			"border-[#12132D26]",
			"p-6",
			"bg-base-100",
			"shadow-xl"
		);
		div.innerHTML = `
    <figure class="rounded-[20px]">
        <img
            src=" ${image} "
            alt=""
            class="rounded-xl"
        />
    </figure>

    <div class="mt-6 flex justify-between flex-col">
    <div>
        <div
            class="flex gap-3 items-center text-[#12132D99] text-[16px] mb-4"
        >
            <img src="./images/date.png" alt="" />
            <p>${date}</p>
        </div>

        <h2
            class="text-[#12132D] text-lg font-extrabold leading-7"
        >
            ${title}
        </h2>

        <p class="mt-2 mb-2 latestPost-p">${discription}</p>
        </div>

        <div>
            <div class="flex gap-4 items-center mt-4">
                <img width="44px" height="44px" class="rounded-full" src=" ${profilePicture} " alt="" />

                <div>
                    <h1
                        class="text-[#12132D] text-[16px] font-bold"
                    >
                        ${name}
                    </h1>
                    <p
                        class="text-[#12132D99] text-sm font-normal"
                    >
                        ${designation}
                    </p>
                </div>
            </div>
        </div>
    </div>
    `;

		latestPosts.appendChild(div);
	}

	// TODO: Remove the loader
	loaderLetest("none");
}

// =================================================================================================
// =================================================================================================

// TODO: Search posts using the category name.
function searchPosts() {
	const categoryName = document.getElementById("categoryName").value;

	document.getElementById("cardsSection").innerHTML = ``;
	document.getElementById("categoryName").value = ``;

	// TODO: Handle error when search field is empty.
	if (categoryName.length) {
		// TODO: Display the loader
		loading("block");
		document.getElementById("errorMessage").classList.remove("error");
		document.getElementById("errorMessage").classList.add("hidden");

		// TODO: show loader for 2/3s.
		setTimeout(() => {
			const url = `https://openapi.programming-hero.com/api/retro-forum/posts?category=${categoryName}`;
			fetch(url)
				.then((res) => res.json())
				.then((posts) => {
					loading("block");
					displayData(posts);
				});
		}, 2000);
	} else {
		document.getElementById("errorMessage").classList.add("error");
		document.getElementById("errorMessage").classList.remove("hidden");
		alert("Please select a category");
	}
}

// TODO: Search when enter button is clicked.
window.addEventListener("keydown", (e) => {
	if (e.key === "Enter") {
		searchPosts();
	}
});

// =================================================================================================
// =================================================================================================

// TODO: loading function
function loading(action) {
	const loader = document.getElementById("loaderAll");
	loader.style.display = action;
}

// TODO: loading function for latest post
function loaderLetest(action) {
	const loader = document.getElementById("loaderLetest");
	loader.style.display = action;
}

// =================================================================================================
// =================================================================================================

// TODO: Tooltip function for menu items.
const tools = document.querySelectorAll(".tool");

for (const tool of tools) {
	tool.addEventListener("mouseover", () => {
		tool.querySelector("div").style.display = "block";
	});
	tool.addEventListener("mouseout", () => {
		tool.querySelector("div").style.display = "none";
	});
}
