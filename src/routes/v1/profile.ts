import { Request, Response } from "express"
import { ProfileNetworthCalculator } from "skyhelper-networth"

export default (req: Request, res: Response) => {
    const profileData = req.body.profile as object
    const museumData = req.body.museum as object
    const bankBalance = req.body.bankBalance as number

    const options = req.body.options as object

    const networthManager = new ProfileNetworthCalculator(profileData, museumData, bankBalance)
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