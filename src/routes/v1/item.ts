import { Request, Response } from "express"
import { ItemNetworthCalculator } from "skyhelper-networth"

export default (req: Request, res: Response) => {
    const itemData = req.body.item as object

    const options = req.body.options as object

    const networthManager = new ItemNetworthCalculator(itemData)
    const networth = networthManager.getNetworth(options)
    const nonCosmeticNetworth = networthManager.getNonCosmeticNetworth(options)

    Promise.all([networth, nonCosmeticNetworth]).then(([networthResult, nonCosmeticNetworthResult]) => {
        res.json({
            networth: networthResult,
            nonCosmeticNetworth: nonCosmeticNetworthResult
        })
    }).catch((err) => {
        console.error(err)
        res.status(500).json({
            error: "An error occurred while calculating networth.",
            trace: err instanceof Error ? err.stack : undefined
        })
    })
}