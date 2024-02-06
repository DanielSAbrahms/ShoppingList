export const generateRandomId = () => {
    return Math.floor(Math.random() * 1000000);
};

export const formatIncomingDate = (dateString: string): string => {
    const year = dateString.substring(0, 4);
    const month = dateString.substring(5, 7);
    const day = dateString.substring(8, 10);

    return `${month}/${day}/${year}`;
};

export const formatOutgoingDate = (dateString: string): string => {
    const month = dateString.substring(0, 2);
    const day = dateString.substring(3, 5);
    const year = dateString.substring(6, 10);

    return `${year}-${month}-${day}`;
};
