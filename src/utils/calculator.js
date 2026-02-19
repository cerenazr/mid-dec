/**
 * MİD-DEC Risk Calculation Logic (MOCK)
 * 
 * Inputs:
 * - data (object): Clinical parameters (currently unused in mock mode)
 * 
 * Output:
 * - score (0-100)
 * - category (Low/Medium/High)
 * - riskColor (Green/Yellow/Red)
 */
export const calculateRisk = (data) => {
    // Mock calculation: generate a random score between 0 and 100
    const score = Math.floor(Math.random() * 101);

    let category = 'Low';
    let riskColor = '#18C07A'; // Success green from design

    if (score >= 31 && score <= 70) {
        category = 'Medium';
        riskColor = '#FFC107';
    } else if (score > 70) {
        category = 'High';
        riskColor = '#EA4335'; // High risk red from design
    }

    return {
        score,
        category,
        riskColor
    };
};
