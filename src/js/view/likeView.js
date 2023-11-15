import { elements } from './base';

export const toggleLikeButton = (isLiked) => {
    const iconString = isLiked ? 'icon-heart' : 'icon-heart-outlined';
    document.querySelector('.recipe__love use').setAttribute('href', `img/icons.svg#${iconString}`);
}

export const toggleLikeMenu = (numLikes) => {
    // document.querySelector('.likes__field use').setAttribute('href', `img/icons.svg#${iconString}`);
    elements.likesMenu.style.visibility = (numLikes !== 0) ? 'visible' : 'hidden';
}

export const renderLike = (newLike) => {
    const html =    
    ` <li>
    <a class="likes__link" href="#${newLike.id}">
        <figure class="likes__fig">
            <img src="${newLike.image_url}" alt="Test">
        </figure>
        <div class="likes__data">
            <h4 class="likes__name">${newLike.title}</h4>
            <p class="likes__author">${newLike.publisher}</p>
        </div>
    </a>
    </li> `;
    elements.likesList.insertAdjacentHTML('afterbegin', html);
}

export const deleteLike = (id) => {
    // (`a[href*="${id}"]`) === (`a[href="#${id}"]`) === (`.[href*="${id}"]`)
    const domObj = document.querySelector(`.likes__link[href*="${id}"]`).parentNode;
    domObj.parentElement.removeChild(domObj);
}  