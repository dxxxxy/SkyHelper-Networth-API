import { apiReference } from "@scalar/express-api-reference"
import express from "express"
import helmet from "helmet"
import v1routes from "./routes/v1/index.js"
import swagger from "swagger-ui-express"
import swaggerDocument from "./public/openapi.json" with { type: "json" }

const app = express()
const port = process.env.PORT || 3000

//configuration
app.use(express.json()) //json parsing
app.use(express.static("public")) //static files
// app.use(helmet({
//     contentSecurityPolicy: {
//         directives: {
//             //keep default helmet settings but allow jsdelivr
//             ...helmet.contentSecurityPolicy.getDefaultDirectives(),
//             "script-src": ["'self'", "'unsafe-inline'", "cdn.jsdelivr.net"],
//         },
//     },
// })) //security
app.use(
    '/reference',
    apiReference({
        // Put your OpenAPI url here:
        url: '/openapi.json',
    }),
)
app.set("trust proxy", true) //nginx ip forwarding

//routes
app.use("/v1", v1routes)

app.listen(port, () => console.log(`Listening to http://localhost:${port}`))