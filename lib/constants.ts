// Dummy data for VerseFlow MVP

export interface BibleVerse {
  id: string
  reference: string
  text: string
  version: 'KJV' | 'NIV' | 'NKJV'
}

export interface Song {
  id: string
  title: string
  artist: string
  lyrics: string
  verses: string[]
  bpm?: number
}

export interface MediaItem {
  id: string
  title: string
  type: 'image' | 'video'
  url: string
  duration?: number
}

export interface Slide {
  id: string
  type: 'verse' | 'song' | 'media'
  content: BibleVerse | Song | MediaItem
  duration?: number
}

// Bible Verses - Multiple versions
export const BIBLE_VERSES: BibleVerse[] = [
  {
    id: 'john-3-16-kjv',
    reference: 'John 3:16',
    version: 'KJV',
    text: 'For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.',
  },
  {
    id: 'john-3-16-niv',
    reference: 'John 3:16',
    version: 'NIV',
    text: 'For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.',
  },
  {
    id: 'psalm-23-1-kjv',
    reference: 'Psalm 23:1',
    version: 'KJV',
    text: 'The LORD is my shepherd; I shall not want.',
  },
  {
    id: 'psalm-23-1-niv',
    reference: 'Psalm 23:1',
    version: 'NIV',
    text: 'The LORD is my shepherd, I lack nothing.',
  },
  {
    id: 'romans-8-28-kjv',
    reference: 'Romans 8:28',
    version: 'KJV',
    text: 'And we know that all things work together for good to them that love God, to them who are the called according to his purpose.',
  },
  {
    id: 'romans-8-28-niv',
    reference: 'Romans 8:28',
    version: 'NIV',
    text: 'And we know that in all things God works for the good of those who love him, who have been called according to his purpose.',
  },
  {
    id: 'proverbs-3-5-kjv',
    reference: 'Proverbs 3:5-6',
    version: 'KJV',
    text: 'Trust in the LORD with all thine heart; and lean not unto thine own understanding. In all thy ways acknowledge him, and he shall direct thy paths.',
  },
  {
    id: 'philippians-4-6-niv',
    reference: 'Philippians 4:6',
    version: 'NIV',
    text: 'Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God.',
  },
  {
    id: 'matthew-5-7-kjv',
    reference: 'Matthew 5:7',
    version: 'KJV',
    text: 'Blessed are the merciful: for they shall obtain mercy.',
  },
  {
    id: '1-peter-3-15-nkjv',
    reference: '1 Peter 3:15',
    version: 'NKJV',
    text: 'But sanctify the Lord God in your hearts, and always be ready to give a defense to everyone who asks you a reason for the hope that is in you, with meekness and fear;',
  },
]

// Songs
export const SONGS: Song[] = [
  {
    id: 'amazing-grace',
    title: 'Amazing Grace',
    artist: 'John Newton',
    verses: ['Verse 1', 'Verse 2', 'Verse 3', 'Chorus'],
    bpm: 76,
    lyrics: `Amazing grace, how sweet the sound
That saved a wretch like me
I once was lost but now am found
Was blind but now I see

'Twas grace that taught my heart to fear
And grace my fears relieved
How precious did that grace appear
The hour I first believed

Through many dangers, toils and snares
I have already come
'Tis grace hath brought me safe thus far
And grace will lead me home`,
  },
  {
    id: 'how-great-thou-art',
    title: 'How Great Thou Art',
    artist: 'Carl Boberg',
    verses: ['Verse 1', 'Verse 2', 'Chorus'],
    bpm: 80,
    lyrics: `O Lord my God, when I in awesome wonder
Consider all the worlds thy hands have made
I see the stars, I hear the rolling thunder
Thy power throughout the universe displayed

When Christ shall come with shout of acclamation
And take me home, what joy shall fill my heart
Then I shall bow in humble adoration
And there proclaim, "My God, how great thou art!"`,
  },
  {
    id: 'jesus-loves-me',
    title: 'Jesus Loves Me',
    artist: 'Anna Bartlett Warner',
    verses: ['Verse 1', 'Verse 2', 'Verse 3'],
    bpm: 100,
    lyrics: `Jesus loves me this I know
For the Bible tells me so
Little ones to Him belong
They are weak but He is strong

Jesus loves me, loves even me
When my heart is full of sin
Jesus cares and loves me still
This I know, I'm in His care`,
  },
  {
    id: 'great-is-thy-faithfulness',
    title: 'Great Is Thy Faithfulness',
    artist: 'Thomas Chisholm',
    verses: ['Verse 1', 'Verse 2', 'Chorus'],
    bpm: 70,
    lyrics: `Great is thy faithfulness, O God my Father
There is no shadow of turning with thee
Thou changest not, thy compassions they fail not
As thou hast been thou forever wilt be

Morning by morning new mercies I see
All I have needed thy hand hath provided
Great is thy faithfulness, Lord unto me`,
  },
  {
    id: 'what-a-wonderful-savior',
    title: 'What a Wonderful Savior',
    artist: 'John Newton',
    verses: ['Verse 1', 'Verse 2', 'Chorus'],
    bpm: 85,
    lyrics: `What a wonderful Savior is Jesus my Lord
What a wonderful Savior is He
He has robbed the grave of its terrors
And He has purchased a home there for me`,
  },
  {
    id: 'blessed-assurance',
    title: 'Blessed Assurance',
    artist: 'Fanny J. Crosby',
    verses: ['Verse 1', 'Chorus'],
    bpm: 90,
    lyrics: `Blessed assurance, Jesus is mine
O what a foretaste of glory divine
This is my story, this is my song
Praising my Savior all the day long`,
  },
]

// Media Items
export const MEDIA_ITEMS: MediaItem[] = [
  {
    id: 'sunset-1',
    title: 'Sunset Over Mountains',
    type: 'image',
    url: '/placeholder-sunset.jpg',
  },
  {
    id: 'cross-1',
    title: 'Cross in Light',
    type: 'image',
    url: '/placeholder-cross.jpg',
  },
  {
    id: 'nature-1',
    title: 'Mountain Stream',
    type: 'image',
    url: '/placeholder-nature.jpg',
  },
  {
    id: 'light-1',
    title: 'Light Through Clouds',
    type: 'image',
    url: '/placeholder-light.jpg',
  },
  {
    id: 'praise-video',
    title: 'Praise & Worship',
    type: 'video',
    url: '/videos/praise.mp4',
    duration: 180,
  },
  {
    id: 'hymn-video',
    title: 'Historic Hymns',
    type: 'video',
    url: '/videos/hymns.mp4',
    duration: 240,
  },
]

// User Settings Defaults
export const DEFAULT_SETTINGS = {
  bibleVersion: 'NIV' as const,
  theme: 'dark' as const,
  fontSize: 'large' as const,
  backgroundColor: '#000000',
  textColor: '#FFFFFF',
  premiumEnabled: false,
  aiSuggestionsEnabled: false,
  autoAdvanceSlides: false,
  slideDisplayTime: 5, // seconds
  dualScreenMode: false,
}

// Church Testimonials
export const TESTIMONIALS = [
  {
    name: 'Pastor James Mitchell',
    church: 'Grace Community Church',
    quote: 'VerseFlow has transformed our worship presentations. The clean interface and powerful features make Sunday mornings so much easier.',
  },
  {
    name: 'Sarah Chen',
    church: 'Bethel Fellowship',
    quote: 'Finally, a tool built specifically for churches. Our AV team loves the simplicity and control.',
  },
  {
    name: 'David Rodriguez',
    church: 'New Hope Christian Center',
    quote: 'The AI suggestions for songs and verses have actually inspired our worship planning. Incredible tool.',
  },
]
