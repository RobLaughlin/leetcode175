function nextGreatestLetter(letters: string[], target: string): string {
    let l = 0;
    let r = letters.length - 1;

    let mid = 0;
    let smallest: null | string = null;
    while (l <= r) {
        mid = Math.floor((r + l) / 2);

        if (letters[mid] <= target) {
            l = mid + 1;
        } else {
            smallest = letters[mid];
            r = mid - 1;
        }
    }

    return smallest === null ? letters[0] : smallest;
}
