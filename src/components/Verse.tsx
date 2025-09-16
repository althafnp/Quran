import React from 'react'

const toArabicDigits = (number: number) => {
    return new Intl.NumberFormat('ar-EG').format(number);
};

interface VerseProps {
    arabicText: string;
    translation: string;
    verseNumber: number;
    showTranslation: boolean
}

const Verse: React.FC<VerseProps> = ({ arabicText, translation, verseNumber, showTranslation }) => {
  return (
    <div className="mb-8 md:mb-12">
        {/* Arabic Text */}
        <div className="text-right mb-4">
            <p className="dark:text-white text-xl md:text-2xl lg:text-3xl leading-relaxed font-arabic">
                {arabicText} <span className="dark:text-white text-2xl">۝{toArabicDigits(verseNumber)}</span>
            </p>
        </div>
    
        {/* Translation */}
        {
            showTranslation && (
                <div className="text-left">
                    <p className="dark:text-gray-300 text-gray-900 text-sm md:text-base lg:text-lg leading-relaxed">
                        {translation}
                    </p>
                </div>
            )
        }
        
    
        {/* Divider */}
        <div className="mt-6 border-t border-gray-700"></div>
    </div>
    )
}

export default Verse