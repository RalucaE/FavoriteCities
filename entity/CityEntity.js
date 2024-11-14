class CityEntity {
    constructor(name, country, country_code, population, timezone, latitude, longitude, temperature_2m, wind_speed_10m) {
        this.name = name;
        this.country = country;
        this.country_code = country_code;
        this.population = population;
        this.timezone = timezone;
        this.latitude = latitude;
        this.longitude = longitude;
        this.temperature_2m = temperature_2m;
        this.wind_speed_10m = wind_speed_10m;
    }
}
module.exports = CityEntity;
