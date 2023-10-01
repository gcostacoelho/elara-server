import axios from 'axios';
import { Injectable } from '@nestjs/common';

import { SearchDto } from '../Models/Search/Dtos/SearchDto';
import { SearchWeatherDto } from '../Models/Search/Dtos/SearchWeatherDto';
import { Search } from '../Models/Search/Search';
import { HttpResponse, badRequest, serviceError, success } from '../types/http';
import { ElaraResponse } from '../types/ElaraResponse';
import { stat } from 'fs';

@Injectable()
export class SearchService {
    constructor(private readonly search: Search) { }

    private readonly googleUrl: string = "https://www.googleapis.com";
    private readonly bingUrl: string = "https://api.bing.microsoft.com";
    private readonly weatherUrl: string = "https://api.openweathermap.org";

    async searchWeb(bodyReq: SearchDto): Promise<HttpResponse> {
        try {
            const { data, status } = await axios.get(`${this.bingUrl}/v7.0/search`, {
                params: {
                    mkt: "pt-BR",
                    q: bodyReq.request,
                },
                headers: {
                    "Ocp-Apim-Subscription-Key": process.env.BING_TOKEN,
                }
            });

            if (status === 200) {
                const filteredResult = this.search.filteredResultWeb(data);

                const response: ElaraResponse = {
                    request: bodyReq.request,
                    response: filteredResult
                }

                return success(response);
            }

            return badRequest(data);
        } catch (error) {
            return serviceError(error)
        }
    }

    async searchVideo(bodyReq: SearchDto): Promise<HttpResponse> {
        try {
            const { data, status } = await axios.get(`${this.googleUrl}/youtube/v3/search`, {
                params: {
                    key: process.env.GOOGLE_TOKEN,
                    type: "video",
                    part: "snippet",
                    regionCode: "BR",
                    relevanceLanguage: "pt-br",
                    q: bodyReq.request
                }
            });

            if (status === 200) {
                const filteredResult = this.search.filteredResultVideo(data);

                const response: ElaraResponse = {
                    request: bodyReq,
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
            const { cityName, countryCode, stateName } = request;

            const { data, status } = await axios.get(`${this.weatherUrl}/geo/1.0/direct`, {
                params: {
                    q: `${cityName}, ${countryCode}`,
                    appid: process.env.WEATHER_API_TOKEN
                }
            });

            const dataPerState = data.find((city: any) => city.state == stateName)
            
            const { lat, lon } = dataPerState;
            
            if (status == 200 && data.length > 0) {
                const { data, status } = await axios.get(`${this.weatherUrl}/data/2.5/weather`, {
                    params: {
                        lat,
                        lon,
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
            }

            return badRequest("Erro ao puxar os dados, verifique e tente novamente");

        } catch (error) {
            return serviceError(error)
        }
    }
}
