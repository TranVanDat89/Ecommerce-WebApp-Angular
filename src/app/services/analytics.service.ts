import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { HttpUtilService } from "./http-util.service";
import { environment } from "../environments/environment";
import { Observable } from "rxjs";
import { ApiResponse } from "../responses/api.response";
import { StorageResponse } from "../responses/storage.response";

@Injectable({
    providedIn: 'root'
})
export class AnalyticsService {
    private apiAdminAnalytics = `${environment.apiBaseUrl}/admin/analytics/`;
    private http = inject(HttpClient);
    private httpUtilService = inject(HttpUtilService);

    private apiConfig = {
        headers: this.httpUtilService.createHeaders()
    }
    constructor() {
    }

    getAnalyticsProduct(): Observable<ApiResponse<StorageResponse<Object>>> {
        return this.http.get<ApiResponse<StorageResponse<Object>>>(this.apiAdminAnalytics + 'products')
    }
    getOutComeByMonth(year: number): Observable<ApiResponse<StorageResponse<Object>>> {
        return this.http.get<ApiResponse<StorageResponse<Object>>>(this.apiAdminAnalytics + `outcome-by-month?year=${year}`)

    }
}