// Enchanted Forest — Forest #094a2f | Antique Gold #AA8D5A | Obsidian #000000 | Sage Mist #CBCBC0
export const themeConfig = {
    /** Client preview overlay — set enabled: false before launch */
    approvalWatermark: {
        enabled: false,
        text: 'THIS IS HALF DONE, FOR CLIENT APPROVAL ONLY',
        lines: 5,
        rotation: -32,
    },
    backgrounds: {
        primary: 'bg-forest',
        secondary: 'bg-gold',
        accent: 'bg-gold',
        light: 'bg-white/50',
        theme: 'bg-sage',
        garden: 'bg-sage',
        crumpledPaper: 'bg-[url("/assets/images/crumpled-paper.png")] bg-cover bg-center bg-no-repeat',
    },

    text: {
        primary: 'text-forest',
        secondary: 'text-gold',
        accent: 'text-gold',
        muted: 'text-gold/80',
        dark: 'text-forest',
        theme: 'text-gold',
        pause: 'text-white',
        custom: 'text-obsidian',
        light: '#AA8D5A',
        lightBlack: '#094a2f',
        cream: '#CBCBC0',
        tan: '#AA8D5A',
        wine: '#094a2f',
        burgundyDark: '#094a2f',
        burntOrange: '#094a2f',
        sageGreen: '#094a2f',
    },

    borders: {
        primary: 'border-forest',
        secondary: 'border-gold/60',
        accent: 'border-gold',
        theme: 'border-gold/40',
        garden: 'border-gold/40',
    },

    buttons: {
        primary: 'bg-forest hover:bg-wedding-600',
        secondary: 'border border-gold hover:border-gold-dark',
        text: 'text-forest hover:text-white',
        theme: 'bg-gold hover:bg-gold-dark',
        garden: 'bg-gold/90 hover:bg-gold',
    },

    hover: {
        primary: 'hover:bg-wedding-600',
        secondary: 'hover:border-gold-dark hover:text-white',
        theme: 'hover:bg-gold-dark',
        garden: 'hover:bg-gold',
    },

    container: {
        maxWidth: 'max-w-[1300px]',
        padding: 'px-4 sm:px-6 lg:px-8',
        center: 'mx-auto',
    },

    calendar: {
        weddingDate: '2026-06-28',
        highlightColor: 'bg-gold',
        heartColor: 'text-gold',
        textColor: 'text-forest',
        headerColor: 'text-gold',
        dayNamesColor: 'text-gold/90',
        background: 'bg-sage',
    },

    paragraph: {
        background: 'bg-sage',
        garden: 'bg-sage',
    },

    cssVariables: {
        '--primary-bg': '#094a2f',
        '--secondary-bg': '#AA8D5A',
        '--accent-bg': '#094a2f',
        '--accent-hover': '#8a7045',
        '--primary-text': '#000000',
        '--secondary-text': '#AA8D5A',
        '--accent-text': '#AA8D5A',
        '--muted-text': '#8a7045',
        '--border-color': '#000000',
        '--custom-theme': '#094a2f',
        '--cream': '#CBCBC0',
        '--tan': '#AA8D5A',
        '--wine': '#094a2f',
        '--burgundy-dark': '#094a2f',
        '--garden-bg': '#CBCBC0',
    }
}

export const themePresets = {
    darkElegant: {
        backgrounds: {
            primary: 'bg-forest',
            secondary: 'bg-gold',
            accent: 'bg-gold',
        },
        text: {
            primary: 'text-white',
            secondary: 'text-gold',
            accent: 'text-gold',
        }
    },

    lightRomantic: {
        backgrounds: {
            primary: 'bg-sage',
            secondary: 'bg-white',
            accent: 'bg-gold',
        },
        text: {
            primary: 'text-forest',
            secondary: 'text-gold',
            accent: 'text-gold',
        }
    },

    warmAutumn: {
        backgrounds: {
            primary: 'bg-sage',
            secondary: 'bg-gold/20',
            accent: 'bg-gold',
        },
        text: {
            primary: 'text-forest',
            secondary: 'text-gold',
            accent: 'text-gold',
        }
    },

    gardenWedding: {
        backgrounds: {
            primary: 'bg-sage',
            secondary: 'bg-white',
            accent: 'bg-gold',
            theme: 'bg-sage',
        },
        text: {
            primary: 'text-forest',
            secondary: 'text-gold',
            accent: 'text-gold',
            garden: 'text-gold',
        }
    }
}

export const getThemeColor = (type, variant = 'primary') => {
    return themeConfig[type]?.[variant] || themeConfig.text.primary
}

export const applyThemePreset = (presetName) => {
    const preset = themePresets[presetName]
    if (preset) {
        Object.assign(themeConfig, preset)
    }
}
