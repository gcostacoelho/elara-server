export class Search {
    filteredResultVideo(data: any) {
        try {
            const { items } = data;
            const video = items[0]; // Get first result
            const videoId = video.id.videoId

            const videoInformations = {
                videoUrl: `https://www.youtube.com/watch?v=${videoId}`,
                videoId,
                title: video.snippet.title,
                channel: video.snippet.channelTitle
            }

            return videoInformations;
        } catch (error) {
            return error;
        }
    }

    filteredResultWeb(data: any) {
        try {
            const infoResponse = data.webPages.value[0]; // Get first result

            const webInformations = {
                url: infoResponse.url,
                title: infoResponse.name,
                summary: infoResponse.snippet
            }

            return webInformations;
            
        } catch (error) {
            return error
        }
    }

    filteredResultWeather(data: any){
        try {
            const weatherInformations = {
                city: data.name,
                weatherDescription: data.weather.description,
                temp: data.main.temp.toFixed(),
                temp_min: data.main.temp_min.toFixed(),
                temp_max: data.main.temp_max.toFixed(),
                feels_like: data.main.feels_like.toFixed()
            }

            return {
                "onlyTempMessage": `No momento está fazendo ${weatherInformations.temp}°C`,
                "completeMessage": `No momento em ${weatherInformations.city} está fazendo ${weatherInformations.temp}°C com miníma de ${weatherInformations.temp_min}°C e máxima de ${weatherInformations.temp_max}°C`,
                weatherInformations
            }

        } catch (error) {
            
        }
    }

}