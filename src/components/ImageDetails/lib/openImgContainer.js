export default function openImgContainer() {
    const imgDetailsContainer = document.getElementById('img_details');

    if(imgDetailsContainer){
        imgDetailsContainer.classList.remove('display-none')
        // imgDetailsContainer.style.display = 'block';
    }
}
