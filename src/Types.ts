export interface SurahList {
    index: number;
    surahName: string;
    surahNameArabic: string;
    surahNameTranslation: string;
    totalAyah: number
}


export interface SurahData {
    surahNameArabicLong: string;
    totalAyah: number;
    surahNo: number;
    arabic1: string[];
    english: string[];
    audio: {
        4: AudioData
    }
}

export interface AudioData {
    reciter: string;
    originalUrl: string
}