export const functionProposition = (dx) => {
    let definiteIntegral = 0;

    const min = 0;
    let max = 100;

    const f = x =>  Math.abs((-x + 100)*(-x + 110)*-x) / 170600;

    for (let i = min; i < max; i += dx) {
        definiteIntegral += f(i);
    }

    definiteIntegral *= dx;

    return {
        f,
        definiteIntegral,
    }

}