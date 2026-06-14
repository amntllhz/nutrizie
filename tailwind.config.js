import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/**/*.blade.php',
        './resources/**/*.js',
        './resources/**/*.vue',
        './node_modules/flowbite/**/*.js'
    ],
    theme: {
        extend: {
            fontFamily: {
                in: "'Plus Jakarta Sans', sans-serif",
                pjs: "'Plus Jakarta Sans', sans-serif",

            },
            colors: {
                prim: '#35C6A8',
                sec: '#FFA17A',
                acc: '#FFA17A',
                acctwo: '#C4F07B',
                graone: '#013635',
                gratwo: '#039C99',
                foot: '#C4F07B',
            },
        },
        screens: {
            'sm': { 'max': '639px' },
            // -> @media (max-width: 639px)

            'md': { 'min': '640px', 'max': '767px' },
            // -> @media (min-width: 640px) and (max-width: 767px)

            'lg': { 'min': '768px', 'max': '1023px' },
            // -> @media (min-width: 768px) and (max-width: 1023px)

            'xl': { 'min': '1024px', 'max': '1279px' },
            // -> @media (min-width: 1024px) and (max-width: 1279px)

            '2xl': { 'min': '1280px', 'max': '1535px' },
            // -> @media (min-width: 1280px) and (max-width: 1535px)

            '3xl': { 'min': '1536px' },
            // -> @media (min-width: 1536px) (tanpa max)

        },
    },
    plugins: [
        require('flowbite/plugin'),
        require('@tailwindcss/forms'),

        function ({ addUtilities }) {
            addUtilities({
                '.font-feature-settings-cv11': {
                    'font-feature-settings': '"cv11"',
                },
            }, ['responsive', 'hover']);
        },
    ],
};
