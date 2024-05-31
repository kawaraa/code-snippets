const a = [1, 3, 6, 4, 1, 2];
const aa = [8, 4, 1, 2, 3];

function solution(A) {
  const mergedArray = splitAndSort(A);

  let res = 1;

  for (value of mergedArray) {
    if (value < 1) {
      continue;
    }

    if (res === value) {
      res++;
    }
  }

  return res;
}

function splitAndSort(givenArray) {
  if (!givenArray || givenArray.length === 1) {
    return givenArray;
  }

  const left = splitAndSort(givenArray.splice(0, Math.round(givenArray.length / 2)));
  const right = splitAndSort(givenArray);

  return sort(left, right);
}

function sort(left, right) {
  let leftIndex = 0;
  let rightIndex = 0;
  let result = [];

  for (let i = 0; leftIndex < left.length && rightIndex < right.length; i++) {
    if (left[leftIndex] > right[rightIndex]) {
      result[i] = right[rightIndex];
      rightIndex++;
    } else {
      result[i] = left[leftIndex];
      leftIndex++;
    }
  }

  for (let i = leftIndex; leftIndex < left.length; leftIndex++) {
    result.push(left[leftIndex]);
  }

  for (let i = rightIndex; rightIndex < right.length; rightIndex++) {
    result.push(right[rightIndex]);
  }

  return result;
}

console.log(solution(aa));
