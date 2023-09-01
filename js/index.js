const loadData = async () => {
    const response = await fetch("https://openapi.programming-hero.com/api/videos/categories");
    const data  = await response.json();
    const tabContainer = document.getElementById('tab-container');
    const category = data.data;
    category.forEach((category )=> {
    const div = document.createElement("div");
    div.innerHTML = `
    <a onclick="loadVideos('${category.category_id}')" class="tab"> ${category.category} </a> 
    `;
    tabContainer.appendChild(div);
    });
    
};
const loadVideos = async (categoryId) => {
    const response = await fetch (`https://openapi.programming-hero.com/api/videos/category/${categoryId}`);
    const data = await response.json();
    const videos = data.data;
    console.log(videos);
    const cardContainer = document.getElementById('card-container');
    const noCardContainer = document.getElementById('no-card');
    
    cardContainer.innerHTML = '';
    noCardContainer.innerHTML = '';
    if (videos && videos.length > 0) {
        videos?.forEach((videos) => {
            const div = document.createElement("div");
            const verifiedIcon = videos.authors[0].verified === true ? '<img src="./image/verified.png" alt="Verified">' : '';
            
            const postedDateInSeconds = videos.others?.posted_date || 0;
            const postedDate = new Date(postedDateInSeconds * 1000);
            const hours = postedDate.getHours();
            const minutes = postedDate.getMinutes();
            const formattedPostedDate = `${hours}hrs ${minutes} min`;
            
            div.innerHTML = `
            <div class="card bg-base-100 shadow-xl py-2">
              <figure class="h-40 relative"><img src=" ${videos?.thumbnail} " alt="Shoes" /></figure>
              ${videos.others?.posted_date ? `<p class="absolute ml-56 md:ml-48 lg:ml-36 mt-28 px-2 py-1 bg-[#171717] text-white text-center rounded-lg">${formattedPostedDate} ago</p>` : ''}
                        <div class="flex gap-5 mt-5 mb-2 px-2">
                            <div><img class="h-20 w-20 rounded-full" src="${videos.authors[0].profile_picture}" alt=""></div>
                            <div>
                            <h2 class="text-lg font-semibold">${videos.title}</h2>
                              <div class="flex gap-2">
                              <p>${videos.authors[0].profile_name}</p>
                              ${verifiedIcon}
                              </div>
                            <p> ${videos.others.views} views </p>
                          </div>
                        </div>
                      </div>
            `;
            cardContainer.appendChild(div);
        }); 
    } else {
        const noVideosDiv = document.createElement("div");
        noVideosDiv.innerHTML = `
        <img class="ml-24 md:ml-24 lg:ml-24" src="./image/Icon.png" alt="">
        <h3 class="text-3xl font-bold mt-3 text-center">Oops!! Sorry, There is no <br>content here</h3>
        `;
        noCardContainer.appendChild(noVideosDiv);
    }
};


loadData();
loadVideos(1000);