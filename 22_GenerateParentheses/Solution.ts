function generateParenthesis(n: number): string[] {
    let parens: string[] = [];
    const curParen: string[] = [];
    function backtrack(lParens: number, rParens: number) {
        if (lParens > n || rParens > n) {
            return;
        }

        const balanced = lParens === rParens;
        if (balanced && rParens === n) {
            parens.push(curParen.join(""));
            return;
        }

        curParen.push("(");
        backtrack(lParens + 1, rParens);
        curParen.pop();

        if (rParens < lParens) {
            curParen.push(")");
            backtrack(lParens, rParens + 1);
            curParen.pop();
        }
    }

    backtrack(0, 0);
    return parens;
}
