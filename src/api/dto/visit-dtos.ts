import { CommonResponse } from "./common-response";

export type DailyVisitDTO = CommonResponse<{ date: string; count: number }>;
