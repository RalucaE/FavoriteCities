class CityModel {
    constructor(name, country, country_code, population, latitude, longitude, temperature_2m, wind_speed_10m, description,topSights,imagePath) {
        this.name = name;
        this.country = country;
        this.country_code = country_code;
        this.population = population;
        this.latitude = latitude;
        this.longitude = longitude;
        this.temperature_2m = temperature_2m;
        this.wind_speed_10m = wind_speed_10m;
        this.description = description;
        this.topSights = topSights;
        this.imagePath = imagePath;
    }
}
module.exports = CityModel;