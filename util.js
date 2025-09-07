export function reverseArr(arr) {
    const reversedArr = []

    for (let i = arr.length - 1; i >= 0; i--) {
        reversedArr.push(arr[i])
    }

    return reversedArr;
}