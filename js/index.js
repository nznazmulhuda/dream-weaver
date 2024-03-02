function displayData(data) {
	const posts = data.posts;

	posts.forEach(function (post) {
		const postImage = post.image,
			isActive = post.isActive,
			postID = post.id,
			postCategory = post.category,
			postAuthor = post.author.name,
			postTitle = post.title,
			postBody = post.description,
			postComment = post.comment_count,
			postView = post.view_count,
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
                                <div class="flex gap-5 mb-2">
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
                                        class="text-[#12132D] font-bold text-xl"
                                    >
                                        ${postTitle}
                                    </h1>
                                </div>

                                <div class="mb-5">
                                    <p
                                        class="text-[#12132D99] leading-7 font-medium inter text-[16px]"
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
}

let readCount = 1;
function markAsRead(id) {
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
	const read = document.getElementById("readCountDown");
	read.innerText = readCount;
	readCount++;
}
