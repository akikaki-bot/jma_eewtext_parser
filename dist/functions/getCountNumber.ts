

export function ParseTelegramCount(telegramCount: string) {
    const Alphabet: string[] = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
    if (Alphabet.includes(telegramCount)) {
        const index = Alphabet.indexOf(telegramCount.substring(0, 1));
        return parseInt((index * 10) + telegramCount.substring(1, 2));
    }
    return parseInt(telegramCount);
}