

export const definiteIntegralCalculation = (functionFormula, dx, min, max) => {
    let integral = 0;

    const newFormula = "return (x) => { return " + functionFormula + "; };";

    const createF = Function(newFormula);
    const f = createF();

    for (let i = min; i < max; i += dx) {
        integral += f(i);
    }

    integral *= dx;

    return {
        f,
        integral,
        min,
        max,
    }

}