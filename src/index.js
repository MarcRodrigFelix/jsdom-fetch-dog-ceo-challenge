document.addEventListener('DOMContentLoaded', () => {
  
  const imgUrl = "https://dog.ceo/api/breeds/image/random/4" ;
  const breedUrl = 'https://dog.ceo/api/breeds/list/all';
  const dogImageDiv = document.getElementById('dog-image-container');
  const dogBreedsUl = document.getElementById('dog-breeds');
  const breedDropDown = document.getElementById('breed-dropdown');
  const eachBreed = [];
  let breeds = [];

  

  function fetchDataAndCreateImages(){
    return fetch(imgUrl)
      .then( response => { return response.json() })
      .then( json => { return renderDogImages(json['message']) })
  };


  function renderDogImages(dogImages){
        for (const dog of dogImages){
          const img = document.createElement('img')

          img.src = dog
          dogImageDiv.appendChild(img)
        }
  };


  function fetchDogBreedData(){
    return fetch(breedUrl)
    .then( response => { return response.json() })
    .then( function(json){
      breeds = json["message"]

      for (const breed in breeds){
        eachBreed.push(breed)

          const li = document.createElement('li')
          dogBreedsUl.appendChild(li)
          li.innerHTML = breed

          listListener(li)
      }
    })
  };


  function selectDogBreed(){
    const selectedDogs = []

    for (const dog of eachBreed){
      if (this.value == dog.charAt(0)){
        selectedDogs.push(dog)
      }
    }

    dogBreedsUl.innerHTML = ""

      selectedDogs.forEach(dog => {
        const createLi = document.createElement('li')
        dogBreedsUl.appendChild(createLi)
        createLi.innerText = dog
      })
  }


  function listListener(dogBreed){
    dogBreed.addEventListener('click', (e) => {
      e.target.style.color = 'blue'
      console.log(e.target.innerText)
    })
  }
  


  breedDropDown.addEventListener('change', selectDogBreed)
  

  fetchDataAndCreateImages()
  fetchDogBreedData()
})