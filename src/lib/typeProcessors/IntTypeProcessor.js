import TypeProcessor from './TypeProcessor.js';
import config from '../../../gearz.config.js';
import formato from 'formato';

class IntTypeProcessor extends TypeProcessor {

    /**
     * Verifies whether a number is an integer
     * @param value
     * @returns {boolean}
     */
    isInt(value) {
        return !isNaN(value) &&
            parseInt(Number(value)) == value &&
            !isNaN(parseInt(value, 10));
    }

    /**
     * Processes a string as an integer
     * @param value
     */
    process(value) {
        // if the value is null or undefined
        if(value === undefined || value === null || value === '') {
            return {
                valid: true,
                convertedValue: undefined
            };
        }

        let convertedValue = formato.unformat(value);

        // if the value is a valid integer
        if(this.isInt(convertedValue)) {
            return {
                valid: true,
                convertedValue: convertedValue
            };
        }
        // if the value is not a valid integer
        else {
            return {
                valid: false,
                convertedValue: undefined
            };
        }
    }
}

export default IntTypeProcessor;