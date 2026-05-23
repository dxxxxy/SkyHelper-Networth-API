import {
    Item,
    ItemNetworthCalculator,
    NetworthOptions,
    NetworthResult,
    ProfileNetworthCalculator
} from "skyhelper-networth"
import { Body, Controller, Post, Route, Tags } from "tsoa"

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

export interface ProfileNetworthResponse {
    networth: NetworthResult;
    nonCosmeticNetworth: NetworthResult;
}

export interface ItemNetworthResponse {
    networth: Item;
    nonCosmeticNetworth: Item;
}

@Route("v1")
@Tags("Networth")
export class NetworthController extends Controller {
    @Post("profile")
    public async calculateProfile(@Body() body: ProfileRequestBody): Promise<ProfileNetworthResponse> {
        const networthManager = new ProfileNetworthCalculator(body.profile as object, body.museum as object, body.bankBalance as number)

        const networth = await networthManager.getNetworth(body.options)
        const nonCosmeticNetworth = await networthManager.getNonCosmeticNetworth(body.options)

        return { networth, nonCosmeticNetworth }
    }

    @Post("item")
    public async calculateItem(@Body() body: ItemRequestBody): Promise<ItemNetworthResponse> {
        const networthManager = new ItemNetworthCalculator(body.item)

        const networth = await networthManager.getNetworth(body.options)
        const nonCosmeticNetworth = await networthManager.getNonCosmeticNetworth(body.options)

        return { networth, nonCosmeticNetworth }
    }
}
