import { functionProposition } from "../utilities/function-proposition";

const calculateEnthalpy = (data, dT = 1, shouldInterpolate = false, inputs = []) => {
        
        /**
         * We can assume that our data are correct
         * there should be validation on the beggining of the import
         * so that if something is wrong, user could notice this
         * exacly when he is doing it.
         */

        const result = shouldInterpolate ?
            calculateEnthalpyInterpolate(data, dT, inputs) :
            calculateEnthalpyNoInterpolate(data, inputs);
        return result || [];
}

const calculateEnthalpyInterpolate = (data, dT, inputs) => {
    let result = [];

    const minTemp = data[0] && data[0].temperature;
    const maxTemp = data.length > 0 && data[data.length - 1];

    const { f, definiteIntegral : integral } = functionProposition(dT); // Passing dT as it causes error minimalisation

    let elementsNumbe

    data.forEach((row, rowId) => {
        const [ T, Cp ] = row; // Temperature and specific heat

        if (rowId === 0) {
            result.push({
                temperature: T,
                specificHeat: Cp,
            });
        } else {
            const [ pT, pCp ] = data[rowId - 1]; // previous Temperature and specific heat
            let i = pT;
            while(true) {
                if(i > T) {
                    i = T;
                }

                const iCp = pCp + (i - pT) / (T - pT) * (Cp - pCp); // Interpolated specific heat

                result.push({
                    temperature: i,
                    specificHeat: iCp,
                });

                if(i === T) {
                    break;
                }

                i += dT;
            }
        }
    });

    for (let j = 0; j < result.length; j++) {
        const { temperature : T, specificHeat : Cp } = result[j];

        if (j === 0) {
            result[j]['enthalpy'] = T * Cp;
        } else {
            const { enthalpy : pH, temperature : pT } = result[j - 1];
            result[j]['enthalpy'] = pH + Cp * (T - pT);
        }

        inputs.forEach(({max, min, effect}) => {
            if(T >= min && T <= max) {
                const pCT = (T - min) / (max - min) * 100; // Percent of current temperature in range [min, max]
                const dX = 100 / (max - min);
                const factor = f(pCT) * dX / integral;

                result[j].enthalpy += effect * factor;
            }
        });

    }

    return result;
}

const calculateEnthalpyNoInterpolate = (data) => {
    const result = [];
    data.forEach((row, rowId) => {
        const [ T, Cp ] = row; // Temperature and specific heat

        if (rowId === 0) {
            result.push({
                temperature: T,
                specificHeat: Cp,
                enthalpy: T * Cp,
            });
        } else {
            const {
                enthalpy : pH,
                temperature : pT,
                specificHeat : pCp,
            } = result[result.length - 1]; // Previous/Last Enthalpy
            const H = pH + (Cp + pCp) / 2 * (T - pT);

            result.push({
                temperature: T,
                specificHeat: Cp,
                enthalpy: H,
            });
        }
    });
    return result;
}

export default calculateEnthalpy;