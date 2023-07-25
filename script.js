let url="https://eonet.gsfc.nasa.gov/api/v3/events";
let cardArray=[];
let cards= document.getElementById("cards");



const getEventData= async (url)=>{
    try{
    let eventData=await fetch(url,{
    method:"GET",
    "Content-Type":"application/json"
    });
    let eventDataJson= await eventData.json();
  //  console.log(eventDataJson);
    return eventDataJson;
    }catch(err){
        console.log(err);
    }
}

const buildCard=(e,i)=>{
  console.log(e);
  let categories=" ";
  let dates=" ";
  for(let j=0;j<e.categories.length;j++){
  categories += e.categories[j].title;
  categories += ","
  }
  for(let j=0;j<e.geometry.length;j++){
    dates += e.geometry[j].date;
    dates += ", ";
    }

  cardArray[i] = `<div class="card mt-4 mx-5 col-8 col-lg-5 " >
  <div class="card-body">
    <h5 class="card-title">${e.title}</h5>
    <p class="card-text">Category of the disaster:  ${categories.slice(0,-1)}</p>
    <p class="card-text">For more info visit:  <a href="${e.link}">${e.link}</a></p>
    <p class="card-text">History of events at this location:  ${dates.slice(0,-2)}</p>
  </div>
</div>`

}


let DateBtn= document.getElementById("date-button");
let startDate;
let endDate;
DateBtn.onclick=()=>{
    cardArray=[]
    startDate= document.getElementById("start-date").value;
    console.log(startDate);
    endDate= document.getElementById("end-date").value;
    console.log(endDate);
    if(startDate<endDate){
    let eventData = getEventData(url+`?start=${startDate}&end=${endDate}`)
    .then((eventData)=>{
       console.log(eventData);
       eventData.events.forEach((e,i)=>{
       // console.log(e);
      buildCard(e,i);
       cards.innerHTML=cardArray.join('');
    });
    })
    }
}










