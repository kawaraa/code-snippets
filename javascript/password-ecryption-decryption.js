function encryptPassword(s) {
  let encrypted = "";
  let i = 0;

  while (i < s.length) {
    if (s[i] >= "a" && s[i] <= "z" && s[i + 1] >= "A" && s[i + 1] <= "Z") {
      // Swap lowercase and uppercase characters, add '*', move to i + 2
      encrypted += s[i + 1] + s[i] + "*";
      i += 2;
    } else if (+s[i] >= 0 && +s[i] <= 9) {
      // Replace number with 0, place original number at the start, move to i + 1
      encrypted = s[i] + encrypted + "0";
      i++;
    } else {
      // Move to the next character
      encrypted += s[i];
      i++;
    }
  }

  return encrypted;
}

// Example usage:
// console.log(encryptPassword("hAck3rr4nk")); // Output: "43Ah*ck0rr0nk"
// console.log(encryptPassword("aP1pL5e")); // Output: "51Pa*0Lp*0e"
// console.log(encryptPassword("23aP1pL5e")); // Output: "51Pa*0Lp*0e"
// console.log(encryptPassword("poTaTO")); // => "pTo*Ta*O"

function decryptPassword(s) {
  let decrypted = "";
  let offset = 0;

  for (let i = s.length - 1; i >= offset; ) {
    if (s[i] == "*" && s[i - 1] >= "a" && s[i - 1] <= "z" && s[i - 2] >= "A" && s[i - 2] <= "Z") {
      decrypted = s[i - 1] + s[i - 2] + decrypted;
      i -= 3;
    } else if (s[i] == "0") {
      decrypted = s[offset] + decrypted;
      i -= 1;
      offset += 1;
    } else {
      decrypted = s[i] + decrypted;
      i -= 1;
    }
  }

  return decrypted;
}

// Example usage:
console.log(decryptPassword("43Ah*ck0rr0nk")); // Output: "hAck3rr4nk"
console.log(decryptPassword("51Pa*0Lp*0e")); // Output: "aP1pL5e"
console.log(decryptPassword("513200Pa*0Lp*0e")); // Output: "23aP1pL5e"
console.log(decryptPassword("pTo*Ta*O")); // => "poTaTO"
