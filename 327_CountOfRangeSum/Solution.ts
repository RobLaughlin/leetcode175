// Copy-pasted solution from https://algo.monster/liteproblems/327.
// Need to think on this one more and come back to it

// Sizes for the BIT and original array
let bitSize: number;
let arraySize: number;

// BIT data structure as an array
let bitData: number[];

// Function to initialize the BIT with a given size

function initializeBIT(size: number): void {
    bitSize = size;
    bitData = Array(bitSize + 1).fill(0);
}

// Function to update the BIT for an index with a value
function updateBIT(index: number, value: number): void {
    while (index <= bitSize) {
        bitData[index] += value;
        index += index & -index;
    }
}

// Function to query the BIT up to a given index
function queryBIT(index: number): number {
    let sum = 0;

    while (index > 0) {
        sum += bitData[index];
        index -= index & -index;
    }

    return sum;
}

// Function to calculate the count of range sums within the given bounds
function countRangeSum(nums: number[], lower: number, upper: number): number {
    arraySize = nums.length;

    const prefixSums = Array(arraySize + 1).fill(0);

    // Calculate prefix sums of the original array
    for (let i = 0; i < arraySize; ++i) {
        prefixSums[i + 1] = prefixSums[i] + nums[i];
    }

    // Prepare arrays for discretization
    let arr: number[] = Array((arraySize + 1) * 3);

    for (let i = 0, j = 0; i <= arraySize; ++i, j += 3) {
        arr[j] = prefixSums[i];
        arr[j + 1] = prefixSums[i] - lower;
        arr[j + 2] = prefixSums[i] - upper;
    }

    // Sort and remove duplicates
    arr.sort((a, b) => a - b);
    let m = 0;

    for (let i = 0; i < arr.length; ++i) {
        if (i === 0 || arr[i] !== arr[i - 1]) {
            arr[m++] = arr[i];
        }
    }
    arr = arr.slice(0, m);

    // Initialize BIT
    initializeBIT(m);
    let answer = 0;
    for (const x of prefixSums) {
        const left = binarySearch(arr, x - upper);
        const right = binarySearch(arr, x - lower);
        answer += queryBIT(right) - queryBIT(left - 1);
        updateBIT(binarySearch(arr, x), 1);
    }

    return answer;
}

// Function to perform binary search
function binarySearch(nums: number[], target: number): number {
    let left = 0;
    let right = nums.length; // Note: 'r' was renamed to 'right'.

    while (left < right) {
        const mid = (left + right) >> 1;

        if (nums[mid] >= target) {
            right = mid;
        } else {
            left = mid + 1;
        }
    }

    return left + 1; // BIT indices are 1-based.
}
