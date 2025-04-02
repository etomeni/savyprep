import axios from "axios";


export const defaultUserLocation = {
    ip: "0.0.0.0",
    city: "unknown",
    region: "unknown",
    country: "unknown",
    isp: "unknown",
    lat: 0,
    lon: 0,
};

export async function getUserLocation() {
    try {
        // const response = (await axios.get("http://ip-api.com/json")).data;

        const apiUrl = "https://api.ipgeolocation.io/ipgeo?apiKey=a09ff42a6b0c4fc0871199818eefcfd3"
        const res = (await axios.get(apiUrl)).data;
        const response = {
            country: res.country_name,
            countryCode: res.country_code2,
            region: res.state_prov,
            city: res.city,
            zip: res.zipcode,
            lat: res.latitude,
            lon: res.longitude,
            timezone: res.time_zone.name,
            isp: res.isp,
            org: res.organization,
            ip: res.ip
        }

        return response;
    } catch (error) {
        console.log(error);

        const response = (await axios.get("https://ipapi.co/json/")).data;
        if (response.ip) {
            const location = {
                ip: response.ip,
                city: response.city,
                region: response.region,
                country: response.country_name,
                isp: response.org || response.asn,
                lat: response.latitude,
                lon: response.longitude,
            };
            return location;            
        }

        return defaultUserLocation
    }
}

export async function getCountries() {
    try {
        const url = "https://restcountries.com/v3.1/all?fields=name,flags,idd";
        // const response: countryInterface[] = (await axios.get(`${url}`)).data;
        const response = (await axios.get(`${url}`)).data;
        // console.log(response);

        response.sort((a: any, b: any) => {
            if (a.name.common < b.name.common) return -1;
            if (a.name.common > b.name.common) return 1;
            return 0;
        });
        
        return response;
    } catch (error: any) {
        const errorResponse = error.response.data;
        console.log(errorResponse);
        // return [];
    }
}

export async function getUserIP() {
    const res = await axios.get("https://api.ipify.org/?format=json");
    return res.data?.ip;
}

