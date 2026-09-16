# What changed in this pass

## Verified
- Every `.js`/JSX file in `src/` parses with zero syntax errors (checked with
  the TypeScript compiler in JSX mode, offline).
- Every relative import (`./x`, `../x`) in the codebase resolves to a real
  file on disk — no dangling imports.
- No leftover references to the deleted files or the old song-search API.

## NOT verified (I have no network access / no `npm install` in this
## sandbox, so I could not actually run the app)
- `npm install && npm start` — please run this yourself and check the
  browser console for runtime errors.
- Whether Media Session lock-screen controls behave as expected on your
  actual phone/browser (implementation follows the documented Web API, but
  I could not test it live).
- The Formspree contact form endpoint — it's a placeholder ID, see below.

## 1. Contact page — built from scratch
`Nav.js` and `Footer.js` already linked to `/contact`, but no route or page
existed — clicking it 404'd. Added:
- `src/pages/Contact.js` + `Contact.css`
- Route registered in `App.js`
- A working contact form wired to Formspree (a free, no-backend-needed form
  relay). **You need to**: create a free account at formspree.io, make a
  form, and replace `YOUR_FORM_ID` in `Contact.js` with your real ID.
- Direct email (placeholder `hello@kneerose.rocks` — change to your real
  address) and your existing social links, reused from the footer.

## 2. Global, persistent music player
The old Music page let visitors type in *any* song name and streamed it back
via a custom backend (`api.kneerose.rocks/getsong`) — that's effectively an
audio-ripping service for arbitrary songs, which is a real copyright/ToS
risk regardless of intent. It's been replaced with a legitimate model:

- `src/data/tracks.js` — a plain list of **your own** tracks (title, artist,
  cover art, audio file URL). Comes with placeholder entries and clear
  instructions on where to add real files (`public/audio/`).
- `src/context/MusicPlayerContext.js` — a React context that owns a single
  `<audio>` element at the app root, so **playback survives navigating
  between pages** (Home → Projects → Music etc. — this is what makes it
  "global").
- `src/components/music/GlobalPlayer.js` + CSS — a mini player bar fixed to
  the bottom of every page, expandable into a full now-playing view with
  seek bar, loop, next/prev.
- **Media Session API integration** — this is what puts play/pause/skip
  controls on the phone lock screen, in the OS notification/media panel,
  and lets Bluetooth/hardware media keys control playback. This works while
  the browser tab is open (foreground or backgrounded), which is the
  farthest a plain website can go. Genuinely running audio with the browser
  fully closed requires a native app or an installed PWA with a persistent
  service worker — a much bigger, separate project. I didn't build that so
  as not to overclaim what's actually shipped here.
- `src/pages/Music.js` rewritten as a track grid — tap a track to play it.
- Removed: `Player.js`, `NowPlaying.js`, `Queue.js`, `QueueItem.js` (old
  implementation, now dead code), and the `react-audio-player` dependency
  (unused).

**If you'd rather play tracks from Spotify/SoundCloud instead of
self-hosted files**: that's a legitimate path too (their official embed
widgets), but it's a separate, larger integration than what's in this pass
— ask if you want it built next.

## 3. More projects, same card UI
Added three more entries to the Projects page using the exact same
`Project` component/styling as Meme Generator and Meal Planner:
ForgeOS, Sanip Ops, Nepal Utility Portal.

None of these have a live, public URL I could verify, so instead of a fake
"Try it now" link, they show an "In Development" badge — the button only
appears for projects that actually have somewhere to send someone. Icons
are simple generic placeholder SVGs (gear / briefcase / map-pin), not real
screenshots — swap in real screenshots or a real link (and drop `status:
"dev"`) whenever a project actually goes live.

## 4. Real tracks added (this pass)
Replaced the placeholder entries in `src/data/tracks.js` with your 5 actual
uploaded songs, matched against your real RapFame profile
(rapfame.app/user/kneerose) for correct titles and cover art:

- Shade is Dark
- Nepali Freeverse (Ek Dui Tin)
- These Days
- TryBall
- Summit (RIP YamaBuddha)

Audio files live in `public/audio/`. Cover art is currently **hotlinked**
from RapFame's CDN (same image already shown on each track's RapFame page)
— I couldn't download the binary image files in this sandbox. Recommended:
save them locally under `src/resources/music/` at some point so the site
doesn't depend on RapFame's CDN staying reachable.

Each track card also links out to its RapFame page (comments/play count
live there, not duplicated on the site). Added a "Play All (Loop)" button
on the Music page — the playlist already loops indefinitely by default
(confirmed in `MusicPlayerContext.js`: when a track ends, `next()` wraps
back to the first track via modulo, so it cycles forever unless you pause).

**One thing worth double-checking, not changed automatically:** your
RapFame profile bio links `instagram.com/knee_rose_`, but the site's
existing Footer/Contact links point to `instagram.com/knee_raws/` — either
that's an old handle or a different account. I left the footer as-is since
I don't know which is current; update `Footer.js`/`Contact.js` if
`knee_rose_` is the right one now.

## Next step

```
npm install
npm start
```
Then check the browser console, click through every page, and confirm the
mini player follows you around and the contact form actually reaches you.
