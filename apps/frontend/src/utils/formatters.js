export const normalizePhone = (value) => value.replace(/\D/g, "");
export const formatPhone = (value) => {
    const digits = normalizePhone(value);
    const parts = [
        digits.slice(0, 2),
        digits.length > 2 ? digits.slice(2, 7) : "",
        digits.length > 7 ? digits.slice(7, 11) : "",
    ].filter(Boolean);
    if (!parts.length)
        return "";
    const [ddd, middle, last] = parts;
    if (!middle)
        return `(${ddd}`;
    if (!last)
        return `(${ddd}) ${middle}`;
    return `(${ddd}) ${middle}-${last}`;
};
export const formatCurrency = (value) => new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
}).format(value);
export const maskPatientName = (name) => {
    const words = name.split(" ");
    if (words.length <= 2) {
        return `${words[0]} ${words[1]?.charAt(0) ?? ""}***`;
    }
    return words
        .map((word, index) => {
        if (index === 0 || index === words.length - 1) {
            return word;
        }
        return `${word.charAt(0)}***`;
    })
        .join(" ");
};
