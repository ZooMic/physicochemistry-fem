import { SSL_OP_NO_SESSION_RESUMPTION_ON_RENEGOTIATION } from "constants";

export const functionProposition = (el) => {
    let definiteIntegral = 0;

    const min = 0;
    let max = 100;
    const dx = (max - min) / el;

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