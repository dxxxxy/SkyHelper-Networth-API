import { apiReference } from "@scalar/express-api-reference"
import express from "express"
import helmet from "helmet"
import path from "path"
import { fileURLToPath } from "url"
import { RegisterRoutes } from "./routes.js"

const app = express()
const port = process.env.PORT || 3000

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

//configuration
app.use(express.static(path.join(__dirname, "public"))) //serve static
app.use(express.json()) //json parsing
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            ...helmet.contentSecurityPolicy.getDefaultDirectives(),
            "script-src": ["'self'", "'unsafe-inline'", "cdn.jsdelivr.net"]
        }
    }
})) //security

//routes - tsoa
RegisterRoutes(app)

//openapi documentation
app.use(
    "/",
    apiReference({
        url: "/openapi.json"
    })
)

app.set("trust proxy", true) //nginx ip forwarding

app.listen(port, () => console.log(`Listening to http://localhost:${port}`))