import { playersData } from "@/data/players-data"
import { newsArticles } from "@/data/news-data"
import { matchesData as matchesJson } from "@/data/matches-data"

export type SearchResult = {
  players: Array<{ name: string; teamKey: string }>
  teams: Array<{ slug: string; name: string }>
  news: Array<{ id: string; slug: string; title: string; summary: string }>
  matches: Array<{ id: number; matchNumber: string; team1: string; team2: string; date: string }>
}

export function slugifyName(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
}

export function performSearch(query: string): SearchResult {
  const q = query.trim().toLowerCase()
  if (!q) {
    return { players: [], teams: [], news: [], matches: [] }
  }

  const players: Array<{ name: string; teamKey: string }> = []
  for (const [teamKey, team] of Object.entries(playersData as Record<string, any>)) {
    const teamPlayers: any[] = team?.players ?? []
    for (const player of teamPlayers) {
      const name: string = String(player?.name ?? "")
      const role: string = String(player?.role ?? "")
      if (name.toLowerCase().includes(q) || role.toLowerCase().includes(q)) {
        players.push({ name, teamKey })
      }
    }
  }

  const teams: Array<{ slug: string; name: string }> = []
  for (const [teamKey, team] of Object.entries(playersData as Record<string, any>)) {
    const humanName = team?.name || teamKey.replace(/-/g, " ")
    if (String(teamKey).toLowerCase().includes(q) || String(humanName).toLowerCase().includes(q)) {
      teams.push({ slug: teamKey, name: humanName })
    }
  }

  const news = newsArticles
    .filter((n) =>
      [n.title, n.summary, n.slug]
        .filter(Boolean)
        .some((s) => String(s).toLowerCase().includes(q)),
    )
    .map((n) => ({ id: n.id, slug: n.slug, title: n.title, summary: n.summary }))

  const matches = (matchesJson.matches ?? [])
    .filter((m: any) => {
      const team1 = String(m?.team1?.name ?? "").toLowerCase()
      const team2 = String(m?.team2?.name ?? "").toLowerCase()
      const matchNumber = String(m?.matchNumber ?? "").toLowerCase()
      return team1.includes(q) || team2.includes(q) || matchNumber.includes(q)
    })
    .map((m: any) => ({
      id: m.id,
      matchNumber: m.matchNumber,
      team1: m.team1?.name ?? "",
      team2: m.team2?.name ?? "",
      date: m.date ?? "",
    }))

  return { players, teams, news, matches }
}


