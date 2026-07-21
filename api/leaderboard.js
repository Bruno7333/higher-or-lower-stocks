import db from "./_lib/supabase.js"

async function addScore(name, score){
    if (typeof name !== "string") {
        const err = new Error("name must be a string");
        err.status = 400;
        throw err;
    }
    name = name.trim();
    if (name.length < 1 || name.length > 20) {
        const err = new Error("name must be 1-20 characters");
        err.status = 400;
        throw err;
    }
    if((!Number.isInteger(score)) || score < 0 || score >= 1000){
        const err = new Error("score must be an integer between 0 and 999");
        err.status = 400;
        throw err;
    }
    const { error } = await db.from("scores").insert({ name, score });
    if (error) throw new Error(error.message); // no .status -> handler treats as 500
}

async function getLeaderboard(type){
    // The switch's only job: turn the type into a cutoff date (null = no cutoff).
    let cutoff;
    switch(type){
        case "all_time":
            cutoff = null; // no time window, include everything
            break;
        case "weekly":
            cutoff = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000); // last 7 days
            break;
        case "daily":
            cutoff = new Date(Date.now() - 24 * 60 * 60 * 1000); // last 24 hours
            break;
        default:
            const err = new Error(`unknown leaderboard type: ${type}`);
            err.status = 400;
            throw err;
    }

    // Build the query in steps: the filter is only added when there is a cutoff.
    let query = db
        .from("scores")
        .select("name, score, created_at")
        .order("score", { ascending: false })
        .order("created_at", { ascending: true }) // tie-break: earlier score wins
        .limit(10);

    if (cutoff) query = query.gte("created_at", cutoff.toISOString());

    const { data, error } = await query;
    if (error) throw new Error(error.message);
    return data;
}

export default async function handler(req, res){// if its a get request, reply with the data asked for, if its a post request update the database with a new entry, assuming
    try {
        if(req.method === "GET"){
            const data = await getLeaderboard(req.query.period || "all_time");
            return res.status(200).json(data);
        }
        if (req.method === "POST"){
            //validate, insert into database, and return 201
            const { name, score } = req.body || {};
            await addScore(name, score);
            return res.status(201).json({ ok: true });
        }
        return res.status(405).json({ error: "method not allowed"});
    }catch (e){
        console.error(e);
        return res.status(e.status || 500).json({ error: e.message });
    }
}