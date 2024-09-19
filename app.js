window.addEventListener('load', ()=>{
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationCity = document.querySelector('.location-city');
    let iconDisplay = document.querySelector('.icon-display');

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            console.log(position);

            const proxy ='https://cors-anywhere.herokuapp.com/';
            const api = `${proxy}http://api.weatherapi.com/v1/current.json?key=${privateKey}&q=${lat},${long}&aqi=no`;

            fetch(api)
            .then(response =>{
                return response.json();
            })
            .then(data =>{
                console.log(data);
                const temperature = data.current.temp_f;
                const tempText = data.current.condition.text;
                const localCity = data.location.name;
                const region = data.location.region;
                const regionAbbr = region.substr(0,2).toUpperCase();

                let iconLocation = data.current.condition.icon;
                let icon = iconLocation.substring(2);
              
                
               
                temperatureDegree.textContent = `${temperature}° F`;
                temperatureDescription.textContent = tempText;
                locationCity.textContent = `${localCity}, ${regionAbbr}`;
                iconDisplay.innerHTML = `<img src="https://${icon}">`;
            })
        });

       
    } else {
        h1.textContent = "Please enable geolocation"
    }

   

});

