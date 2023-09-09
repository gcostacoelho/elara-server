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

}