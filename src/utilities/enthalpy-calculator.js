const calculateEnthalpy = (data, dT = 1, shouldInterpolate = false) => {
        
        /**
         * We can assume that our data are correct
         * there should be validation on the beggining of the import
         * so that if something is wrong, user could notice this
         * exacly when he is doing it.
         */
        
        const result = shouldInterpolate ?
            calculateEnthalpyInterpolate(data, dT) :
            calculateEnthalpyNoInterpolate(data);
        return result || [];
}

const calculateEnthalpyInterpolate = (data, dT) => {
    let result = [];

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