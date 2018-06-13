import { functionProposition } from "../utilities/function-proposition";
import { definiteIntegralCalculation } from '../utilities/definite-integral-calculation';
const randomColor = require('random-color');

const calculateEnthalpy = (data, dT = 1, shouldInterpolate = false, inputs = [], functionInputs = []) => {
        
        /**
         * We can assume that our data are correct
         * there should be validation on the beggining of the import
         * so that if something is wrong, user could notice this
         * exacly when he is doing it.
         */

        const funcInputs = functionInputs
            .filter(({functionActive}) => functionActive)
            .map(({functionFormula, functionName, rangeMin, rangeMax}) => ({
                calculated: definiteIntegralCalculation(functionFormula, dT, rangeMin, rangeMax),
                functionName,
                borderColor: randomColor().hexString(),
            }));

        let result = [];

        if (shouldInterpolate) {
            funcInputs.forEach(funcInputs => {
                result.push({
                    data: calculateEnthalpyInterpolate(data, dT, inputs, funcInputs),
                    ...funcInputs,
                });
            });
        } else {
            result = calculateEnthalpyNoInterpolate(data, inputs);
        }

        return result;
}

const calculateEnthalpyInterpolate = (data, dT, inputs, funcInputs) => {
    let result = [];

    const minTemp = data[0] && data[0].temperature;
    const maxTemp = data.length > 0 && data[data.length - 1];

    const { calculated: { f, integral, max: fmax, min: fmin }, functionName, borderColor } = funcInputs // Passing dT as it causes error minimalisation

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

        let x
        inputs.forEach(({max, min, effect}) => {
            if(T >= min && T <= max) {
                x = fmin + (fmax - fmin) * (T - min) / (max - min); // Percent of current temperature in range [min, max]
                const dX = (fmax - fmin) / (max - min);
                const factor = f(x) * dX / integral;

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