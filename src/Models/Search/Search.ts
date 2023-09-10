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

}