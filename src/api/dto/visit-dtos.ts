import { CommonResponse } from "./common-response";

export interface DailyVisit
{
    date: string;   // UTC calendar day, "YYYY-MM-DD"
    count: number;
}

export type DailyVisitDTO = CommonResponse<DailyVisit>;
export type DailyVisitListDTO = CommonResponse<DailyVisit[]>;
