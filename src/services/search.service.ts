import axios from 'axios';
import { Injectable } from '@nestjs/common';

import { SearchWeatherDto } from '../Models/Search/Dtos/SearchWeatherDto';
import { Search } from '../Models/Search/Search';
import { ElaraResponse } from '../types/ElaraResponse';
import { HttpResponse, badRequest, serviceError, success } from '../types/http';

@Injectable()
export class SearchService {
    constructor(private readonly search: Search) { }

    private readonly googleUrl: string = "https://www.googleapis.com";
    private readonly bingUrl: string = "https://api.bing.microsoft.com";
    private readonly weatherUrl: string = "https://api.openweathermap.org";

    async searchWeb(req: string): Promise<HttpResponse> {
        try {
            const { data, status } = await axios.get(`${this.bingUrl}/v7.0/search`, {
                params: {
                    mkt: "pt-BR",
                    q: req,
                },
                headers: {
                    "Ocp-Apim-Subscription-Key": process.env.BING_TOKEN,
                }
            });

            if (status === 200) {
                const filteredResult = this.search.filteredResultWeb(data);

                const response: ElaraResponse = {
                    request: req,
                    response: filteredResult
                }

                return success(response);
            }

            return badRequest(data);
        } catch (error) {
            return serviceError(error)
        }
    }

    async searchVideo(req: string): Promise<HttpResponse> {
        try {
            const { data, status } = await axios.get(`${this.googleUrl}/youtube/v3/search`, {
                params: {
                    key: process.env.GOOGLE_TOKEN,
                    type: "video",
                    part: "snippet",
                    regionCode: "BR",
                    relevanceLanguage: "pt-br",
                    q: req
                }
            });

            if (status === 200) {
                const filteredResult = this.search.filteredResultVideo(data);

                const response: ElaraResponse = {
                    request: req,
                    response: filteredResult
                }

                return success(response);
            }

            return badRequest(data);
        } catch (error) {
            return serviceError(error)
        }
    }

    async searchWeather(request: SearchWeatherDto): Promise<HttpResponse> {
        try {
            const { cityName, countryCode } = request;

            const { data, status } = await axios.get(`${this.weatherUrl}/data/2.5/weather`, {
                params: {
                    q: `${cityName}, ${countryCode}`,
                    appid: process.env.WEATHER_API_TOKEN,
                    units: "metric",
                    lang: "pt_br"
                }
            });

            if (status === 200) {
                const filteredResult = this.search.filteredResultWeather(data);

                const response: ElaraResponse = {
                    request,
                    response: filteredResult
                }

                return success(response);
            }

            return badRequest("Erro ao puxar os dados, verifique e tente novamente");

        } catch (error) {
            return serviceError(error)
        }
    }
}
