import '../style/styles.css';
import { useState } from 'react';
import { Icon } from '@iconify/react';

const FEMALE_ICON = 'material-symbols-light:female';

const statClass =
    'w-16 h-12 bg-gray-300/40 text-black text-wrap text-center rounded-lg flex flex-col font-semibold shadow-sm';

const defaultDescription =
    'Buddy is a friendly and energetic Golden Retriever who loves to play fetch and go for long walks. He is great with kids and other pets, making him the perfect family companion. Buddy is looking for a loving home where he can get plenty of exercise and affection.';

const Card = (props) => {
    const {
        img,
        fallbackImg,
        name,
        breed,
        age,
        height,
        weight,
        distance,
        description = defaultDescription,
        gender = 'male',
        onAdopt,
        onDonate,
    } = props;

    const [isExpanded, setIsExpanded] = useState(false);
    const imageSrc = img || fallbackImg;

    return (
        <div className="container w-full h-full flex items-center justify-center p-4">
            <div
                className={`
                    card w-full max-w-[300px] bg-white rounded-4xl shadow-2xl overflow-hidden
                    flex flex-col items-stretch transition-all duration-300 ease-in-out
                    md:max-w-[340px]
                    ${isExpanded ? 'md:h-auto md:min-h-[640px]' : 'md:h-[640px]'}
                    lg:max-w-none lg:w-[min(100%,720px)] lg:flex-row
                    ${isExpanded ? 'lg:h-auto lg:min-h-[340px]' : 'lg:h-[340px]'}
                `}
            >
                <div
                    className="
                        shrink-0 w-full overflow-hidden transition-all duration-300 ease-in-out
                        h-[200px] md:h-[340px]
                        lg:w-1/2 lg:h-auto lg:min-h-[340px] lg:self-stretch
                    "
                >
                    {imageSrc ? (
                        <img
                            src={imageSrc}
                            alt={name || 'Pet'}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                            <Icon
                                className="w-16 h-16 text-gray-400"
                                icon="ph:paw-print-fill"
                            />
                        </div>
                    )}
                </div>

                <div
                    className="
                        flex flex-col gap-3 py-3 flex-1 min-w-0
                        lg:py-4 lg:px-4 lg:justify-between
                    "
                >
                    <div className="grid grid-cols-2 grid-rows-2 gap-1 px-4 lg:px-0">
                        <h1 className="row-span-1 col-span-1 flex items-center gap-1 font-bold text-xl md:text-2xl">
                            {name || 'Buddy'}
                            {gender === 'male' && (
                                <Icon
                                    className="w-4 h-4 text-black shrink-0"
                                    icon="material-symbols:male"
                                />
                            )}
                            {gender === 'female' && FEMALE_ICON && (
                                <Icon
                                    className="w-4 h-4 text-black shrink-0"
                                    icon={FEMALE_ICON}
                                />
                            )}
                        </h1>
                        <p className="row-span-2 col-span-1 font-light text-gray-500 text-sm md:text-base">
                            {breed || 'Golden Retriever'}
                        </p>
                        <p className="row-span-full col-start-2 self-center text-end flex items-center justify-end gap-1 text-xs">
                            <Icon
                                className="w-5 h-5 text-pink-700 shrink-0"
                                icon="mdi-light:map-marker"
                            />
                            {distance || '2.5 miles'}
                        </p>
                    </div>

                    <div
                        className="
                            w-full flex items-center gap-14 px-4 justify-center
                            lg:gap-4 lg:justify-start
                        "
                    >
                        <h2 className={statClass}>
                            Age{' '}
                            <span className="font-light">{age || '7 '} yr</span>
                        </h2>
                        <h2 className={statClass}>
                            Height{' '}
                            <span className="font-light">
                                {height || '35'} inch
                            </span>
                        </h2>
                        <h2 className={statClass}>
                            Weight{' '}
                            <span className="font-light">
                                {weight || '17'} lbs
                            </span>
                        </h2>
                    </div>

                    <div className="px-4 transition-all duration-300 ease-in-out">
                        <div className="relative">
                            <p
                                className={`text-slate-800 text-sm md:text-base leading-relaxed ${
                                    !isExpanded ? 'line-clamp-3' : ''
                                }`}
                            >
                                {description}
                            </p>

                            {!isExpanded && (
                                <div className="absolute bottom-0 right-0 bg-gradient-to-l from-white via-white to-transparent pl-8 pt-1">
                                    <button
                                        type="button"
                                        onClick={() => setIsExpanded(true)}
                                        className="text-pink-500 font-semibold uppercase text-sm bg-white"
                                    >
                                        See more
                                    </button>
                                </div>
                            )}
                        </div>

                        {isExpanded && (
                            <button
                                type="button"
                                onClick={() => setIsExpanded(false)}
                                className="mt-2 text-pink-500 font-semibold uppercase text-sm"
                            >
                                Hide
                            </button>
                        )}
                    </div>

                    <div
                        className="
                            flex flex-col items-stretch gap-2 px-4 pb-4
                            md:flex-row md:items-center md:justify-center md:gap-4 md:pb-0
                            lg:px-0 lg:pb-0
                        "
                    >
                        <button
                            type="button"
                            onClick={onDonate}
                            className="
                                w-full h-10 bg-gray-300/40 text-black font-bold rounded-lg
                                flex items-center gap-2 justify-center
                                hover:bg-gray-500 hover:text-white
                                md:w-26
                            "
                        >
                            Donate <Icon icon="solar:dollar-bold" />
                        </button>
                        <button
                            type="button"
                            onClick={onAdopt}
                            className="
                                w-full h-10 bg-pink-600 text-[18px] text-white rounded-lg
                                flex items-center gap-2 justify-center
                                hover:bg-pink-900
                                md:w-46
                            "
                        >
                            Adopt <Icon icon="ph:paw-print-fill" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;
