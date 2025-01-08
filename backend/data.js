const data = [
  {
    song_name: "Home",
    artist: [
      {
        name: "Robbie Mendez",
        image:
          "https://ncsmusic.s3.eu-west-1.amazonaws.com/artists/000/001/165/325x325/1725966574_7NGJSM5yDz_IMG_3350.JPG",
      },
    ],
    audio_url:
      "https://ncsmusic.s3.eu-west-1.amazonaws.com/tracks/000/001/746/home-1725372056-sUBZMDMTgs.mp3",
    cover_url:
      "https://ncsmusic.s3.eu-west-1.amazonaws.com/tracks/000/001/746/100x100/home-1725372052-GWRK7fgqwq.jpg",
    genres: ["House"],
    moods: ["Dreamy", "Euphoric", "Quirky", "Restless", "Suspense"],
  },
  {
    song_name: "Why So Serious",
    artist: [
      { name: "Eytan Peled", image: null },
      {
        name: "Roby Fayer",
        image:
          "https://ncsmusic.s3.eu-west-1.amazonaws.com/artists/000/001/164/325x325/1725966852_9I5U3APTn5_457205921_18452946265016782_9082338485430830937_n.jpg",
      },
      { name: "Sync", image: null },
    ],
    audio_url:
      "https://ncsmusic.s3.eu-west-1.amazonaws.com/tracks/000/001/745/why-so-serious-1724889655-g87mRygxzb.mp3",
    cover_url:
      "https://ncsmusic.s3.eu-west-1.amazonaws.com/tracks/000/001/745/100x100/why-so-serious-1724889654-6Hs7AZkTlT.jpg",
    genres: ["Electronic Pop"],
    moods: [
      "Eccentric",
      "Elegant",
      "Glamorous",
      "Laid Back",
      "Quirky",
      "Restless",
    ],
  },
  {
    song_name: "Win & Lose",
    artist: [
      {
        name: "Chime",
        image:
          "https://ncsmusic.s3.eu-west-1.amazonaws.com/artists/000/000/078/325x325/chime-1586942276-z7pcZzsSws.jpg",
      },
    ],
    audio_url:
      "https://ncsmusic.s3.eu-west-1.amazonaws.com/tracks/000/001/744/win-lose-1724716855-av5xiHP4Am.mp3",
    cover_url:
      "https://ncsmusic.s3.eu-west-1.amazonaws.com/tracks/000/001/744/100x100/win-lose-1724716853-eU08vmIL7s.jpg",
    genres: ["Melodic Dubstep"],
    moods: [
      "Dreamy",
      "Glamorous",
      "Happy",
      "Laid Back",
      "romantic",
      "Sentimental",
    ],
  },
  {
    song_name: "Wonder (ft. Rarin & Bri Tolani)",
    artist: [
      {
        name: "Rarin",
        image:
          "https://ncsmusic.s3.eu-west-1.amazonaws.com/artists/000/001/162/325x325/1725551876_jZbEPMmQLn_454721182_420284964377811_2231020417167672769_n.jpg",
      },
      {
        name: "Bri Tolani",
        image:
          "https://ncsmusic.s3.eu-west-1.amazonaws.com/artists/000/000/061/325x325/bri-tolani-1586942267-9ulsY4yS8K.JPG",
      },
      {
        name: "Unknown Brain",
        image:
          "https://ncsmusic.s3.eu-west-1.amazonaws.com/artists/000/000/466/325x325/1597179773_jCiJk3xfXD_Unknown-Brain.png",
      },
    ],
    audio_url:
      "https://ncsmusic.s3.eu-west-1.amazonaws.com/tracks/000/001/743/wonder-ft-rarin-bri-tolani-1724371256-h6oXol1wF2.mp3",
    cover_url:
      "https://ncsmusic.s3.eu-west-1.amazonaws.com/tracks/000/001/743/100x100/wonder-ft-rarin-bri-tolani-1724371254-EijOHavsBb.jpg",
    genres: ["Trap"],
    moods: [
      "Dreamy",
      "Eccentric",
      "Elegant",
      "Heavy",
      "Hopeful",
      "Restless",
      "Sentimental",
      "Glamorous",
    ],
  },
  {
    song_name: "AIN'T MISS A CALL",
    artist: [
      {
        name: "Guy Arthur",
        image:
          "https://ncsmusic.s3.eu-west-1.amazonaws.com/artists/000/000/521/325x325/1597150353_wauiQd4xif_Guy-Arthur.png",
      },
    ],
    audio_url:
      "https://ncsmusic.s3.eu-west-1.amazonaws.com/tracks/000/001/742/aint-miss-a-call-1724284856-tqZRznMNUU.mp3",
    cover_url:
      "https://ncsmusic.s3.eu-west-1.amazonaws.com/tracks/000/001/742/100x100/aint-miss-a-call-1724284854-9vROhK0KyQ.jpg",
    genres: ["Future Trap"],
    moods: ["Chasing", "Eccentric", "Glamorous", "Restless", "Weird"],
  },
  {
    song_name: "Earthquake (feat. Justin J. Moore)",
    artist: [
      { name: "Justin J. Moore", image: null },
      {
        name: "SNAILS",
        image:
          "https://ncsmusic.s3.eu-west-1.amazonaws.com/artists/000/001/160/325x325/1725551823_73xAPMxriV_437111216_430774506311098_5008121313207809919_n.jpg",
      },
      {
        name: "ESCARGOT",
        image:
          "https://ncsmusic.s3.eu-west-1.amazonaws.com/artists/000/001/161/325x325/1725551616_sMtT3zzy5w_escargot.jpg",
      },
      {
        name: "Jay Eskar",
        image:
          "https://ncsmusic.s3.eu-west-1.amazonaws.com/artists/000/000/736/325x325/1645457183_6su5t9SfSz_jay.png",
      },
    ],
    audio_url:
      "https://ncsmusic.s3.eu-west-1.amazonaws.com/tracks/000/001/740/earthquake-feat-justin-j-moore-1724112056-47MvZZyqAh.mp3",
    cover_url:
      "https://ncsmusic.s3.eu-west-1.amazonaws.com/tracks/000/001/740/100x100/earthquake-feat-justin-j-moore-1724112054-G6qcggrrg5.jpg",
    genres: ["Future House"],
    moods: ["Floating", "Mysterious", "Dark", "Heavy", "Restless", "Suspense"],
  },
  {
    song_name: "Pump Up The Bassline",
    artist: [
      {
        name: "Sippy",
        image:
          "https://ncsmusic.s3.eu-west-1.amazonaws.com/artists/000/001/159/325x325/1725551478_MhuSiQR9lz_5N6A8896.jpg",
      },
      {
        name: "RIOT",
        image:
          "https://ncsmusic.s3.eu-west-1.amazonaws.com/artists/000/001/120/325x325/1718124957_qo6eeKMWvh_441048215_18432386548050307_668324770904303247_n.jpg",
      },
    ],
    audio_url:
      "https://ncsmusic.s3.eu-west-1.amazonaws.com/tracks/000/001/739/pump-up-the-bassline-1723766458-cYyol13E96.mp3",
    cover_url:
      "https://ncsmusic.s3.eu-west-1.amazonaws.com/tracks/000/001/739/100x100/pump-up-the-bassline-1723766456-kcVAcn4OHx.jpg",
    genres: ["Dubstep"],
    moods: ["Heavy", "Restless", "Quirky", "Suspense", "Weird"],
  },
  {
    song_name: "EXECUTIONER",
    artist: [
      {
        name: "DJ FKU",
        image:
          "https://ncsmusic.s3.eu-west-1.amazonaws.com/artists/000/001/130/325x325/1720008995_4F2GdQLTLo_hires.png",
      },
    ],
    audio_url:
      "https://ncsmusic.s3.eu-west-1.amazonaws.com/tracks/000/001/738/1723718204_7CFlBpXrJX_01-DJ-FKU---EXECUTIONER-NCS-Release.mp3",
    cover_url:
      "https://ncsmusic.s3.eu-west-1.amazonaws.com/tracks/000/001/738/100x100/executioner-1723680055-GZacfkgNhO.jpg",
    genres: ["Phonk"],
    moods: ["Dark", "Fear", "Chasing", "Mysterious", "Restless"],
  },
  {
    song_name: "Always Be",
    artist: [
      {
        name: "Netrum",
        image:
          "https://ncsmusic.s3.eu-west-1.amazonaws.com/artists/000/000/517/325x325/1597165308_3LfVi3saRa_00001.png",
      },
    ],
    audio_url:
      "https://ncsmusic.s3.eu-west-1.amazonaws.com/tracks/000/001/737/always-be-1723507256-gamV2XQBUz.mp3",
    cover_url:
      "https://ncsmusic.s3.eu-west-1.amazonaws.com/tracks/000/001/737/100x100/always-be-1723507254-OZov3jT85E.jpg",
    genres: ["Indie Dance"],
    moods: [
      "Dreamy",
      "Elegant",
      "Glamorous",
      "Quirky",
      "romantic",
      "Sentimental",
    ],
  },
  {
    song_name: "Faster",
    artist: [
      {
        name: "Tobu",
        image:
          "https://ncsmusic.s3.eu-west-1.amazonaws.com/artists/000/000/456/325x325/1597179629_uqJjm9Uuiw_Tobu.png",
      },
    ],
    audio_url:
      "https://ncsmusic.s3.eu-west-1.amazonaws.com/tracks/000/001/736/faster-1723161657-IGbXrc4RXA.mp3",
    cover_url:
      "https://ncsmusic.s3.eu-west-1.amazonaws.com/tracks/000/001/736/100x100/faster-1723161655-zwzjLFKZKK.jpg",
    genres: ["Progressive House"],
    moods: [
      "Dreamy",
      "Elegant",
      "Euphoric",
      "Glamorous",
      "Epic",
      "Sentimental",
    ],
  },
  {
    song_name: "Shine (Always Mirin Remix)",
    artist: [
      {
        name: "Always Mirin",
        image:
          "https://ncsmusic.s3.eu-west-1.amazonaws.com/artists/000/001/158/325x325/1723204348_5fgIyP988I_Always-Mirin-Press.PNG",
      },
      { name: "Spektrem", image: null },
    ],
    audio_url:
      "https://ncsmusic.s3.eu-west-1.amazonaws.com/tracks/000/001/735/1723124218_kxyo2wrwh0_01-Spektrem---Shine-Always-Mirin-Remix-NCS-Release.mp3",
    cover_url:
      "https://ncsmusic.s3.eu-west-1.amazonaws.com/tracks/000/001/735/100x100/shine-always-mirin-remix-1723075256-1pE77PfBRZ.jpg",
    genres: ["Hardstyle"],
    moods: [
      "Epic",
      "Euphoric",
      "Glamorous",
      "Quirky",
      "Restless",
      "romantic",
      "Suspense",
    ],
  },
  {
    song_name: "Crash",
    artist: [
      { name: "Charlotte Reed", image: null },
      {
        name: "Josh Rubin",
        image:
          "https://ncsmusic.s3.eu-west-1.amazonaws.com/artists/000/000/920/325x325/1683299638_Sj2OjUsl8q_Screenshot-2023-05-05-at-16.13.46.png",
      },
      {
        name: "Slippy",
        image:
          "https://ncsmusic.s3.eu-west-1.amazonaws.com/artists/000/000/657/325x325/1624888813_9KrYfyBe1b_Slippy-2.jpg",
      },
    ],
    audio_url:
      "https://ncsmusic.s3.eu-west-1.amazonaws.com/tracks/000/001/734/1722936968_ptBtpCTER8_01-Slippy--Josh-Rubin---Crash-NCS-Release.mp3",
    cover_url:
      "https://ncsmusic.s3.eu-west-1.amazonaws.com/tracks/000/001/734/100x100/crash-1722902454-8plVPH48Ma.jpg",
    genres: ["Drum & Bass"],
    moods: [
      "Dreamy",
      "Elegant",
      "Glamorous",
      "Restless",
      "Sentimental",
      "Quirky",
    ],
  },
  {
    song_name: "Follow Back",
    artist: [
      {
        name: "LXNGVX",
        image:
          "https://ncsmusic.s3.eu-west-1.amazonaws.com/artists/000/001/156/325x325/1723204383_sX1tmZE7tV_lxngvx.jpeg",
      },
    ],
    audio_url:
      "https://ncsmusic.s3.eu-west-1.amazonaws.com/tracks/000/001/733/1722605922_E3174sULx6_01-LXNGVX---Follow-Back-NCS-Release.mp3",
    cover_url:
      "https://ncsmusic.s3.eu-west-1.amazonaws.com/tracks/000/001/733/100x100/follow-back-1722556857-SviEzbx69z.jpg",
    genres: ["Jersey Club"],
    moods: ["Elegant", "Epic", "Euphoric", "Glamorous", "Happy", "Hopeful"],
  },
  {
    song_name: "Time Is Eating",
    artist: [
      {
        name: "Unlike Pluto",
        image:
          "https://ncsmusic.s3.eu-west-1.amazonaws.com/artists/000/001/099/325x325/1713272920_Z6Ma98FL2g_Unlike-Pluto.jpg",
      },
    ],
    audio_url:
      "https://ncsmusic.s3.eu-west-1.amazonaws.com/tracks/000/001/732/time-is-eating-1722470458-xkh4Zv9NC2.mp3",
    cover_url:
      "https://ncsmusic.s3.eu-west-1.amazonaws.com/tracks/000/001/732/100x100/time-is-eating-1722470456-CSOOD7YKHm.jpg",
    genres: ["Electronic Rock"],
    moods: ["Dark", "Dreamy", "Elegant", "Mysterious", "Quirky", "Restless"],
  },
  {
    song_name: "My Heart Is Broken",
    artist: [
      {
        name: "NEYVO",
        image:
          "https://ncsmusic.s3.eu-west-1.amazonaws.com/artists/000/001/155/325x325/1723204409_aPeOcK3eRb_321A1172.jpg",
      },
    ],
    audio_url:
      "https://ncsmusic.s3.eu-west-1.amazonaws.com/tracks/000/001/731/my-heart-is-broken-1722297659-UymY5IcFlm.mp3",
    cover_url:
      "https://ncsmusic.s3.eu-west-1.amazonaws.com/tracks/000/001/731/100x100/my-heart-is-broken-1722297657-7xB1esLdPO.jpg",
    genres: ["Dance-Pop"],
    moods: [
      "Dreamy",
      "Elegant",
      "Epic",
      "Euphoric",
      "Glamorous",
      "Laid Back",
      "Quirky",
      "Restless",
      "Sentimental",
    ],
  },
  {
    song_name: "Overdose (feat. David Allen) (Tatsunoshin Remix)",
    artist: [
      {
        name: "Tatsunoshin",
        image:
          "https://ncsmusic.s3.eu-west-1.amazonaws.com/artists/000/000/856/325x325/1680692619_ZbpfDgqov3_Screenshot-2023-04-05-at-12.03.17.png",
      },
      {
        name: "David Allen",
        image:
          "https://ncsmusic.s3.eu-west-1.amazonaws.com/artists/000/001/147/325x325/1721742904_sz0OYtAmHM_Projector-3.jpg",
      },
      {
        name: "Andrew A",
        image:
          "https://ncsmusic.s3.eu-west-1.amazonaws.com/artists/000/000/702/325x325/1642340297_OesdDxlqa4_267747482_3045553915660533_3471483443859855680_n.jpg",
      },
      {
        name: "KDH",
        image:
          "https://ncsmusic.s3.eu-west-1.amazonaws.com/artists/000/000/877/325x325/1680702609_aHQXzIupXa_KDH.png",
      },
    ],
    audio_url:
      "https://ncsmusic.s3.eu-west-1.amazonaws.com/tracks/000/001/727/overdose-feat-david-allen-tatsunoshin-remix-1721952059-BM6edZwvyt.mp3",
    cover_url:
      "https://ncsmusic.s3.eu-west-1.amazonaws.com/tracks/000/001/727/100x100/overdose-feat-david-allen-tatsunoshin-remix-1721952057-G5TkhVnWHs.jpg",
    genres: ["Hardstyle"],
    moods: [
      "Eccentric",
      "Chasing",
      "Euphoric",
      "Heavy",
      "Mysterious",
      "Restless",
      "Dark",
    ],
  },
  {
    song_name: "Puzzle (2024 Edit)",
    artist: [
      {
        name: "RetroVision",
        image:
          "https://ncsmusic.s3.eu-west-1.amazonaws.com/artists/000/000/377/325x325/1597166077_RAHYVPaDfQ_RetroVision.png",
      },
    ],
    audio_url:
      "https://ncsmusic.s3.eu-west-1.amazonaws.com/tracks/000/001/728/1721987489_Fa9ltCmQNd_01-RetroVision---Puzzle-2024-Edit-NCS-Release.mp3",
    cover_url:
      "https://ncsmusic.s3.eu-west-1.amazonaws.com/tracks/000/001/728/100x100/puzzle-2024-edit-1721952062-psTInhmFDm.jpg",
    genres: ["Future House"],
    moods: ["Funny", "Elegant", "Happy"],
  },
  {
    song_name: "Overdose (feat. David Allen) (VIP)",
    artist: [
      {
        name: "David Allen",
        image:
          "https://ncsmusic.s3.eu-west-1.amazonaws.com/artists/000/001/147/325x325/1721742904_sz0OYtAmHM_Projector-3.jpg",
      },
      {
        name: "Andrew A",
        image:
          "https://ncsmusic.s3.eu-west-1.amazonaws.com/artists/000/000/702/325x325/1642340297_OesdDxlqa4_267747482_3045553915660533_3471483443859855680_n.jpg",
      },
      {
        name: "KDH",
        image:
          "https://ncsmusic.s3.eu-west-1.amazonaws.com/artists/000/000/877/325x325/1680702609_aHQXzIupXa_KDH.png",
      },
    ],
    audio_url:
      "https://ncsmusic.s3.eu-west-1.amazonaws.com/tracks/000/001/729/overdose-feat-david-allen-vip-1722254461-17jgEqfUGR.mp3",
    cover_url:
      "https://ncsmusic.s3.eu-west-1.amazonaws.com/tracks/000/001/729/100x100/overdose-feat-david-allen-vip-1722254458-DPmVhNtj32.jpg",
    genres: ["Future House"],
    moods: ["Heavy", "Eccentric", "Chasing", "Dark", "Mysterious"],
  },
  {
    song_name: "Overdose (feat. David Allen) (KDH Edit)",
    artist: [
      {
        name: "David Allen",
        image:
          "https://ncsmusic.s3.eu-west-1.amazonaws.com/artists/000/001/147/325x325/1721742904_sz0OYtAmHM_Projector-3.jpg",
      },
      {
        name: "Andrew A",
        image:
          "https://ncsmusic.s3.eu-west-1.amazonaws.com/artists/000/000/702/325x325/1642340297_OesdDxlqa4_267747482_3045553915660533_3471483443859855680_n.jpg",
      },
      {
        name: "KDH",
        image:
          "https://ncsmusic.s3.eu-west-1.amazonaws.com/artists/000/000/877/325x325/1680702609_aHQXzIupXa_KDH.png",
      },
    ],
    audio_url:
      "https://ncsmusic.s3.eu-west-1.amazonaws.com/tracks/000/001/730/overdose-feat-david-allen-kdh-edit-1722254468-Zu7WYwpCh3.mp3",
    cover_url:
      "https://ncsmusic.s3.eu-west-1.amazonaws.com/tracks/000/001/730/100x100/overdose-feat-david-allen-kdh-edit-1722254466-Zmm1LJ63Gn.jpg",
    genres: ["Future House"],
    moods: ["Heavy", "Eccentric", "Chasing", "Dark", "Mysterious"],
  },
  {
    song_name: "GRAVE",
    artist: [
      {
        name: "Idle Days",
        image:
          "https://ncsmusic.s3.eu-west-1.amazonaws.com/artists/000/000/983/325x325/1692272232_oJ5neduh2E_IDLE-DAYS-1.jpg",
      },
      { name: "HOWL", image: null },
    ],
    audio_url:
      "https://ncsmusic.s3.eu-west-1.amazonaws.com/tracks/000/001/726/grave-1721865658-FWsNrvLnXo.mp3",
    cover_url:
      "https://ncsmusic.s3.eu-west-1.amazonaws.com/tracks/000/001/726/100x100/grave-1721865655-Bzhp5RtDMn.jpg",
    genres: ["Drum & Bass"],
    moods: ["Dreamy", "Elegant", "Euphoric", "Glamorous", "Restless"],
  },
];

module.exports = data;
