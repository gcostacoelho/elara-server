import axios from 'axios';
import { Injectable } from '@nestjs/common';

import { SearchDto } from '../Models/Search/Dtos/SearcDto';
import { Search } from '../Models/Search/Search';
import { HttpResponse, badRequest, serviceError, success } from '../types/http';
import { ElaraResponse } from 'src/types/ElaraResponse';


@Injectable()
export class SearchService {
    constructor(private readonly search: Search) { }

    private readonly googleUrl: string = "https://www.googleapis.com";
    private readonly bingUrl: string = "https://api.bing.microsoft.com";

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
}
