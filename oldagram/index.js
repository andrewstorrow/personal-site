import { posts } from './data.js';

// // For generating UUIDs
// import { v4 as uuidv4 } from 'https://jspm.dev/uuid';
// console.log(uuidv4());

const UNLIKED_ICON = './images/icon-heart.png';
const LIKED_ICON = './images/icon-heart-red.png';

document.addEventListener('click', (e) => {
    //Listen for like icon clicks
    if (e.target.dataset.likeIcon) {
        handleLikeIconClick(e.target);
    }
});

document.addEventListener('dblclick', (e) => {
    //Listen for post image double clicks
    if (e.target.dataset.likeImage) {
        handleLikeImageClick(e.target);
    }
});

function handleLikeIconClick(likeIcon) {
    //Get the post with the matching uuid from the data
    const targetPost = posts.find(post => post.uuid === likeIcon.dataset.likeIcon);

    if (targetPost) {
        targetPost.isLiked = !targetPost.isLiked;
        likeIcon.src = targetPost.isLiked ? LIKED_ICON : UNLIKED_ICON;
    }
}

function handleLikeImageClick(likeImage) {
    //Get the post with the matching uuid from the data
    const targetUUID = likeImage.dataset.likeImage;
    const targetPost = posts.find(post => post.uuid === targetUUID);

    if (targetPost) {
        targetPost.isLiked = !targetPost.isLiked;
        const likeIcon = document.querySelector(`[data-like-icon="${targetUUID}"]`);
        likeIcon.src = targetPost.isLiked ? LIKED_ICON : UNLIKED_ICON;
    }
}

//Constructs and returns the html of the post feed as a string
function getFeedHtml() {
    let feedHtml = ``;

    //Construct post feed html
    for (const post of posts) {

        //Construct comments feed html
        let commentsHtml = ``;
        for (const comment of post.comments) {
            commentsHtml += `
<div class="comment">
    <h2>${comment.username}</h2>
    ${comment.comment}
</div>
            `;
        }

        feedHtml += `
<section>
    <div class="post-header">
        <img src="${post.avatar}" alt="post author avatar" class="author-avatar">
        <div class="post-author">
            <h2>${post.name}</h2>
            ${post.location}
        </div>
    </div>
    <img src="${post.post}" alt="post image" class="post-img" data-like-image="${post.uuid}">
    <div class="icons">
        <img src="${post.isLiked ? LIKED_ICON : UNLIKED_ICON}" alt="heart icon" data-like-icon="${post.uuid}">
        <img src="./images/icon-comment.png" alt="comment icon">
        <img src="./images/icon-dm.png" alt="direct message icon">
    </div>
    <h2 class="likes">${post.likes} likes</h2>
    <div>
        ${commentsHtml}
    </div>
</section>
        `;
    }

    return feedHtml;
}

// Render the post feed
function render() {
    document.getElementById('feed').innerHTML = getFeedHtml();
}

render();