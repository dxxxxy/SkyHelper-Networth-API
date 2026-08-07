# SkyHelper-Networth-API
An API wrapper for [Altpapier/SkyHelper-Networth](https://github.com/Altpapier/SkyHelper-Networth) with playground and detailed documentation built for _interoperability_ when developing networth-querying programs in runtimes other than Node. 

API and documentation hosted on [nw.dreamys.studio](https://nw.dreamys.studio), rate-limited to 60 requests per minute.

## Usage
You pass the same data you would to the node package, but as a JSON body instead. This means it is your job to query Hypixel for profile/item data.

See example at `example/example.js` for a Node.js example of how to query the API. This example falls short in demonstrating the use-case for this API. But if you are coding in Rust, C++, Java, etc. the use case becomes clear.

## Routes
- `/v1/profile`
- `/v1/item`

See documentation.

## Disclaimer
This is for educational purposes only. I am not responsible for any damage caused by this tool.

## License
GPLv3 © dxxxxy