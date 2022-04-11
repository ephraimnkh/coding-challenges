function solution(s) {
    if (s.codePointAt(0) >= 65 && s.codePointAt(0) <= 90) {  // please fix condition
        return 'upper';
    } else if (s.codePointAt(0) >= 97 && s.codePointAt(0) <= 122) {  // please fix condition
        return 'lower';
    } else if (s.codePointAt(0) >= 48 && s.codePointAt(0) <= 57) {  // please fix condition
        return 'digit';
    } else {
        return "other";
    }
}

solution("digit");
