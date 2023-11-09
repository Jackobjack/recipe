export const elements = {
    searchForum : document.querySelector('.search'),
    searchField : document.querySelector('.search__field'),
    searchResultsList : document.querySelector('.results__list'),
    searchResultDiv : document.querySelector('.results'),

}

export const elementStrings = {
    loader : 'loader'
}

export const clearLoader = () => {
    const loader = document.querySelector(`.${elementStrings.loader}`);
    if (loader) loader.parentElement.removeChild(loader);
}

// Эргэлддэг Icon-г харуулна. parent аргументээр ямар нэг <div>-г төлөөлүүлнэ.
export const renderLoader = (parent) => {
    const loader = 
    ` <div class="${elementStrings.loader}">
        <svg>
            <use href="img/icons.svg#icon-cw"></use>
        </svg>
    </div>`;
    parent.insertAdjacentHTML('afterbegin', loader);
}

