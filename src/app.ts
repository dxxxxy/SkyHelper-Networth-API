import { apiReference } from "@scalar/express-api-reference"
import express, { NextFunction, Request as ExRequest, Response as ExResponse } from "express"
import helmet from "helmet"
import iplim from "iplim"
import path from "path"
import { ValidateError } from "tsoa"
import { fileURLToPath } from "url"
import { RegisterRoutes } from "./routes.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const port = process.env.PORT || 3001

//serve static
app.use(express.static(path.join(__dirname, "public")))

//use ip rate limiting
app.use(iplim({ timeout: 1000 * 60, limit: 60, window: 1000 * 60, exclude: ["/"] }))

//use json parser
app.use(express.json({ limit: "3mb" }))

//use security middleware
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            ...helmet.contentSecurityPolicy.getDefaultDirectives(),
            "script-src": ["'self'", "'unsafe-inline'", "cdn.jsdelivr.net"]
        }
    }
}))

//init tsoa
RegisterRoutes(app)

//handle validation errors
app.use(function errorHandler(
    err: unknown,
    _req: ExRequest,
    res: ExResponse,
    next: NextFunction
): ExResponse | void {
    if (err instanceof ValidateError) {
        return res.status(422).json({
            message: "Validation Failed",
            details: err?.fields
        })
    }
    next()
})

//serve documentation
app.use("/",
    apiReference({
        url: "/openapi.json",
        pageTitle: "SkyHelper-Networth-API",
        hideClientButton: true,
        favicon: "/favicon.png"
    })
)

//fix nginx ip forwarding
app.set("trust proxy", true)

//start server
app.listen(port, () => console.log(`Listening to http://localhost:${port}`))