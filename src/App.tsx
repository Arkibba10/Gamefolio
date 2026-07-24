import { AnimatePresence, motion } from 'framer-motion'
import { BarChart3, Bookmark, ChevronDown, Clock3, Compass, ExternalLink, Flame, Heart, Home, Library, Menu, Play, Radio, Search, Settings, Shield, Shuffle, Sparkles, Star, Trophy, UserRound, X, Youtube } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'

type Game = {
  id: number; title: string; year: number; studio: string; genre: string; platform: string; rating: number; hours: number; progress: number; status: string; cover: string; accent: string; description: string; tags: string[]
}

const steamCover = (id: number) => `https://cdn.akamai.steamstatic.com/steam/apps/${id}/library_600x900_2x.jpg`

const games: Game[] = [
  { id: 1659420, title: "Uncharted 4: A Thief's End", year: 2016, studio: 'Naughty Dog', genre: 'Action Adventure', platform: 'PlayStation', rating: 9.8, hours: 22, progress: 100, status: 'Masterpiece', cover: steamCover(1659420), accent: '#e7b25c', description: "Nathan Drake's final adventure is a cinematic, heartfelt hunt for lost pirate treasure.", tags: ['Favorite', 'Completed', 'Story Rich', 'AAA'] },
  { id: 1659421, title: 'Uncharted: The Lost Legacy', year: 2017, studio: 'Naughty Dog', genre: 'Action Adventure', platform: 'PlayStation', rating: 9.1, hours: 10, progress: 100, status: 'Completed', cover: steamCover(1659420), accent: '#e47c45', description: 'Chloe and Nadine make a brilliant duo in a focused adventure through the Western Ghats.', tags: ['Completed', 'Story Rich', 'AAA'] },
  { id: 2322010, title: 'God of War Ragnarök', year: 2022, studio: 'Santa Monica Studio', genre: 'Action Adventure', platform: 'PlayStation', rating: 9.8, hours: 48, progress: 100, status: 'Masterpiece', cover: steamCover(2322010), accent: '#8bd5ee', description: 'A spectacular and emotional conclusion to the Norse saga of Kratos and Atreus.', tags: ['Favorite', 'Completed', 'Story Rich', 'AAA'] },
  { id: 1593500, title: 'God of War', year: 2018, studio: 'Santa Monica Studio', genre: 'Action Adventure', platform: 'PlayStation', rating: 9.7, hours: 36, progress: 100, status: 'Masterpiece', cover: steamCover(1593500), accent: '#cf6448', description: 'A powerful reinvention built around fatherhood, restraint, and mythic combat.', tags: ['Favorite', 'Completed', 'Story Rich', 'AAA', 'Replay List'] },
  { id: 1888930, title: 'The Last of Us Part I', year: 2022, studio: 'Naughty Dog', genre: 'Survival Horror', platform: 'PlayStation', rating: 9.7, hours: 18, progress: 100, status: 'Masterpiece', cover: steamCover(1888930), accent: '#8ca36d', description: 'A brutal, intimate journey whose characters make every quiet moment matter.', tags: ['Favorite', 'Completed', 'Story Rich', 'Horror'] },
  { id: 1812090, title: 'Escape Academy', year: 2022, studio: 'Coin Crew Games', genre: 'Puzzle', platform: 'PC', rating: 8.0, hours: 9, progress: 100, status: 'Completed', cover: steamCover(1812090), accent: '#f2cd4b', description: 'Clever escape rooms, satisfying solutions, and even better with a co-op partner.', tags: ['Completed', 'Puzzle', 'Indie', 'Multiplayer'] },
  { id: 934700, title: 'Dead Island 2', year: 2023, studio: 'Dambuster Studios', genre: 'Action RPG', platform: 'PC', rating: 8.2, hours: 27, progress: 100, status: 'Completed', cover: steamCover(934700), accent: '#ef7949', description: 'Sunny Hell-A is a wonderfully messy playground for creative zombie destruction.', tags: ['Completed', 'Horror', 'Multiplayer', 'AAA'] },
  { id: 1817190, title: 'Marvel’s Spider-Man: Miles Morales', year: 2020, studio: 'Insomniac Games', genre: 'Action Adventure', platform: 'PlayStation', rating: 9.0, hours: 14, progress: 100, status: 'Completed', cover: steamCover(1817190), accent: '#e84650', description: 'A compact, stylish coming-of-age story with effortless traversal and electric combat.', tags: ['Favorite', 'Completed', 'Open World', 'AAA'] },
  { id: 1817070, title: 'Marvel’s Spider-Man Remastered', year: 2018, studio: 'Insomniac Games', genre: 'Action Adventure', platform: 'PlayStation', rating: 9.4, hours: 34, progress: 100, status: 'Completed', cover: steamCover(1817070), accent: '#e9363f', description: 'The definitive superhero power fantasy, anchored by a genuinely human Peter Parker.', tags: ['Favorite', 'Completed', 'Open World', 'Story Rich'] },
  { id: 2651280, title: 'Marvel’s Spider-Man 2', year: 2023, studio: 'Insomniac Games', genre: 'Action Adventure', platform: 'PlayStation', rating: 9.5, hours: 31, progress: 100, status: 'Masterpiece', cover: steamCover(2651280), accent: '#e84850', description: 'Two Spider-Men, faster traversal, and an ambitious emotional symbiote story.', tags: ['Favorite', 'Completed', 'Open World', 'AAA'] },
  { id: 2215430, title: 'Ghost of Tsushima', year: 2020, studio: 'Sucker Punch', genre: 'Action Adventure', platform: 'PlayStation', rating: 9.6, hours: 61, progress: 100, status: 'Masterpiece', cover: steamCover(2215430), accent: '#d75545', description: 'A breathtaking samurai epic where wind, steel, and silence guide the journey.', tags: ['Favorite', 'Completed', 'Open World', 'Story Rich'] },
  { id: 13600, title: 'Prince of Persia: The Sands of Time', year: 2003, studio: 'Ubisoft', genre: 'Action Adventure', platform: 'PC', rating: 9.3, hours: 11, progress: 100, status: 'Masterpiece', cover: steamCover(13600), accent: '#e6bd66', description: 'Timeless platforming, a magical atmosphere, and one unforgettable rewind mechanic.', tags: ['Favorite', 'Completed', 'Replay List'] },
  { id: 13500, title: 'Prince of Persia: Warrior Within', year: 2004, studio: 'Ubisoft', genre: 'Action Adventure', platform: 'PC', rating: 9.2, hours: 16, progress: 100, status: 'Completed', cover: steamCover(13500), accent: '#9c735a', description: 'A darker, tougher sequel with intricate time travel and aggressive free-form combat.', tags: ['Favorite', 'Completed', 'Replay List'] },
  { id: 13530, title: 'Prince of Persia: The Two Thrones', year: 2005, studio: 'Ubisoft', genre: 'Action Adventure', platform: 'PC', rating: 9.0, hours: 13, progress: 100, status: 'Completed', cover: steamCover(13530), accent: '#dfb672', description: 'The Sands trilogy closes with speed kills, dual identities, and a return to Babylon.', tags: ['Completed', 'Replay List'] },
  { id: 19980, title: 'Prince of Persia', year: 2008, studio: 'Ubisoft Montreal', genre: 'Action Adventure', platform: 'PC', rating: 8.5, hours: 14, progress: 100, status: 'Completed', cover: steamCover(19980), accent: '#5eb9d0', description: 'A gorgeous storybook world with flowing movement and a uniquely gentle rhythm.', tags: ['Completed', 'Hidden Gems'] },
  { id: 1259420, title: 'Days Gone', year: 2019, studio: 'Bend Studio', genre: 'Open World', platform: 'PlayStation', rating: 9.8, hours: 52, progress: 100, status: 'Masterpiece', cover: steamCover(1259420), accent: '#9caa82', description: 'A slow-burn biker story elevated by terrifying hordes and a lonely Pacific Northwest.', tags: ['Favorite', 'Completed', 'Open World', 'Horror', 'AAA'] },
  { id: 271590, title: 'Grand Theft Auto V', year: 2013, studio: 'Rockstar North', genre: 'Open World', platform: 'PC', rating: 9.2, hours: 126, progress: 100, status: 'Completed', cover: steamCover(271590), accent: '#70b26c', description: 'A sprawling crime sandbox packed with spectacle, satire, and endless diversions.', tags: ['Favorite', 'Completed', 'Open World', 'Multiplayer'] },
  { id: 204100, title: 'Max Payne 3', year: 2012, studio: 'Rockstar Studios', genre: 'Shooter', platform: 'PC', rating: 9.0, hours: 12, progress: 100, status: 'Completed', cover: steamCover(204100), accent: '#e2b65d', description: 'Weighty gunplay and relentless cinematic style make every firefight memorable.', tags: ['Completed', 'Shooter', 'Story Rich'] },
  { id: -1, title: 'Minecraft', year: 2011, studio: 'Mojang Studios', genre: 'Sandbox', platform: 'PC', rating: 9.3, hours: 320, progress: 78, status: 'Playing', cover: 'https://upload.wikimedia.org/wikipedia/en/b/b6/Minecraft_2024_cover_art.png', accent: '#76b852', description: 'An endless creative home where every new world begins with possibility.', tags: ['Favorite', 'Currently Playing', 'Open World', 'Multiplayer'] },
  { id: 203160, title: 'Tomb Raider', year: 2013, studio: 'Crystal Dynamics', genre: 'Action Adventure', platform: 'PC', rating: 8.9, hours: 19, progress: 100, status: 'Completed', cover: steamCover(203160), accent: '#64a2a3', description: 'Lara Croft’s intense origin story balances survival, exploration, and blockbuster action.', tags: ['Completed', 'Story Rich', 'AAA'] },
  { id: 1903340, title: 'Clair Obscur: Expedition 33', year: 2025, studio: 'Sandfall Interactive', genre: 'RPG', platform: 'PC', rating: 9.8, hours: 58, progress: 100, status: 'Masterpiece', cover: steamCover(1903340), accent: '#d6c399', description: 'A bold, beautiful RPG with painterly melancholy and thrilling reactive combat.', tags: ['Favorite', 'Completed', 'Story Rich', 'RPG'] },
  { id: 207610, title: 'The Walking Dead: Season One', year: 2012, studio: 'Telltale Games', genre: 'Narrative Adventure', platform: 'PC', rating: 9.6, hours: 13, progress: 100, status: 'Masterpiece', cover: steamCover(207610), accent: '#a8784e', description: 'Lee and Clementine’s journey remains one of gaming’s most affecting stories.', tags: ['Favorite', 'Completed', 'Story Rich', 'Horror'] },
  { id: 261030, title: 'The Walking Dead: Season Two', year: 2013, studio: 'Telltale Games', genre: 'Narrative Adventure', platform: 'PC', rating: 8.9, hours: 11, progress: 100, status: 'Completed', cover: steamCover(261030), accent: '#8395a0', description: 'Clementine steps forward in a colder, harsher chapter shaped by impossible choices.', tags: ['Completed', 'Story Rich', 'Horror'] },
  { id: 536220, title: 'The Walking Dead: A New Frontier', year: 2016, studio: 'Telltale Games', genre: 'Narrative Adventure', platform: 'PC', rating: 8.1, hours: 10, progress: 100, status: 'Completed', cover: steamCover(536220), accent: '#bf6f45', description: 'A new family takes center stage while Clementine’s path continues alongside them.', tags: ['Completed', 'Story Rich', 'Horror'] },
  { id: 866800, title: 'The Walking Dead: The Final Season', year: 2018, studio: 'Telltale Games', genre: 'Narrative Adventure', platform: 'PC', rating: 9.4, hours: 12, progress: 100, status: 'Masterpiece', cover: steamCover(866800), accent: '#d3a253', description: 'A moving, hard-earned conclusion to Clementine’s long road to finding a home.', tags: ['Favorite', 'Completed', 'Story Rich', 'Horror'] },
  { id: 883710, title: 'Resident Evil 2', year: 2019, studio: 'CAPCOM', genre: 'Survival Horror', platform: 'PC', rating: 9.3, hours: 18, progress: 100, status: 'Completed', cover: steamCover(883710), accent: '#d23f3f', description: 'Raccoon City rebuilt as a tense, beautifully paced survival-horror labyrinth.', tags: ['Favorite', 'Completed', 'Horror'] },
  { id: 952060, title: 'Resident Evil 3', year: 2020, studio: 'CAPCOM', genre: 'Survival Horror', platform: 'PC', rating: 8.2, hours: 8, progress: 100, status: 'Completed', cover: steamCover(952060), accent: '#e67a42', description: 'A short, explosive escape from Raccoon City with Jill Valentine at her best.', tags: ['Completed', 'Horror'] },
  { id: 2050650, title: 'Resident Evil 4', year: 2023, studio: 'CAPCOM', genre: 'Survival Horror', platform: 'PC', rating: 9.6, hours: 24, progress: 100, status: 'Masterpiece', cover: steamCover(2050650), accent: '#698a86', description: 'A masterful remake that modernizes a classic without losing its strange personality.', tags: ['Favorite', 'Completed', 'Horror', 'Replay List'] },
  { id: 21690, title: 'Resident Evil 5', year: 2009, studio: 'CAPCOM', genre: 'Action Horror', platform: 'PC', rating: 8.3, hours: 15, progress: 100, status: 'Completed', cover: steamCover(21690), accent: '#d6b15d', description: 'Big action, memorable set pieces, and some of the series’ most entertaining co-op.', tags: ['Completed', 'Horror', 'Multiplayer'] },
  { id: 221040, title: 'Resident Evil 6', year: 2012, studio: 'CAPCOM', genre: 'Action Horror', platform: 'PC', rating: 7.8, hours: 24, progress: 100, status: 'Completed', cover: steamCover(221040), accent: '#4f88ac', description: 'An enormous, chaotic action-horror package with four intersecting campaigns.', tags: ['Completed', 'Horror', 'Multiplayer'] },
  { id: 418370, title: 'Resident Evil 7 Biohazard', year: 2017, studio: 'CAPCOM', genre: 'Survival Horror', platform: 'PC', rating: 9.1, hours: 13, progress: 100, status: 'Completed', cover: steamCover(418370), accent: '#c5ad72', description: 'A claustrophobic first-person nightmare that made Resident Evil frightening again.', tags: ['Favorite', 'Completed', 'Horror'] },
  { id: 1196590, title: 'Resident Evil Village', year: 2021, studio: 'CAPCOM', genre: 'Survival Horror', platform: 'PC', rating: 9.0, hours: 15, progress: 100, status: 'Completed', cover: steamCover(1196590), accent: '#d9c593', description: 'Gothic spectacle and varied horror collide in Ethan Winters’ final journey.', tags: ['Completed', 'Horror', 'Story Rich'] },
  { id: 3764200, title: 'Resident Evil Requiem', year: 2026, studio: 'CAPCOM', genre: 'Survival Horror', platform: 'PC', rating: 9.8, hours: 0, progress: 0, status: 'Most Wanted', cover: steamCover(3764200), accent: '#b84c48', description: 'The next descent into survival horror, waiting in the archive for release day.', tags: ['Favorite', 'Wishlist', 'Horror', 'AAA'] },
  { id: 2358720, title: 'Black Myth: Wukong', year: 2024, studio: 'Game Science', genre: 'Action RPG', platform: 'PC', rating: 9.2, hours: 47, progress: 100, status: 'Completed', cover: steamCover(2358720), accent: '#d4a45f', description: 'Mythic scale, spectacular bosses, and an unforgettable journey inspired by legend.', tags: ['Favorite', 'Completed', 'Action RPG', 'AAA'] },
  { id: 1426210, title: 'It Takes Two', year: 2021, studio: 'Hazelight Studios', genre: 'Co-op Adventure', platform: 'PC', rating: 9.4, hours: 14, progress: 100, status: 'Completed', cover: steamCover(1426210), accent: '#d56a9f', description: 'A joyful co-op invention machine that never stops finding new ways to surprise.', tags: ['Favorite', 'Completed', 'Multiplayer', 'Puzzle'] },
  { id: 3768760, title: '007 First Light', year: 2026, studio: 'IO Interactive', genre: 'Action Adventure', platform: 'PC', rating: 9.4, hours: 8, progress: 22, status: 'Playing', cover: steamCover(3768760), accent: '#e2c675', description: 'A young Bond earns his number in IO Interactive’s cinematic spy adventure.', tags: ['Currently Playing', 'Action Adventure', 'Story Rich', 'AAA'] },
  { id: -10, title: 'VALORANT', year: 2020, studio: 'Riot Games', genre: 'Competitive Shooter', platform: 'PC', rating: 9.1, hours: 480, progress: 74, status: 'Competitive', cover: 'https://upload.wikimedia.org/wikipedia/en/b/ba/Valorant_cover.jpg', accent: '#ff4655', description: 'Precision gunplay, clutch rounds, and the competitive arena where K4K4R0TT comes alive.', tags: ['Online', 'Multiplayer', 'Shooter', 'Currently Playing'] },
  { id: 945360, title: 'Among Us', year: 2018, studio: 'Innersloth', genre: 'Social Deduction', platform: 'PC', rating: 8.4, hours: 61, progress: 100, status: 'Online', cover: steamCover(945360), accent: '#42c6dd', description: 'Crewmates, impostors, and unforgettable chaos with friends.', tags: ['Online', 'Multiplayer', 'Completed'] },
  { id: 2644470, title: 'PICO PARK 2', year: 2024, studio: 'TECOPARK', genre: 'Co-op Puzzle', platform: 'PC', rating: 8.7, hours: 18, progress: 100, status: 'Online', cover: steamCover(2644470), accent: '#f6d94b', description: 'Tiny cats, simple puzzles, and maximum co-op communication chaos.', tags: ['Online', 'Multiplayer', 'Puzzle', 'Completed'] },
  { id: 4704690, title: 'MECCHA CHAMELEON', year: 2026, studio: 'Studio WG', genre: 'Online Action', platform: 'PC', rating: 8.5, hours: 14, progress: 60, status: 'Online', cover: steamCover(4704690), accent: '#76e887', description: 'Colorful mechanical action and fast online sessions with the squad.', tags: ['Online', 'Multiplayer', 'Action'] },
  { id: -11, title: 'Free Fire', year: 2017, studio: 'Garena', genre: 'Battle Royale', platform: 'Mobile', rating: 9.0, hours: 350, progress: 100, status: 'Tournament', cover: 'https://upload.wikimedia.org/wikipedia/en/5/5f/Garena_Free_Fire_2021_logo.png', accent: '#ff9b35', description: 'The tournament battleground behind Arkibba’s original YouTube era.', tags: ['Online', 'Multiplayer', 'Shooter', 'Tournament'] },
  { id: -20, title: 'Grand Theft Auto VI', year: 2026, studio: 'Rockstar Games', genre: 'Open World', platform: 'PlayStation', rating: 9.9, hours: 0, progress: 0, status: 'Coming Soon', cover: '', accent: '#f274bd', description: 'Vice City returns in Rockstar’s next generation open-world crime epic.', tags: ['Wishlist', 'Upcoming', 'Open World', 'AAA'] },
  { id: -21, title: 'Marvel’s Wolverine', year: 2026, studio: 'Insomniac Games', genre: 'Action Adventure', platform: 'PlayStation', rating: 9.8, hours: 0, progress: 0, status: 'Coming Soon', cover: '', accent: '#f0c745', description: 'Insomniac brings Logan’s brutal story and adamantium action to PlayStation.', tags: ['Wishlist', 'Upcoming', 'Action Adventure', 'AAA'] },
  { id: -22, title: 'SILENT HILL: Townfall', year: 2026, studio: 'No Code', genre: 'Survival Horror', platform: 'PC', rating: 9.3, hours: 0, progress: 0, status: 'Coming Soon', cover: '', accent: '#a6aaa1', description: 'A mysterious new psychological horror story from the world of Silent Hill.', tags: ['Wishlist', 'Upcoming', 'Horror'] },
  { id: -23, title: 'Marvel Tōkon: Fighting Souls', year: 2026, studio: 'Arc System Works', genre: 'Fighting', platform: 'PC', rating: 9.2, hours: 0, progress: 0, status: 'Coming Soon', cover: '', accent: '#ff5d58', description: 'Marvel heroes collide through the spectacular style of Arc System Works.', tags: ['Wishlist', 'Upcoming', 'Fighting', 'Multiplayer'] },
  { id: -24, title: 'Star Wars: Galactic Racer', year: 2026, studio: 'Fuse Games', genre: 'Racing', platform: 'PC', rating: 9.0, hours: 0, progress: 0, status: 'Coming Soon', cover: '', accent: '#66d4ff', description: 'High-speed competition across the most dangerous circuits in the galaxy.', tags: ['Wishlist', 'Upcoming', 'Racing'] },
]

const nav = [
  { label: 'Home', icon: Home, accent: '#cffa43', note: 'Command center' },
  { label: 'All games', icon: Library, accent: '#58b7ff', note: 'The complete vault' },
  { label: 'Favorites', icon: Heart, accent: '#ff5576', note: 'Arkive’s legends' },
  { label: 'Wishlist', icon: Bookmark, accent: '#b783ff', note: 'Next adventures' },
  { label: 'Online games', icon: Radio, accent: '#ff4655', note: 'Squad & competitive' },
  { label: 'Statistics', icon: BarChart3, accent: '#ffae4b', note: 'Career in numbers' },
  { label: 'Timeline', icon: Clock3, accent: '#47dfc2', note: 'Memory lane' },
  { label: 'My profile', icon: UserRound, accent: '#f2df8c', note: 'Meet the player' },
]

const pageCopy: Record<string, { kicker: string; title: string; text: string }> = {
  Home: { kicker: 'WELCOME', title: 'My worlds. My stories.', text: 'A living museum of every adventure that left a mark.' },
  'All games': { kicker: 'THE COMPLETE VAULT', title: 'Every world explored', text: 'From Raccoon City to Tsushima—your entire gaming history, in one place.' },
  Favorites: { kicker: 'HALL OF LEGENDS', title: 'The unforgettable ones', text: 'Games that did more than entertain. These worlds stayed with you.' },
  Wishlist: { kicker: 'ON THE HORIZON', title: 'Adventures calling', text: 'The games and worlds waiting for your next chapter.' },
  'Online games': { kicker: 'CONNECTED WORLDS', title: 'Squad up. Lock in.', text: 'Competitive matches, co-op chaos, tournament memories, and friends online.' },
  Statistics: { kicker: 'PLAYER INTELLIGENCE', title: 'The story behind the hours', text: 'Your taste, habits, milestones, and gaming DNA—visualized.' },
  Timeline: { kicker: 'MEMORY LANE', title: 'A life told through games', text: 'Every completed journey, arranged across the years.' },
  'My profile': { kicker: 'PLAYER PROFILE', title: 'Md Arkive', text: 'Explorer of open worlds. Hunter of great stories. Always ready for the next adventure.' },
}

const spotlightIds = [1259420, 2651280, 3764200]

const trailerCache = new Map<number, string>()

function GameCover({ game, className = '' }: { game: Game; className?: string }) {
  const steamId = game.title === 'Uncharted: The Lost Legacy' ? 1659420 : game.id
  const sources = game.id < 0 ? [game.cover] : [
    game.cover,
    `https://cdn.akamai.steamstatic.com/steam/apps/${steamId}/library_600x900.jpg`,
    `https://cdn.akamai.steamstatic.com/steam/apps/${steamId}/header.jpg`,
  ]
  const [sourceIndex, setSourceIndex] = useState(0)
  const [failed, setFailed] = useState(!game.cover)

  if (failed) return <div className={`poster-fallback ${className}`} style={{'--poster-accent': game.accent} as React.CSSProperties}><img src="/arkive-logo.svg" alt=""/><small>MD ARKIVE PRESENTS</small><strong>{game.title}</strong><span>{game.year} · {game.genre}</span></div>
  return <img className={className} src={sources[sourceIndex]} alt={`${game.title} official cover`} loading="lazy" onError={() => sourceIndex < sources.length - 1 ? setSourceIndex(sourceIndex + 1) : setFailed(true)}/>
}

function TrailerPreview({ game, active }: { game: Game; active: boolean }) {
  const [trailer, setTrailer] = useState(() => trailerCache.get(game.id) || '')

  useEffect(() => {
    if (!active || trailer || game.id < 0) return
    const steamId = game.title === 'Uncharted: The Lost Legacy' ? 1659420 : game.id
    const controller = new AbortController()
    const timer = window.setTimeout(async () => {
      try {
        const response = await fetch(`https://store.steampowered.com/api/appdetails?appids=${steamId}&l=english`, { signal: controller.signal })
        const payload = await response.json()
        const movies = payload?.[steamId]?.data?.movies || []
        const movie = movies.find((item: { highlight?: boolean }) => item.highlight) || movies[0]
        const source = movie?.mp4?.max || movie?.mp4?.['480']
        if (source) {
          trailerCache.set(game.id, source)
          setTrailer(source)
        }
      } catch (error) {
        if ((error as Error).name !== 'AbortError') console.warn(`Trailer unavailable for ${game.title}`)
      }
    }, 350)
    return () => { window.clearTimeout(timer); controller.abort() }
  }, [active, game, trailer])

  if (!active) return null
  return trailer ? <motion.video className="trailer-preview" initial={{opacity:0}} animate={{opacity:1}} src={trailer} autoPlay muted loop playsInline preload="metadata" /> : <div className="trailer-loading"><span/><small>{game.id < 0 ? 'TRAILER UNAVAILABLE' : 'LOADING TRAILER'}</small></div>
}

function App() {
  const [loading, setLoading] = useState(true)
  const [active, setActive] = useState('Home')
  const [query, setQuery] = useState('')
  const [genre, setGenre] = useState('All genres')
  const [sort, setSort] = useState('My rating')
  const [selected, setSelected] = useState<Game | null>(null)
  const [hovered, setHovered] = useState<number | null>(null)
  const [menu, setMenu] = useState(false)
  const [liked, setLiked] = useState<number[]>([1259420, 2651280, 3764200])
  const [muted, setMuted] = useState(true)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = 0.3
  }, [])

  const toggleMusic = () => {
    const audio = audioRef.current
    if (!audio) return
    audio.volume = 0.3
    if (muted) {
      audio.muted = false
      audio.play().catch(() => {})
    } else {
      audio.muted = true
    }
    setMuted(!muted)
  }

  const filtered = useMemo(() => {
    let result = games.filter(g => `${g.title} ${g.genre} ${g.studio} ${g.tags.join(' ')}`.toLowerCase().includes(query.toLowerCase()))
    if (genre !== 'All genres') result = result.filter(g => g.genre.includes(genre) || g.tags.includes(genre))
    if (active === 'Favorites') result = result.filter(g => liked.includes(g.id))
    if (active === 'Wishlist') result = result.filter(g => g.tags.includes('Wishlist'))
    if (active === 'Online games') result = result.filter(g => g.tags.includes('Online'))
    return [...result].sort((a,b) => sort === 'Alphabetical' ? a.title.localeCompare(b.title) : sort === 'Hours played' ? b.hours-a.hours : b.rating-a.rating)
  }, [query, genre, sort, active, liked])

  const hero = games[0]
  const completed = games.filter(g => g.progress === 100).length
  const totalHours = games.reduce((sum, g) => sum + g.hours, 0)
  const averageRating = games.filter(g => g.hours > 0).reduce((sum, g) => sum + g.rating, 0) / games.filter(g => g.hours > 0).length
  const spotlight = games.filter(g => spotlightIds.includes(g.id))
  const currentPage = pageCopy[active]
  const surprise = () => setSelected(games[Math.floor(Math.random() * games.length)])
  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 4800)
    return () => window.clearTimeout(timer)
  }, [])
  useEffect(() => {
    if (!menu) return
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') setMenu(false) }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [menu])
  useEffect(() => {
    const move = (event: PointerEvent) => {
      document.documentElement.style.setProperty('--mx', `${event.clientX}px`)
      document.documentElement.style.setProperty('--my', `${event.clientY}px`)
      document.documentElement.style.setProperty('--px', `${(event.clientX / window.innerWidth - .5) * 2}`)
      document.documentElement.style.setProperty('--py', `${(event.clientY / window.innerHeight - .5) * 2}`)
    }
    window.addEventListener('pointermove', move, { passive: true })
    return () => window.removeEventListener('pointermove', move)
  }, [])
  const tilt = (event: React.MouseEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const x = (event.clientX - rect.left) / rect.width - .5
    const y = (event.clientY - rect.top) / rect.height - .5
    event.currentTarget.style.setProperty('--rx', `${-y * 10}deg`)
    event.currentTarget.style.setProperty('--ry', `${x * 12}deg`)
    event.currentTarget.style.setProperty('--shine-x', `${(x + .5) * 100}%`)
    event.currentTarget.style.setProperty('--shine-y', `${(y + .5) * 100}%`)
  }
  const untilt = (event: React.MouseEvent<HTMLElement>) => {
    event.currentTarget.style.setProperty('--rx', '0deg')
    event.currentTarget.style.setProperty('--ry', '0deg')
  }
  return (
    <div className={loading ? 'app-shell is-booting' : 'app-shell is-ready'}>
      <AnimatePresence>{loading && <motion.div className="boot-screen" exit={{opacity:0,scale:1.04,filter:'blur(10px)'}} transition={{duration:.85,ease:[.76,0,.24,1]}}>
        <div className="intro-grid"/><div className="intro-scan"/>
        <div className="intro-reel" aria-hidden="true">
          <motion.div className="intro-poster poster-left" initial={{x:-150,rotateY:55,opacity:0}} animate={{x:0,rotateY:34,opacity:.55}} transition={{duration:1.2,ease:[.16,1,.3,1]}}><GameCover game={games.find(g=>g.id===1259420)!}/></motion.div>
          <motion.div className="intro-poster poster-center" initial={{y:100,scale:.7,opacity:0}} animate={{y:0,scale:1,opacity:1}} transition={{delay:.15,duration:1.2,ease:[.16,1,.3,1]}}><GameCover game={games.find(g=>g.id===2651280)!}/></motion.div>
          <motion.div className="intro-poster poster-right" initial={{x:150,rotateY:-55,opacity:0}} animate={{x:0,rotateY:-34,opacity:.55}} transition={{duration:1.2,ease:[.16,1,.3,1]}}><GameCover game={games.find(g=>g.id===2215430)!}/></motion.div>
        </div>
        <motion.div className="intro-brand" initial={{opacity:0}} animate={{opacity:1}} transition={{delay:.55,duration:.8}}>
          <motion.img src="/arkive-logo.svg" alt="Arkive" initial={{scale:0,rotate:-90}} animate={{scale:1,rotate:0}} transition={{delay:.5,duration:.9,ease:[.16,1,.3,1]}}/>
          <small>MD ARKIVE PRESENTS</small><h1>ARK<span>I</span>VE</h1><p>WORLDS I’VE LIVED</p>
        </motion.div>
        <div className="intro-caption"><span>EXPLORE ARKIVE’S</span><strong>GAMING JOURNEY</strong></div>
        <div className="intro-status"><span>ARCHIVE SYSTEM</span><div><i/></div><b>LOADING MEMORIES</b></div>
        <div className="intro-counter"><span>01</span><i/><b>{games.length}</b></div>
      </motion.div>}</AnimatePresence>
      <div className="noise" />
      <div className="cursor-aura"/><div className="ambient-orb orb-one"/><div className="ambient-orb orb-two"/>

      <audio ref={audioRef} src="/archive-fm.mp3" loop autoPlay muted={muted} />
      <button className={muted ? 'music-toggle' : 'music-toggle playing'} onClick={toggleMusic} aria-label={muted ? 'Play background music' : 'Mute background music'}>
        <span className="music-disc"/>
        <span className="music-bars"><i/><i/><i/></span>
        <small>{muted ? 'MUSIC OFF' : 'ARCHIVE FM'}</small>
      </button>
      {menu && <button className="sidebar-backdrop" aria-label="Close menu" onClick={() => setMenu(false)} />}
      <aside className={menu ? 'sidebar open' : 'sidebar'}>
        <button className="mobile-close" aria-label="Close menu" onClick={() => setMenu(false)}><X /></button>
        <div className="brand"><img src="/arkive-logo.svg" alt="Arkive logo"/><div><span>ARKIVE</span><small>WORLDS I’VE LIVED</small></div></div>
        <div className="nav-caption">MD ARKIVE’S VAULT</div>
        <nav>{nav.map(({label, icon: Icon, accent, note}) => <button key={label} style={{'--nav-accent': accent} as React.CSSProperties} className={active === label ? 'nav-item active' : 'nav-item'} onClick={() => {setActive(label); setGenre('All genres'); setMenu(false)}}><span className="nav-icon"><Icon size={16}/></span><span className="nav-copy"><strong>{label}</strong><small>{note}</small></span>{label==='Favorites' && <em>{liked.length}</em>}</button>)}</nav>
        <div className="nav-caption collections-title">COLLECTIONS</div>
        <div className="collections"><button onClick={() => { setGenre('Currently Playing'); setMenu(false) }}><i className="dot lime"/>Currently playing <b>3</b></button><button onClick={() => { setGenre('Completed'); setMenu(false) }}><i className="dot purple"/>Completed <b>{completed}</b></button><button onClick={() => { setGenre('Replay List'); setMenu(false) }}><i className="dot orange"/>Replay list <b>5</b></button><button onClick={() => { setGenre('Hidden Gems'); setMenu(false) }}><i className="dot blue"/>Hidden gems <b>1</b></button></div>
        <button className="profile" onClick={() => { setActive('My profile'); setMenu(false) }}><div className="avatar">MA</div><div><strong>Md Arkive</strong><small>Open-world wanderer</small></div><Settings size={17}/></button>
      </aside>

      <main>
        <header><button className="menu-btn" aria-label="Open menu" aria-expanded={menu} onClick={() => setMenu(true)}><Menu/></button><div className="crumb"><span>ARKIVE</span><b>/</b><strong>{active.toUpperCase()}</strong></div><div className="header-actions"><div className="search"><Search size={17}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search Arkive’s vault..."/><kbd>⌘ K</kbd></div><button className="icon-btn"><Trophy size={18}/></button><button className="surprise" onClick={surprise}><Shuffle size={16}/> Surprise me</button></div></header>

        <div className="content">
          <AnimatePresence mode="wait">
          <motion.div key={active} initial={{opacity:0,y:14}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-10}} transition={{duration:.35}}>
            <section className={`page-identity page-${active.toLowerCase().replace(' ','-')}`}>
              <div><span>{currentPage.kicker}</span><h1>{currentPage.title}</h1><p>{currentPage.text}</p></div><div className="world-core"><i/><i/><i/><div className="core-cube"><b/><b/><b/><b/><b/><b/></div></div><div className="page-glyph">{active === 'Favorites' ? <Heart/> : active === 'Statistics' ? <BarChart3/> : active === 'Timeline' ? <Clock3/> : active === 'My profile' ? <UserRound/> : active === 'Online games' ? <Radio/> : active === 'Wishlist' ? <Bookmark/> : active === 'All games' ? <Library/> : <Compass/>}</div>
            </section>

            {active === 'Home' && <><section className="landing-hero" style={{'--accent': hero.accent} as React.CSSProperties}>
              <div className="landing-hero-backdrop" style={{backgroundImage:`url(${hero.cover})`}}/><div className="landing-hero-fade"/>
              <div className="landing-hero-content">
                <div className="eyebrow"><Sparkles size={13}/> MD ARKIVE'S PERSONAL ARCHIVE</div>
                <h1>EVERY WORLD<br/><i>I'VE LIVED IN</i></h1>
                <p>{games.length} games catalogued, {totalHours.toLocaleString()} hours logged, {completed} full journeys completed — this is where every playthrough gets remembered.</p>
                <div className="landing-hero-actions">
                  <button className="primary" onClick={()=>document.getElementById('library-start')?.scrollIntoView({behavior:'smooth'})}><Library size={16}/> Enter the archive</button>
                  <button className="ghost" onClick={()=>setSelected(hero)}><Play size={15} fill="currentColor"/> Featured: {hero.title}</button>
                </div>
              </div>
              <button className="landing-feature-card" onClick={()=>setSelected(hero)}>
                <GameCover game={hero}/>
                <div><small>ARCHIVE PICK</small><strong>{hero.title}</strong><span><Star size={11} fill="currentColor"/> {hero.rating}</span></div>
              </button>
              <div className="landing-hero-scroll"><span/>SCROLL</div>
            </section>

            <section className="stats-strip" id="library-start"><div><small>GAMES LOGGED</small><strong>{games.length}</strong><em>Your full collection</em></div><div><small>COMPLETED</small><strong>{completed}</strong><em>{Math.round(completed / games.length * 100)}% completion</em></div><div><small>TIME PLAYED</small><strong>{totalHours.toLocaleString()}<sup>h</sup></strong><em>Across PC & PlayStation</em></div><div><small>AVG. RATING</small><strong>{averageRating.toFixed(1)}</strong><em>A legendary library</em></div><div className="genre-stat"><small>FAVORITE GENRE</small><strong>ADVENTURE</strong><em>Stories come first</em></div></section>

            <section className="spotlight"><div className="section-label"><span><Flame size={14}/> ARKIVE’S TOP THREE</span><h2>Games that define me</h2></div><div className="spotlight-grid">{spotlight.map((game,index)=><motion.button className="tilt-surface" key={game.id} onMouseMove={tilt} onMouseLeave={untilt} onClick={()=>setSelected(game)} style={{'--spot':game.accent} as React.CSSProperties}><GameCover game={game}/><div className="spotlight-shade"/><span>0{index+1}</span><div><small>{index===2?'MOST ANTICIPATED':'ALL-TIME FAVORITE'}</small><h3>{game.title}</h3><p>{game.description}</p><strong>EXPLORE ENTRY <Play size={11} fill="currentColor"/></strong></div></motion.button>)}</div></section></>}

            {active === 'Statistics' && <section className="unique-panel stats-page"><div className="stat-orbit"><strong>{totalHours.toLocaleString()}</strong><span>HOURS IN OTHER WORLDS</span></div><div className="taste-bars"><h3>Arkive’s gaming DNA</h3>{[['Open world',94],['Action',91],['Adventure',96],['Third person',89],['Horror',76]].map(([label,value])=><div key={label}><span>{label}</span><b>{value}%</b><i><em style={{width:`${value}%`}}/></i></div>)}</div><div className="stat-achievement"><Trophy/><small>SIGNATURE TASTE</small><h3>World Explorer</h3><p>You choose freedom, cinematic stories, and action from a third-person perspective.</p></div></section>}

            {active === 'Timeline' && <section className="unique-panel timeline-page">{games.filter(g=>g.progress===100).sort((a,b)=>b.year-a.year).slice(0,10).map((g,i)=><button key={g.id} onClick={()=>setSelected(g)}><span>{g.year}</span><i/><GameCover game={g}/><div><small>JOURNEY {String(i+1).padStart(2,'0')}</small><strong>{g.title}</strong><em>{g.hours} hours · {g.status}</em></div></button>)}</section>}

            {active === 'My profile' && <section className="unique-panel profile-page"><div className="profile-hero"><div className="profile-monogram">MA<span>LVL<br/>35</span></div><div><small>PLAYER ONE</small><h2>Md Arkive</h2><p>I play to disappear into another world. Give me a wide horizon, a third-person camera, an unforgettable adventure, and combat with weight—and I’m home.</p><div className="profile-tags"><span><Compass/> Open World</span><span><UserRound/> Third Person</span><span><Sparkles/> Adventure</span><span><Shield/> Action</span></div></div></div><div className="profile-manifesto"><small>MY PLAYER CODE</small><blockquote>“I don’t just finish games. I remember the roads, the characters, and the worlds I lived in.”</blockquote><div><span><b>{games.length}</b> worlds entered</span><span><b>{completed}</b> stories finished</span><span><b>3</b> forever favorites</span></div></div></section>}

            {active === 'Online games' && <section className="online-hub">
              <a className="valorant-tracker" href="https://tracker.gg/valorant/profile/riot/K4K4R0TT%234RK1V/overview?platform=pc&playlist=competitive&season=4f0864e2-40af-28a4-de2c-0e9e64e75f23" target="_blank" rel="noreferrer"><div><Radio/><span>LIVE COMPETITIVE PROFILE</span></div><h2>K4K4R0TT <i>#4RK1V</i></h2><p>Open my complete VALORANT match history, competitive rank, agents, weapons, and performance analytics.</p><strong>VIEW ON TRACKER.GG <ExternalLink/></strong></a>
              <a className="youtube-vault" href="https://youtube.com/@arkibba?si=QqpkfPB89wswcjFS" target="_blank" rel="noreferrer"><Youtube/><div><small>THE ARKIBBA ARCHIVES</small><h2>Free Fire Tournament Videos</h2><p>Watch my previous tournament runs, squad battles, clutch moments, and original gaming uploads on my YouTube channel.</p><strong>OPEN MY YOUTUBE CHANNEL <ExternalLink/></strong></div><span>WATCH<br/>THE<br/>VAULT</span></a>
            </section>}

            {!['Statistics','Timeline','My profile'].includes(active) && <><section className="library-head"><div><div className="eyebrow">{active === 'Favorites' ? 'HEART-SEALED COLLECTION' : active === 'Wishlist' ? 'THE NEXT CHAPTER' : 'YOUR PLAYED GAMES'}</div><h2>{active === 'Home' ? 'Md Arkive’s library' : active}</h2><p>{filtered.length || 0} entries in this collection</p></div><div className="filters"><label><span>GENRE</span><select value={genre} onChange={e=>setGenre(e.target.value)}><option>All genres</option><option>Action Adventure</option><option>RPG</option><option>Story Rich</option><option>Horror</option><option>Puzzle</option><option>Multiplayer</option><option>Currently Playing</option><option>Completed</option></select><ChevronDown size={14}/></label><label><span>SORT BY</span><select value={sort} onChange={e=>setSort(e.target.value)}><option>My rating</option><option>Alphabetical</option><option>Hours played</option></select><ChevronDown size={14}/></label></div></section>

            {filtered.length ? <section className="game-grid">{filtered.map((g,i)=><motion.article className="game-card tilt-surface" key={g.id} initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*.04}} onMouseMove={tilt} onMouseEnter={()=>setHovered(g.id)} onMouseLeave={(event)=>{setHovered(null);untilt(event)}} onClick={()=>setSelected(g)}>
              <div className="cover-wrap"><GameCover game={g}/><TrailerPreview game={g} active={hovered === g.id}/><div className="cover-shade"/><div className="card-top"><span className={`status ${g.status==='Playing'?'playing':''}`}>{g.status}</span><button onClick={e=>{e.stopPropagation();setLiked(l=>l.includes(g.id)?l.filter(x=>x!==g.id):[...l,g.id])}}><Heart size={16} fill={liked.includes(g.id)?'currentColor':'none'}/></button></div><div className="hover-info"><button><Play size={16} fill="currentColor"/></button><p>{g.description}</p><small>PLAYING OFFICIAL TRAILER · CLICK FOR DETAILS →</small></div><div className="progress"><span style={{width:`${g.progress}%`,background:g.accent}}/></div></div>
              <div className="card-info"><div><h3>{g.title}</h3><p>{g.year} · {g.genre}</p></div><strong><Star size={13} fill="currentColor"/>{g.rating}</strong></div>
            </motion.article>)}</section> : <div className="empty"><Bookmark size={34}/><h3>No games here yet</h3><p>Try another collection or clear your filters.</p><button onClick={()=>{setActive('Home');setGenre('All genres')}}>Return to archive</button></div>}</>}
          </motion.div></AnimatePresence>
        </div>
      </main>

      <AnimatePresence>{selected && <motion.div className="modal-bg" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={()=>setSelected(null)}><motion.div className="game-modal" initial={{opacity:0,scale:.94,y:30}} animate={{opacity:1,scale:1,y:0}} exit={{opacity:0,scale:.96}} onClick={e=>e.stopPropagation()}>
        <button className="modal-close" onClick={()=>setSelected(null)}><X/></button><div className="modal-visual" style={{backgroundImage:`url(${selected.cover})`}}><div/><button className="trailer"><Play fill="currentColor"/> PLAY TRAILER</button></div><div className="modal-content"><div className="eyebrow">{selected.studio} · {selected.year}</div><h2>{selected.title}</h2><div className="modal-tags">{selected.tags.map(t=><span key={t}>{t}</span>)}</div><p>{selected.description}</p><blockquote>“A personal entry from my played-games archive—saved here with the memories, hours, and moments that made it special.”</blockquote><div className="detail-grid"><div><small>MY RATING</small><strong><Star fill="currentColor"/> {selected.rating}/10</strong></div><div><small>PLAY TIME</small><strong>{selected.hours} hours</strong></div><div><small>PROGRESS</small><strong>{selected.progress}%</strong></div><div><small>PLATFORM</small><strong>{selected.platform}</strong></div></div>{selected.id > 0 && <a href={`https://store.steampowered.com/app/${selected.id}`} target="_blank" rel="noreferrer">VIEW GAME PAGE ↗</a>}</div>
      </motion.div></motion.div>}</AnimatePresence>
    </div>
  )
}

export default App
