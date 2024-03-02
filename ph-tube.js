const buttonContainer=document.getElementById("button-container");
const cardContainerDaddy=document.getElementById("card-container-daddy");
const cardContainer=document.getElementById("card-container");
let showCategory=1000;
const fetchData=()=>{
  fetch("https://openapi.programming-hero.com/api/videos/categories")
  .then(res=>res.json())
  .then(({data})=>{
      // button.innerText=data.category;
      // button.classList="btn";
      // buttonContainer.appendChild(button);
      // console.log(data.category);
      for(const buttonData of data ){
          // console.log(buttonData.category_id);
          const newButton=document.createElement("button");
    newButton.innerText=buttonData.category;
    newButton.classList="btn category-btn ";
    // newButton.classList.add('btn category-btn')
    newButton.addEventListener("click",()=>{
      fetchDataCategories(buttonData.category_id);
      const allButton=document.querySelectorAll('.category-btn');
      for(const singleButton of allButton){
        singleButton.classList.remove("bg-red-500");
        
      }
      newButton.classList.add('bg-red-500');

    });
    buttonContainer.appendChild(newButton);
    

   }   
}
  );
}
 const fetchDataCategories=(categoryID)=>{
  showCategory=categoryID;
  // console.log(categoryID);
   fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryID}`)
   .then(res=>res.json())
   .then(({data})=>{
     cardContainer.innerHTML='';
     cardContainerDaddy.innerHTML='';
    if(data.length===0){
    //  console.log("hello");
      cardContainerDaddy.innerHTML=`
       <div class="">
       <div class="flex justify-center"><img src='Icon.png'></div>
       <p class="text-center">sorry</p>
       </div>
      `;
    }

      for(const showAllDataVideo of data){
     
        const newCard=document.createElement("div");
        
        newCard.innerHTML=`
        <div class=" bg-base-100 ">
                      <figure><img src="${showAllDataVideo.thumbnail}" alt="Shoes" class="rounded-lg w-[400px] h-[250px]" /></figure>
                      <div class="flex mt-5">
                        <div><img src="${showAllDataVideo.authors[0].profile_picture}" alt="" class="rounded-full w-10 h-10"></div>
                        <div class="px-4">
                          <h2 class="card-title">${showAllDataVideo.title}</h2>
                          <p>${showAllDataVideo.authors[0].profile_name}</p>
                         <p>${showAllDataVideo.others.views}</p>
                      </div>
                      </div>
                    
        </div>
        `;
        cardContainer.appendChild(newCard);
        cardContainerDaddy.appendChild(cardContainer);
      }
     
   });
 }
fetchData();
fetchDataCategories(showCategory);
