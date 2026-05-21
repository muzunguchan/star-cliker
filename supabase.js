// ================== SUPABASE SETUP ==================
const SUPABASE_URL = 'https://YOUR-PROJECT-REF.supabase.co';     // ← Change this
const SUPABASE_ANON_KEY = 'YOUR-ANON-KEY-HERE';                  // ← Change this

const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Submit score
async function submitScore(playerName, score) {
    if (!playerName || score < 50) return false;   // basic anti-cheat

    const { error } = await supabase
        .from('leaderboard')
        .insert([{ 
            name: playerName.trim().substring(0, 20), 
            score: Math.floor(score) 
        }]);

    if (error) {
        console.error("Submit failed:", error);
        return false;
    }
    return true;
}

// Get leaderboard
async function getLeaderboard() {
    const { data, error } = await supabase
        .from('leaderboard')
        .select('name, score')
        .order('score', { ascending: false })
        .limit(10);

    if (error) {
        console.error("Leaderboard fetch failed:", error);
        return [];
    }
    return data;
}
