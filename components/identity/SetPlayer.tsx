interface Track {
  title: string
  date: string
  src: string
}

const TRACKS: Track[] = [
  {
    title: 'El Fortin Talent 2026 @ Ulrich',
    date: '18.01.2026',
    src: '/assets/audio/El Fortin Talent 2026 @ Ulrich [18.01.2026].mp3',
  },
  {
    title: 'Afro House @ Ulrich',
    date: '23.08.2025',
    src: '/assets/audio/Afro House @ Ulrich [23.08.2025].mp3',
  },
  {
    title: 'After Rebobina @ At home',
    date: '03.08.2025',
    src: '/assets/audio/After Rebobina @ At home [03.08.2025].mp3',
  },
]

export function SetPlayer() {
  return (
    <div className="id-set-list">
      {TRACKS.map((track) => (
        <article className="id-set-card" key={track.src}>
          <h3 className="id-set-title">{track.title}</h3>
          <p className="id-set-meta">{track.date}</p>
          <audio controls preload="none" src={track.src}>
            Seu navegador não suporta áudio embutido.
          </audio>
        </article>
      ))}
    </div>
  )
}
