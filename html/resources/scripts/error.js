var quotes = [
    // The Silmarillion
    "But Ilúvatar knew that Men, being set amid the turmoils of the powers of the world, would stray often, and would not use their gifts in harmony.",
    "We renounce no friendship. But it may be the part of a friend to rebuke a friend’s folly.",
    "Hope rather that in the end even the least of your desires shall have fruit.",
    "For of us is required a blind trust, and a hope without assurance, knowing not what lies before us in a little while.",
    "Healing cometh only by suffering and patience, and maketh no demand, not even for Justice.",
    "My fate, O King, led me hither, through perils such as few even of the Elves would dare. And here I have found what I sought not indeed.",
    "Justice worketh only within the bonds of things as they are... and therefore though Justice is itself good and desireth no further evil, it can but perpetuate the evil that was, and doth not prevent it from the bearing of fruit in sorrow.",
    // The fellowship of the ring
    "He that breaks a thing to find out what it is, has left the path of wisdom.",
    "Despair is only for those who see the end beyond all doubt.",
    "It is a strange fate that we should suffer so much fear and doubt over so small a thing.",
    "I wish the Ring had never come to me. I wish none of this had happened.",
    "Even the very wise do not see all ends.",
    "When in doubt, follow your nose.",
    // The two towers
    "There is no curse in Elvish, Entish, or the tongues of Men for this treachery.",
    "But in the end it’s only a passing thing, this shadow; even darkness must pass.",
    // The return of the king
    "The beacons are lit! Gondor calls for aid!",
    "In this hour, I do not believe that any darkness will endure.",
    "A day may come when the courage of men fails… but it is not THIS day.",
];

document.getElementById('quote').innerHTML = quotes[quotes.length * Math.random() | 0];
