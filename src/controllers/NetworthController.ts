import {
    Item,
    ItemNetworthCalculator,
    NetworthOptions,
    NetworthResult,
    ProfileNetworthCalculator
} from "skyhelper-networth"
import { Body, Controller, Post, Response, Route, Tags } from "tsoa"

interface ProfileRequestBody {
    profile: object;
    museum?: object;
    bankBalance?: number;
    options?: NetworthOptions;
}

interface ItemRequestBody {
    item: object;
    options?: NetworthOptions;
}

interface ProfileNetworthResponse {
    networth: NetworthResult;
    nonCosmeticNetworth: NetworthResult;
}

interface ItemNetworthResponse {
    networth: Item;
    nonCosmeticNetworth: Item;
}

interface ErrorResponse {
    message: string;
}

interface ValidationErrorResponse extends ErrorResponse {
    details: Record<string, unknown>;
}

@Route("v1")
@Tags("Networth")
export class NetworthController extends Controller {
    @Post("profile")
    @Response<ValidationErrorResponse>(422, "Unprocessable Content")
    @Response<ErrorResponse>(429, "Too Many Requests")
    @Response<ErrorResponse>(500, "Internal Server Error")
    public async calculateProfile(@Body() body: ProfileRequestBody): Promise<ProfileNetworthResponse | ErrorResponse> {
        try {
            const networthManager = new ProfileNetworthCalculator(body.profile, body.museum, body.bankBalance)

            const networth = await networthManager.getNetworth(body.options)
            const nonCosmeticNetworth = await networthManager.getNonCosmeticNetworth(body.options)

            return { networth, nonCosmeticNetworth }
        } catch (err) {
            this.setStatus(500)
            return {
                message: err instanceof Error ? err.message : "An error occurred while calculating profile networth."
            }
        }
    }

    @Post("item")
    @Response<ValidationErrorResponse>(422, "Unprocessable Content")
    @Response<ErrorResponse>(429, "Too Many Requests")
    @Response<ErrorResponse>(500, "Internal Server Error")
    public async calculateItem(@Body() body: ItemRequestBody): Promise<ItemNetworthResponse | ErrorResponse> {
        try {
            const networthManager = new ItemNetworthCalculator(body.item)

            const networth = await networthManager.getNetworth(body.options)
            const nonCosmeticNetworth = await networthManager.getNonCosmeticNetworth(body.options)

            return { networth, nonCosmeticNetworth }
        } catch (err) {
            this.setStatus(500)
            return {
                message: err instanceof Error ? err.message : "An error occurred while calculating item networth."
            }
        }
    }
}
