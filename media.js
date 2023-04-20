const articles =document.getElementById("articles");
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const imags =["Naruto.jpg", "Selena.jpg","Lisa.jpg", "rand.png"];
let titles =[];
const dates=[];
let items=[];



let manypages =``;

articles.innerHTML =`<p class="heading">Hello, world!</p>`;

function getarticles(){
  fetch('https://api.nytimes.com/svc/topstories/v2/science.json?api-key=gD9IU2QvCP1RIM33ArbttgsdVz8WnPkl')
  .then((promise)=>
    promise.json())
  .then((data)=>{
    console.log(data);
    console.log(data.results.splice(0,4));
    data.results.splice(0,4).map((item,_index)=>{
     console.log(item);
     const image = item.multimedia[0].url;
     const date = new Date(item.published_date);
     const published =(months[date.getMonth()] + ' ' + date.getDate());
     //console.log(published);
     const authorsName=item.byline.substring(3,item.byline.length);
     const sectionTopic =item.des_facet[1];
     const html = `
      <div class="article">
            <div class="text">
                <p class="innertext"><img src=${imags[_index]} class="littleImage"/> ${authorsName}  <span class="grey">in</span>  
                  "${sectionTopic}"<span class="grey">• ${published}</span>
                </p>
                <p id="title">${item.title}</p>
                <p class="abstract">${item.abstract}</p>
                <div class="line">
                  <div class="innerLine">
                    <button class="btn">${item.geo_facet[0]? item.geo_facet[0]:"Unknown"}</button>
                    <p>12 minutes ago</p>
                    <p>•</p>  
                    <p>Selected for you</p>
                  </div>
                  <div class="icons">
                    <img src="Twitter.png"/>
                    <img src="Instagram.png"/>
                  </div>  
                </div>
            </div>
            <img src ="${image}" class="images"></img>
      </div>`
      articles.innerHTML += html;
      manypages+=html;
      titles.push(item.title);
      items.push(item);
      dates.push(published);
    })
  })
  .catch(e=>console.log(e))
}


getarticles();
//console.log(titles);
console.log(items);
let singlepage =``;

articles.addEventListener( 'click',  function ( event ){
  for( let i =0; i< titles.length; i++){
    if(event.target.innerText ===titles[i]){
      articles.replaceChildren();
      const htmlone = `
      <img src ="Left.png" class="arrow" />
      <div class="article1">
      <div class="text_1">
        <img src ="${imags[i]}" class ="singleimg"/>
        <div class="inner_1">
            <div style="font-size: 18px;line-height: 22px;">${items[i].byline.substring(3,items[0].byline.length)}</div>
            <div class="line_1">
                <p>${dates[i]} •</p>
                <p>12 minutes  •</p>
                <p>Member only</p>
            </div>
        </div>
      </div>
      <div class="icons1">
        <img src ="LinkedIn.png"/>
        <img src="Facebook Circled.png"/>
        <img src ="twit.png"/>
      </div>
    </div>
    <div class ="main_content">
        <p class="title_one">${items[i].title}</p>
        <p class="abstract_one">${items[i].abstract}</p>
        <img src ="${items[i].multimedia[0].url}" class ="quen"/>
        <p class="subsection">${items[i].des_facet[1]}</p>
        <p class ="lorem">Lorem ipsum dolor sit amet consectetur adipisicing elit. 
            Alias delectus, labore provident laudantium nesciunt magnam necessitatibus deleniti ut? 
            Consectetur iusto dolore pariatur ullam placeat ab, deserunt beatae eius non natus enim unde ducimus ad? 
            Voluptate illo aliquam ipsum nostrum eius, quae cum deserunt repudiandae, ducimus reiciendis maiores 
            culpa totam, ex doloribus ipsa similique quod? Veniam exercitationem aliquam assumenda omnis labore 
            quisquam doloribus temporibus? Laborum quos quae mollitia tempore est, neque odio sapiente maiores 
            veniam nihil illum corrupti. Illo dolorum quae perferendis sint? Commodi eum unde quis accusantium labore 
            libero cupiditate corrupti nisi sapiente earum suscipit ducimus error, mollitia deleniti dicta!</p>
        <div class="bookmark">    
          <div class="likes">
            <img src="Heart.png" >180</img>
            <img src="Speech Bubble.png">50</img>
          </div>
          <img src ="Bookmark.png"/>
        </div>  
    </div>
    </div> 
        `
      singlepage = htmlone;
      console.log(singlepage)
      articles.innerHTML += singlepage;  
    }
  }
} );

articles.addEventListener ('click', function(event){
  if(event.target.matches(".arrow")){
    articles.innerHTML ='';
    articles.innerHTML =`<p class="heading">Hello, world!</p>`;
    articles.innerHTML+=manypages;
  }
})














