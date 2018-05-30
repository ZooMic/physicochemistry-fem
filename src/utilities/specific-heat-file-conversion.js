
const specificHeatFileConversion = (file) => {
    try {
        const specificHeat = file
            .split("\n")
            .map(line => line.split(" "))
            .filter(line => line.length > 1)
            .map((line, index) => {
                return line
                    .map(item => {
                        if (item === undefined || item === null || item === "" || isNaN(item)) {
                            throw new Error(`File have some defect. Check line ${index}`);
                        } else {
                            return Number(item);
                        }
                    });
            });

        if (specificHeat.length === 0) {
            throw new Error(`File is probably not selected or empty.`);
        }
        
        return { specificHeat };
    } catch (error) {
        return { error, failure: true };
    }

}

export default specificHeatFileConversion;