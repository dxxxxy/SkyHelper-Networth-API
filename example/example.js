let profileData, museumData, profileRes, museumRes

// noinspection JSUnresolvedReference
const API_KEY = process.env.API_KEY

try {
    const profileReq = await fetch(`https://api.hypixel.net/v2/skyblock/profile?key=${API_KEY}&profile=d3df3ccc-ffd3-473f-bbba-311d5329bd25`)
    profileRes = await profileReq.json()
    profileData = profileRes.profile.members["28667672039044989b0019b14a2c34d6"]
} catch (error) {
    console.log(profileRes)
    console.error("Error fetching profile data:", error)
}

try {
    const museumReq = await fetch(`https://api.hypixel.net/v2/skyblock/museum?key=${API_KEY}&profile=d3df3ccc-ffd3-473f-bbba-311d5329bd25`)
    museumRes = await museumReq.json()
    museumData = museumRes.members["28667672039044989b0019b14a2c34d6"]
} catch (error) {
    console.log(museumRes)
    console.error("Error fetching museum data:", error)
}

try {
    const networthReq = await fetch("http://localhost:3001/v1/profile", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            profile: profileData,
            bankBalance: profileRes.profile.banking.balance,
            museum: museumData
        })
    })

    const networth = await networthReq.json()
    console.log(networth)
} catch (error) {
    console.error("Error fetching networth:", error)
}

