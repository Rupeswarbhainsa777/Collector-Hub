export function formatPrice(value: number): string {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0,
    }).format(value);
}

export function formatDate(isoDate: string): string {
    const date = new Date(isoDate);
    return new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    }).format(date);
}

export function timeAgo(isoDate: string): string {
    const seconds = Math.floor((Date.now() - new Date(isoDate).getTime()) / 1000);
    const intervals: [number, string][] = [
        [31536000, 'y'],
        [2592000, 'mo'],
        [86400, 'd'],
        [3600, 'h'],
        [60, 'm'],
    ];

    for (const [secondsInUnit, label] of intervals) {
        const count = Math.floor(seconds / secondsInUnit);
        if (count >= 1) return `${count}${label} ago`;
    }
    return 'just now';
}
