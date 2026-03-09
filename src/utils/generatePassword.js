export const generatePassword = (schoolName) => {
    const alphabets = "abcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";

    let password = "";

    for (let i = 0; i < 12; i++){
        const randomIndex = Math.floor(Math.random() * alphabets.length);
        password += alphabets[randomIndex];
    }

    // const schoolPart = schoolName.slice(0, 3).toLowerCase();
    const finalP = `${password}`

    return finalP;
}