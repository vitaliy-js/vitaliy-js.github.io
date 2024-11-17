import {showLoader,hideLoader} from '../components/loader.js';

const loadPage = (header, content) => {
    showLoader();
    header();
    content();
    window.addEventListener('load', hideLoader);
}
const getUrlId = () => new URLSearchParams(location.search).get('id');
const getData = async (page, data) => {
    try {
        const res = await fetch(`./code/resources/${page}/${page}${getUrlId()}.json`);
        data(await res.json());
        hideLoader();
    } catch {
        window.location.href = './err.html';
    }
}

export {loadPage,getUrlId,getData};